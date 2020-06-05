const ELECTION = artifacts.require('./Election.sol');
const SETUPBLOCKCHAIN = artifacts.require('./SetupBlockchain.sol');
const REGISTRATION = artifacts.require('./Registration.sol');
const RESULTS = artifacts.require('./Results.sol');
/*Parameters*/

const districtCount = 2;
const positionCount = 2;
const candidateCount = 54;
const voterCount = 3400;
///////////////////////
/*AVOID ODD NUMBERS DUE TO DIVIDE BY 2*/

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

    describe('ALL addCandidate function', async () => {
        let resultArray = [];
        let allCandidates = [];
        let offset = 0;
        let districtArray = ["NATIONAL","NCR","Region I","CAR",
                             "Region II","Region III", "Region IV-A",
                             "Region IV-B","Region V","Region VI",
                             "Region VII","Region VIII", "Region IX",
                             "Region X","Region XI","Region XII",
                             "Region XIII","ARMM"
                            ];
        before(async () =>{
            
            for(let i = 0;i< districtCount;i++){
                allCandidates = [];
                for(let j = 0;j < candidateCount/districtCount;j++){
                    if(i > 0){
                        offset = positionCount/2; //Only for NATIONAL
                    }
                    allCandidates.push(["Candidate"+(j+i),accounts[(voterCount-1)-(j+i)],(j%(positionCount/2)) + offset])
                }
                resultArray[i] = await SetupBlockchain.addCandidates(
                    allCandidates,
                    districtArray[i],
                );
            }
            
        });

        it("ALL candidates successfully created", async () => {
            for(let i = 0; i < resultArray.length; i++){
                for(let j=0; j < candidateCount/districtCount; j++){
                    offset=0;
                    const event = resultArray[i].logs[j].args;
                    assert.equal(event[0],"Candidate"+(i+j),'name is correct');
                    assert.equal(event[1],accounts[(voterCount-1)-(j+i)], 'address is correct');
                    if(i > 0){
                        offset = positionCount/2; //Only for NATIONAL
                    }
                    assert.equal(event[2],(j%(positionCount/2)) + offset,'position is correct');
                }
            }
        });   
    });
    
    describe('ALL createToken function', async () => {
        let allTokens;
        nameArray = [];
        symbolArray = [];
        amountArray = [];
        positionArray = [];
        
        
        before(async () =>{
            for(let i = 0; i < positionCount; i++){
                nameArray[i] = "Position"+i;
                symbolArray[i] = "P"+i;
                amountArray[i] = 1;
                positionArray[i] = i;
            }
            allTokens = await SetupBlockchain.createToken(
                nameArray,
                symbolArray,
                amountArray,
                positionArray
            );
        });

        it('token 1 (President) successfully created', async () => {
            for(let i=0; i < positionCount;i++){
                const event = allTokens.logs[i].args;
                assert.equal(event[0],"Position"+i, 'name is correct');
                assert.equal(event[1],event.tokenAddress, 'address is correct'); //rendundant
                assert.equal(event[2],1, 'amountperVoter is correct');
                assert.equal(event[3],i, 'position is correct');
            }
        });
    });

    describe('check votingTokenList', async () => {
        let tokenArray = [];
        before(async () => {
            for(let i=0;i<positionCount;i++){
                tokenArray[i] = await SetupBlockchain.votingTokenlist(i);
            }
        });

        it('all tokens are successfully created', async () => {
            for(let i=0;i<positionCount;i++){
                assert.equal(tokenArray[i].name,"Position"+i,'name is correct');
            }
            
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
            for(let i=0;i < districtArray.length; i++){
                SetupBlockchain.createBallot(districtArray[i]);
                resultArray[i] = await SetupBlockchain.getBallot(districtArray[i]);
            }        
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
        let container;
        let districtArray = ["NCR","Region I","CAR",
                             "Region II","Region III", "Region IV-A",
                             "Region IV-B","Region V","Region VI",
                             "Region VII","Region VIII", "Region IX",
                             "Region X","Region XI","Region XII",
                             "Region XIII","ARMM"
                            ]; //NATIONAL NOT INCLUDED THEREFORE -1
        let resultArray = [];
        before(async() => {
            let old_time = new Date();
            for(let i=0;i<(voterCount - candidateCount);i++){
                resultArray[i] = await Registration.registerVoter(
                    "Voter"+(i),
                    districtArray[i%(districtCount-1)],
                    { from: accounts[i] }
                );
                container = i;
            }
            container = container +1;
            for(let i=0; i<candidateCount ;i++){
                resultArray[i+container] = await Registration.registerVoter(
                    "Candidate"+i,
                    districtArray[(container+i)%(districtCount-1)],
                    { from: accounts[(voterCount-1)-i] }
                );
            }
            let new_time = new Date();
            let seconds_passed = new_time - old_time;
            console.log("Registration Time: "+seconds_passed);
        })

        it('ALL voters (exclusive of candidates) are registered',async () => {
            console.log()
            for(let i=0;i<voterCount;i++){
                const event = resultArray[i].logs[0].args;
                if(i>=voterCount-candidateCount){
                    assert.equal(event[0],"Candidate"+(i-(voterCount-candidateCount)),'name is correct');
                    assert.equal(event[1],true,'can Vote');
                    assert.equal(event[2],districtArray[i%(districtCount-1)],'district is correct');
                }
                else{
                    assert.equal(event[0],"Voter"+i,'name is correct');
                    assert.equal(event[1],true,'can Vote');
                    assert.equal(event[2],districtArray[i%(districtCount-1)],'district is correct');
                }
                
            }
        });

    });
    
    //!!!!!!!!!!!!!!!!!!!!!!!!Election
 /*   
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
    
    /*
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
});