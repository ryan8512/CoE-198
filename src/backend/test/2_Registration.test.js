const REGISTRATION = artifacts.require('./Registration.sol');
const SETUPBLOCKCHAIN = artifacts.require('./SetupBlockchain.sol');

contract.skip('Registration',(accounts) => {
    let SetupBlockchain,Registration, setupBlockchainAddress, registrationAddress;
    
    before(async () => {
        Registration = await REGISTRATION.deployed();
        SetupBlockchain = await SETUPBLOCKCHAIN.deployed();
    });

    describe('deployment', async () => {
        it('Registration deploys successfully', async () => {
            registrationAddress = await Registration.address;
            assert.notEqual(registrationAddress,0x0);
            assert.notEqual(registrationAddress,'');
            assert.notEqual(registrationAddress,null);
            assert.notEqual(registrationAddress,undefined);
        });

        //Assume same address to the done deployed earlier
        it('Setupblockchain deploys successfully', async () => {
            setupBlockchainAddress = await SetupBlockchain.address;
            assert.notEqual(setupBlockchainAddress,0x0);
            assert.notEqual(setupBlockchainAddress,'');
            assert.notEqual(setupBlockchainAddress,null);
            assert.notEqual(setupBlockchainAddress,undefined);
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

    /*Testing Setup Blockchains setReg and allotToken functions*/
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
        let result4,result5;
        let resultArray = [];
        before(async() => {
            for(let i=0;i<3;i++){
                resultArray[i] = await Registration.registerVoter(
                    "Voter"+(i+1),
                    "NCR",
                    { from: accounts[i+1] }
                );
            }
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

        })

        for(let i=1;i<=3;i++){
            it('Voter '+i+' registered', async () => {
                const event = (resultArray[i-1]).logs[0].args;
                assert.equal(event[0],"Voter"+i);
                assert.equal(event[1],true);
                assert.equal(event[2],"NCR");
            });
        }
        
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
    });

    describe('authenticate voters functions', async () => {
        let result1,result2,result3,result4,result5;
        before(async () => {
            result1 = await Registration.authenticateID(accounts[1],'Voter1');
            result2 = await Registration.authenticateID(accounts[2],'Voter1');
            result3 = await Registration.authenticateID(accounts[3],'Voter3');
            result4 = await Registration.authenticateID(accounts[9],'Duterte');
            result5 = await Registration.authenticateID(accounts[8],'Robredo');
        });
        
        it('Check if Voter2 cannot is NOT authenticated', async () => {
            assert.equal(result1,true,'passed');
            assert.equal(result2,false,'passed');
            assert.equal(result3,true,'passed');
            assert.equal(result4,true,'passed');
            assert.equal(result5,true,'passed');
        });
    });

    describe('getDistrict voters functions', async () => {
        let result1,result2,result3,result4,result5;
        before(async () => {
            result1 = await Registration.getDistrict(accounts[1]);
            result2 = await Registration.getDistrict(accounts[2]);
            result3 = await Registration.getDistrict(accounts[3]);
            result4 = await Registration.getDistrict(accounts[9]);
            result5 = await Registration.getDistrict(accounts[8]);
        });
        
        it('Check if ALL Voters are in NCR', async () => {
            assert.equal(result1,"NCR",'passed');
            assert.equal(result2,"NCR",'passed');
            assert.equal(result3,"NCR",'passed');
            assert.equal(result4,"NCR",'passed');
            assert.equal(result5,"NCR",'passed');
        });
    });

    describe('hasVoted and votingStatus functions', async () => {
        let result1,result2,result3,result4,result5;
        before(async () =>{
            Registration.hasVoted(accounts[2]);
            result1 = await Registration.votingStatus(accounts[1]);
            result2 = await Registration.votingStatus(accounts[2]);
            result3 = await Registration.votingStatus(accounts[3]);
            result4 = await Registration.votingStatus(accounts[9]);
            result5 = await Registration.votingStatus(accounts[8]);
        });
        
        it('Check if Voter2 cannot vote', async () => {
            assert.equal(result1,true,'passed');
            assert.equal(result2,false,'passed');
            assert.equal(result3,true,'passed');
            assert.equal(result4,true,'passed');
            assert.equal(result5,true,'passed');
        });
    });

});