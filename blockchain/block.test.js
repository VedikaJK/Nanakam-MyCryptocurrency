const hexToBinary = require('hex-to-binary');
const Block = require('./block');
const sha256 = require('../util/sha-256');
const {GENESIS_DATA, MINE_Rate}= require('../config');  // we take genesis_data from config file. written in {..} as 
                                            //genesis_data was exported in an object

describe('Block',()=>{
    const timestamp = 2000;//'1/2/2020';
    const lastHash = 'ddcsh';
    const hash = 'yewfhdcbn';
    const data = ['blockchain','crypto'];
    const nonce =1;
    const difficulty = 1;
    const b = new Block({timestamp,lastHash,hash,data,nonce,difficulty});  //if parameters and variables have the same name then no need to specify key value in arguments

    it('has timestamp,lastHash,hash and data',()=>{
        expect(b.data).toEqual(data);
        expect(b.timestamp).toEqual(timestamp);
        expect(b.lastHash).toEqual(lastHash);
        expect(b.hash).toEqual(hash);
        expect(b.nonce).toEqual(nonce);
        expect(b.difficulty).toEqual(difficulty);
        
        
    })

    describe('GenesisBlock',()=>{             //describes test for a genesis function
        const GenesisBlock=Block.genesis();
        
        //console.log('GenesisBlock',GenesisBlock);
        it('Genesis block is an instance of Block class',()=>{
            expect(GenesisBlock instanceof Block).toEqual(true);
        })

        it('Has genesis data',()=>{
            expect(GenesisBlock).toEqual(GENESIS_DATA); // these are different data types but javascript implements classes as objects
                                                        //  under the hood. So an instance of the Block class with genesis_data is that 
                                                        //  genesis_data object itself. It has the same properties - timestamp, lastHash, 
                                                        // hash, data.
        })
    })  

    describe('MinedBlock',()=>{
        const lastBlock = Block.genesis();
        const data ='some data';
        const MinedBlock = Block.mineBlock({data,lastBlock});

        it('returns a Block instance',()=>{
            expect(MinedBlock instanceof Block).toEqual(true);
        });

        it('sets the lastHash to be the hash of the lastBlock',()=>{
            expect(MinedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the data',()=>{
            expect(MinedBlock.data).toEqual(data);
        });

        it('sets a timestamp',()=>{
            expect(MinedBlock.timestamp).not.toEqual(undefined);
        });

        it('returns a SHA256 hash',()=>{
            expect(MinedBlock.hash).toEqual(
                sha256(MinedBlock.timestamp,MinedBlock.nonce,MinedBlock.difficulty,MinedBlock.lastHash,data))
        });

        it('sets a `hash` that matches the difficulty level',()=>{
            expect(hexToBinary(MinedBlock.hash).substring(0,MinedBlock.difficulty)).toEqual(
                '0'.repeat(MinedBlock.difficulty));
        });

        it('adjusts the difficulty',()=>{
            const PossibleResults = [lastBlock.difficulty - 1,lastBlock.difficulty + 1];

            expect(PossibleResults.includes(MinedBlock.difficulty)).toBe(true);
        });
    })

    describe('adjusts difficulty dynamically',()=>{
        it('raises the difficulty for a quickly mined Block',()=>{
            console.log(b.difficulty);
            expect(Block.adjustDifficulty({ originalBlock : b,
            timestamp: b.timestamp + MINE_Rate -100})).toEqual(b.difficulty +1);
        });
        it('lowers the difficulty for a slowly mined Block',()=>{
            expect(Block.adjustDifficulty({ originalBlock : b,
                timestamp: b.timestamp + MINE_Rate +100})).toEqual(b.difficulty -1);
        });

        it('has a lower limit of 1',()=>{
            b.difficulty = -1;
            expect(Block.adjustDifficulty({originalBlock: b,timestamp})).toEqual(1);
        });
        
    })
})