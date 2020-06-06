const ELECTION = artifacts.require('./Election.sol');
const SETUPBLOCKCHAIN = artifacts.require('./SetupBlockchain.sol');
const REGISTRATION = artifacts.require('./Registration.sol');
const RESULTS = artifacts.require('./Results.sol');
/*Parameters*/

const districtCount = 2;
const positionCount = 2;
const candidateCount = 180;
const voterCount = 204;
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
            for(let i=0;i < voterCount; i++){
                if(i>=(voterCount-candidateCount)){
                    resultArray[i] = await Registration.registerVoter(
                        "Candidate"+(i-(voterCount - candidateCount)),
                        districtArray[i%(districtCount-1)],
                        { from: accounts[(voterCount-1)-(i-(voterCount - candidateCount))] }
                    );
                }
                else{
                    resultArray[i] = await Registration.registerVoter(
                        "Voter"+(i),
                        districtArray[i%(districtCount-1)],
                        { from: accounts[i] }
                    );
                }
            }
            let new_time = new Date();
            let seconds_passed = new_time - old_time;
            console.log("Registration Time: "+seconds_passed);
        })

        it('ALL voters (exclusive of candidates) are registered',async () => {
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
    

    describe('Voter1:Robredo & Voter3:Robredo & Duterte:Duterte & Robredo:Robredo', async () => {
        let voteArray = [];
        let resultArray = [];
        before(async () => {
            for(let i = 0;i < positionCount/2; i++){
                voteArray[i] = i;
            }
            let old_time = new Date();
            for(let i = 0; i < voterCount; i++){
                if(i>=(voterCount - candidateCount)){
                    await Election.vote('Candidate'+(i-(voterCount-candidateCount)),voteArray,voteArray,{ from: accounts[(voterCount-1)-(i-(voterCount - candidateCount))] });
                }
                else{
                    await Election.vote('Voter'+i,voteArray,voteArray,{ from: accounts[i] });
                }
            }
            let new_time = new Date();
            let seconds_passed = new_time - old_time;
            console.log("Election Time: "+seconds_passed);
            for(let i=0; i <voterCount; i++){
                if(i>=(voterCount - candidateCount)){
                    resultArray[i] = await Registration.votingStatus(accounts[(voterCount-1)-(i-(voterCount - candidateCount))]);
                }
                else{
                    resultArray[i] = await Registration.votingStatus(accounts[i]);
                }
            }
        });

        it('ALL have voted', async () =>{
            for(let i=0; i <voterCount; i++){
                assert.equal(resultArray[i],false,'passed');
            }
        });
    });
});