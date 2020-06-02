const ELECTION = artifacts.require('./Election.sol');
const SETUPBLOCKCHAIN = artifacts.require('./SetupBlockchain.sol');
const REGISTRATION = artifacts.require('./Registration.sol');

contract.skip('Election',(accounts) => {
    let Registration,SetupBlockchain,Election, setupBlockchainAddress, registrationAddress, electionAddress;
    
    before(async () => {
        Election = await ELECTION.deployed();
        Registration = await REGISTRATION.deployed();
        SetupBlockchain = await SETUPBLOCKCHAIN.deployed();
    });
    
    
    describe('deployment', async () => {
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
    });
    
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
});