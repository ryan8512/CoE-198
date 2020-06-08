const ELECTION = artifacts.require('./Election.sol');
const SETUPBLOCKCHAIN = artifacts.require('./SetupBlockchain.sol');
const REGISTRATION = artifacts.require('./Registration.sol');
const RESULTS = artifacts.require('./Results.sol');

contract('SetupBlockchain + Registration + Election',(accounts) => {
    let Registration,SetupBlockchain,Election,Results,setupBlockchainAddress, registrationAddress, electionAddress,resultsAddress;
    
    /*!!!!!!!!!!!!!!!!!!!!!! SetupBlockchain*/
    before(async () => {
        Election = await ELECTION.deployed();
        Registration = await REGISTRATION.deployed();
        SetupBlockchain = await SETUPBLOCKCHAIN.deployed();
        Results = await RESULTS.deployed();
    });

    describe('deployment', async () => {
        it('Results deploys successfully', async () => {
            resultsAddress = await Results.address;
            assert.notEqual(resultsAddress,0x0);
            assert.notEqual(resultsAddress,'');
            assert.notEqual(resultsAddress,null);
            assert.notEqual(resultsAddress,undefined);
        });
        it('Election deploys successfully', async () => {
            electionAddress = await Election.address;
            assert.notEqual(electionAddress,0x0);
            assert.notEqual(electionAddress,'');
            assert.notEqual(electionAddress,null);
            assert.notEqual(electionAddress,undefined);
        });
        
        //Assume same address to the done deployed earlier
        it('Setupblockchain deploys successfully', async () => {
            setupBlockchainAddress = await SetupBlockchain.address;
            assert.notEqual(setupBlockchainAddress,0x0);
            assert.notEqual(setupBlockchainAddress,'');
            assert.notEqual(setupBlockchainAddress,null);
            assert.notEqual(setupBlockchainAddress,undefined);
        });
        it('Registration deploys successfully', async () => {
            registrationAddress = await Registration.address;
            assert.notEqual(registrationAddress,0x0);
            assert.notEqual(registrationAddress,'');
            assert.notEqual(registrationAddress,null);
            assert.notEqual(registrationAddress,undefined);
        });

        it('has a name and timelimit', async () => {
            const name = await Registration.name();
            const timelimit = await Registration.timelimit();
            assert.equal(name,"Registration Blockchain", 'has a name');
            assert.notEqual(timelimit,0x0);
            assert.notEqual(timelimit,'');
            assert.notEqual(timelimit,null);
            assert.notEqual(timelimit,undefined);
        });
    });

    describe('NATIONAL addCandidate function', async () => {
        let allCandidates;
        before(async () =>{
            allCandidates = await SetupBlockchain.addCandidates(
                [["Duterte",accounts[9],0],
                 ["Robredo",accounts[8],1],
                ],
                "NATIONAL"
            );
        });

        it('candidate 1 (duterte) successfully created', async() => {
            const event = allCandidates.logs[0].args;
            assert.equal(event[0],"Duterte", 'name is correct');
            assert.equal(event[1],accounts[9], 'address is correct');
            assert.equal(event[2], 0, 'position is correct');
        });

        it('candidate 2 (robredo) successfully created', async() => {
            const event = allCandidates.logs[1].args;
            assert.equal(event[0],"Robredo", 'name is correct');
            assert.equal(event[1],accounts[8], 'address is correct');
            assert.equal(event[2], 1, 'position is correct');
        });
    });

    describe('LOCAL addCandidate function', async () => {
        let allCandidates;
        before(async () =>{
            allCandidates = await SetupBlockchain.addCandidates(
                [["Isko",accounts[7],2],
                 ["Erap",accounts[6],2],
                ],
                "NCR"
            );
        });

        it('candidate 1 (Isko) successfully created', async() => {
            const event = allCandidates.logs[0].args;
            assert.equal(event[0],'Isko', 'name is correct');
            assert.equal(event[1],accounts[7], 'address is correct');
            assert.equal(event[2], 2, 'position is correct');
        });

        it('candidate 2 (Erap) successfully created', async() => {
            const event = allCandidates.logs[1].args;
            assert.equal(event[0],'Erap', 'name is correct');
            assert.equal(event[1],accounts[6], 'address is correct');
            assert.equal(event[2], 2, 'position is correct');
        });
    });

    describe('createToken function', async () => {
        let allTokens;
        before(async () =>{
            allTokens = await SetupBlockchain.createToken(
                ["President","Vice President","Mayor"],
                ["P","VP","M"],
                [1,1,1],
                [0,1,2]
            );
        });

        it('token 1 (President) successfully created', async () => {
            const event = allTokens.logs[0].args;
            assert.equal(event[0],"President", 'name is correct');
            assert.equal(event[1],event.tokenAddress, 'address is correct'); //rendundant
            assert.equal(event[2],1, 'amountperVoter is correct');
            assert.equal(event[3],0, 'position is correct');
        });

        it('token 2 (Vice President) successfully created', async () => {
            const event = allTokens.logs[1].args;
            assert.equal(event[0],"Vice President", 'name is correct');
            assert.equal(event[1],event.tokenAddress, 'address is correct'); //rendundant
            assert.equal(event[2],1, 'amountperVoter is correct');
            assert.equal(event[3],1, 'position is correct');
        });

        it('token 3 (Mayor) successfully created', async () => {
            const event = allTokens.logs[2].args;
            assert.equal(event[0],"Mayor", 'name is correct');
            assert.equal(event[1],event.tokenAddress, 'address is correct'); //rendundant
            assert.equal(event[2],1, 'amountperVoter is correct');
            assert.equal(event[3],2, 'position is correct');
        });
    });

    describe('check votingTokenList', async () => {
        let token1, token2, token3;
        before(async () => {
            token1 = await SetupBlockchain.votingTokenlist(0);
            token2 = await SetupBlockchain.votingTokenlist(1);
            token3 = await SetupBlockchain.votingTokenlist(2);
        });

        it('all tokens are successfully created', async () => {
            assert.equal(token1.name,"President",'name is correct');
            assert.equal(token2.name,"Vice President",'name is correct');
            assert.equal(token3.name,"Mayor",'name is correct');
        })
    });

    describe('createBallot and getBallot function for ALL regions', async() => {
        let resultArray = [];
        let districtArray = ["NATIONAL","NCR","Region I","CAR",
                             "Region II","Region III", "Region IV-A",
                             "Region IV-B","Region V","Region VI",
                             "Region VII","Region VIII", "Region IX",
                             "Region X","Region XI","Region XII",
                             "Region XIII","ARMM"
                            ];

        before(async () => {
            let old_time = new Date();
            for(let i=0;i < districtArray.length; i++){
                SetupBlockchain.createBallot(districtArray[i]);
                resultArray[i] = await SetupBlockchain.getBallot(districtArray[i]);
            }
            let new_time = new Date();
            let seconds_passed = new_time - old_time;
            console.log(old_time.getTime());
            console.log(new_time.getTime());
            console.log(seconds_passed);
        });
        
        it('ALL ballot succesfully created', async () => {
            for(let i=0;i < districtArray.length; i++){
                assert.notEqual(resultArray[i],0x0);
                assert.notEqual(resultArray[i],'');
                assert.notEqual(resultArray[i],null);
                assert.notEqual(resultArray[i],undefined);
            }

        });
    });

    /*!!!!!!!!!!!!!!!!!!!!!!Registration*/

    describe('applySetup function', async () =>{
        let result;
        before(async () => {
            result = await Registration.applySetup(setupBlockchainAddress);
        });

        it('Registration -> SetupBlockchain linked', async () =>{
            const event = result.logs[0].args;
            assert.equal(event[0],setupBlockchainAddress, 'address is correct');
        });
    });

    describe('{SetupBlockchain} setReg function', async () => {
        let result;
        before(async () => {
            result = await SetupBlockchain.setReg(registrationAddress);
        });

        it('SetupBlockchain -> Registration linked', async () =>{
            const event = result.logs[0].args;
            assert.equal(event[0],registrationAddress, 'address is correct');
        });
    });
    
    describe('registerVoter function',async () => {
        let result4,result5,result6,result7;
        let resultArray = [];
        before(async() => {
            /*
            for(let i=0;i<3;i++){
                resultArray[i] = await Registration.registerVoter(
                    "Voter"+(i+1),
                    "NCR",
                    { from: accounts[i+1] }
                );
            }*/
            result4 = await Registration.registerVoter(
                "Duterte",
                "NCR",
                { from: accounts[9] }
            );
            result5 = await Registration.registerVoter(
                "Robredo",
                "NCR",
                { from: accounts[8] }
            );

            result6 = await Registration.registerVoter(
                "Isko",
                "NCR",
                { from: accounts[7] }
            );

            result7 = await Registration.registerVoter(
                "Erap",
                "NCR",
                { from: accounts[6] }
            );

        })
        /*
        for(let i=1;i<=3;i++){
            it('Voter '+i+' registered', async () => {
                const event = (resultArray[i-1]).logs[0].args;
                assert.equal(event[0],"Voter"+i);
                assert.equal(event[1],true);
                assert.equal(event[2],"NCR");
            });
        }*/
        
        it('Duterte registered', async () => {
            const event = result4.logs[0].args;
            assert.equal(event[0],"Duterte");
            assert.equal(event[1],true);
            assert.equal(event[2],"NCR");
        });

        it('Robredo registered', async () => {
            const event = result5.logs[0].args;
            assert.equal(event[0],"Robredo");
            assert.equal(event[1],true);
            assert.equal(event[2],"NCR");
        });

        it('Isko registered', async () => {
            const event = result6.logs[0].args;
            assert.equal(event[0],"Isko");
            assert.equal(event[1],true);
            assert.equal(event[2],"NCR");
        });

        it('Erap registered', async () => {
            const event = result7.logs[0].args;
            assert.equal(event[0],"Erap");
            assert.equal(event[1],true);
            assert.equal(event[2],"NCR");
        });
    });

    //!!!!!!!!!!!!!!!!!!!!!!!!Election
    
    describe('applySetup function', async () =>{
        let result;
        before(async () => {
            result = await Election.applySetup(setupBlockchainAddress);
        });

        it('Election -> SetupBlockchain linked', async () =>{
            const event = result.logs[0].args;
            assert.equal(event[0],setupBlockchainAddress, 'address is correct');
        });
    });

    describe('acquireRegistration function', async () =>{
        let result;
        before(async () => {
            result = await Election.acquireRegistration(registrationAddress);
        });

        it('Election -> Registration linked', async () =>{
            const event = result.logs[0].args;
            assert.equal(event[0],registrationAddress, 'address is correct');
        });
    });
    /*
    describe('getNationalCandidates and getLocalCandidates function', async () =>{
        let result1,result2;
        before(async () => {
            result1 = await Election.getNationalCandidates();
            result2 = await Election.getLocalCandidates({ from: accounts[1] });
        });

        it('getNationalCandidates test', async () =>{
            assert.notEqual(result1,0x0);
            assert.notEqual(result1,'');
            assert.notEqual(result1,null);
            assert.notEqual(result1,undefined);
        });

        it('getLocalCandidates test', async () =>{
            assert.notEqual(result2,0x0);
            assert.notEqual(result2,'');
            assert.notEqual(result2,null);
            assert.notEqual(result2,undefined);
        });
    });
    
    describe('getNationalCandidates and getLocalCandidates function', async () =>{
        let result1,result2;
        before(async () => {
            result1 = await Election.getNationalCount();
            result2 = await Election.getLocalCount({ from: accounts[1] });
        });

        it('getNationalCandidates test', async () =>{
            assert.equal(result1,2,"national count is correct");
        });

        it('getLocalCandidates test', async () =>{
            assert.equal(result2,2,"local count is correct");
        });
    });
    

    describe('Voter1:Robredo & Voter3:Robredo & Duterte:Duterte & Robredo:Robredo', async () => {
        let result1,result2,result3,result4,result5,result6,result7;
        before(async () => {
            Election.vote('Voter1',[0,1],[0],{ from: accounts[1] });
            Election.vote('Voter3',[0,1],[0],{ from: accounts[3] });
            Election.vote('Duterte',[0,1],[0],{ from: accounts[9] });
            Election.vote('Robredo',[0,1],[0],{ from: accounts[8] });
            Election.vote('Isko',[0,1],[0],{ from: accounts[7] });
            Election.vote('Erap',[0,1],[1],{ from: accounts[6] });
            result1 = await Registration.votingStatus(accounts[1]);
            result2 = await Registration.votingStatus(accounts[2]);
            result3 = await Registration.votingStatus(accounts[3]);
            result4 = await Registration.votingStatus(accounts[9]);
            result5 = await Registration.votingStatus(accounts[8]);
            result6 = await Registration.votingStatus(accounts[7]);
            result7 = await Registration.votingStatus(accounts[6]);
        });
        
        it('All have voted', async () => {
            assert.equal(result1,false,'passed');
            assert.equal(result2,true,'passed'); //Not yet Voted
            assert.equal(result3,false,'passed');
            assert.equal(result4,false,'passed');
            assert.equal(result5,false,'passed');
            assert.equal(result6,false,'passed');
            assert.equal(result7,false,'passed');
        });
    });*/
    //!!!!!!!!!!!!!!!!!!!!!!!!!Results
    describe('applySetup function', async () =>{
        let result;
        before(async () => {
            result = await Results.applySetup(setupBlockchainAddress);
        });

        it('Results -> SetupBlockchain linked', async () =>{
            const event = result.logs[0].args;
            assert.equal(event[0],setupBlockchainAddress, 'address is correct');
        });
    });
    /*
    describe('{President} getWinnerName and getWinnerVotes function', async () =>{
        let name,votes;
        before(async () => {
            await Results.processWinnerName("NATIONAL",0);
            name = await Results.getWinnerName();
            votes = await Results.getWinnerVotes();

        });

        it('Duterte Winner', async () =>{
            assert.equal(name,'Duterte', 'winner is correct');
        });

        it('Duterte Vote Count', async () =>{
            assert.equal(votes,6, 'voteCount is correct');
        });
    });

    describe('{MAYOR} getWinnerName and getWinnerVotes function', async () =>{
        let name,votes;
        before(async () => {
            await Results.processWinnerName("NCR",2);
            name = await Results.getWinnerName();
            votes = await Results.getWinnerVotes();

        });

        it('Isko Winner', async () =>{
            assert.equal(name,'Isko', 'winner is correct');
        });

        it('Isko Vote Count', async () =>{
            assert.equal(votes,5, 'voteCount is correct');
        });
    });*/

    
    
    
});