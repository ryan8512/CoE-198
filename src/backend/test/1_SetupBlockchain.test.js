const SETUPBLOCKCHAIN = artifacts.require('./SetupBlockchain.sol');

contract.skip('SetupBlockchain',(accounts) => {
    let SetupBlockchain;
    
    before(async () => {
        SetupBlockchain = await SETUPBLOCKCHAIN.deployed();
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await SetupBlockchain.address;
            assert.notEqual(address,0x0);
            assert.notEqual(address,'');
            assert.notEqual(address,null);
            assert.notEqual(address,undefined);
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
                [["Isko",accounts[7],0],
                 ["Erap",accounts[6],1],
                ],
                "LOCAL"
            );
        });

        it('candidate 1 (Isko) successfully created', async() => {
            const event = allCandidates.logs[0].args;
            assert.equal(event[0],'Isko', 'name is correct');
            assert.equal(event[1],accounts[7], 'address is correct');
            assert.equal(event[2], 0, 'position is correct');
        });

        it('candidate 2 (Erap) successfully created', async() => {
            const event = allCandidates.logs[1].args;
            assert.equal(event[0],'Erap', 'name is correct');
            assert.equal(event[1],accounts[6], 'address is correct');
            assert.equal(event[2], 1, 'position is correct');
        });
    });

    describe('createToken function', async () => {
        let allTokens;
        before(async () =>{
            allTokens = await SetupBlockchain.createToken(
                ["Duterte","Robredo"],
                ["DUTS","DILAWAN"],
                [1,1],
                [0,1]
            );
        });

        it('token 1 (duterte) successfully created', async () => {
            const event = allTokens.logs[0].args;
            assert.equal(event[0],"Duterte", 'name is correct');
            assert.equal(event[1],event.tokenAddress, 'address is correct'); //rendundant
            assert.equal(event[2],1, 'amountperVoter is correct');
            assert.equal(event[3],0, 'position is correct');
        });

        it('token 2 (robredo) successfully created', async () => {
            const event = allTokens.logs[1].args;
            assert.equal(event[0],"Robredo", 'name is correct');
            assert.equal(event[1],event.tokenAddress, 'address is correct'); //rendundant
            assert.equal(event[2],1, 'amountperVoter is correct');
            assert.equal(event[3],1, 'position is correct');
        });
    });

    describe('check votingTokenList', async () => {
        let token1, token2;
        before(async () => {
            token1 = await SetupBlockchain.votingTokenlist(0);
            token2 = await SetupBlockchain.votingTokenlist(1);
        });

        it('all tokens are successfully created', async () => {
            assert.equal(token1.name,"Duterte",'name is correct');
            assert.equal(token2.name,"Robredo",'name is correct');
        })
    });

    describe('createBallot and getBallot function for NATIONAL', async () => {
        let result;
        before(async () => {
            SetupBlockchain.createBallot("NATIONAL");
            result = await SetupBlockchain.getBallot("NATIONAL");
        });

        it('NATIONAL ballot successfully created', async () => {
            assert.notEqual(result,0x0);
            assert.notEqual(result,'');
            assert.notEqual(result,null);
            assert.notEqual(result,undefined);
        });
        
    });

    describe('createBallot and getBallot function for LOCAL', async () => {
        let result;
        before(async () => {
            SetupBlockchain.createBallot("NCR");
            result = await SetupBlockchain.getBallot("NCR");
        });

        it('NCR ballot successfully created', async () => {
            assert.notEqual(result,0x0);
            assert.notEqual(result,'');
            assert.notEqual(result,null);
            assert.notEqual(result,undefined);
        });
        
    });
});