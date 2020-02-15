const Block = require('./block');
const sha256 = require('./sha-256');

class Blockchain{

    constructor(){
        this.chain=[Block.genesis()]; //Give an array to every blockchain created
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length -1],
            data
        });

        this.chain.push(newBlock);

    }

    static isValidChain(chain){
        // chain[0] !== Block.genesis() is always true, because in js even if 2 instances have the same data, they are still
        // 2 different entities. they cannot be equal.
        // hence we use JSON.stringify

        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) {return false};

        for( let i=1; i<chain.length; i++){    //skip checking the genesis block
            const block =chain[i];
            const actuallastHash = chain[i-1].hash;

            const {timestamp, lastHash, hash, data} = block;    // javascript automatically sets the corresponding values

            if(actuallastHash !== lastHash)
                return false;
            
            const calculatedHash = sha256(timestamp,lastHash,data);

            if(calculatedHash !== hash)    return false;
        }
        
            return true

        }
    
    replaceChain(chain){            // replaceChain is based on an individual instance of the chain hence it is not static func
        if(chain.length <= this.chain.length){
            console.error('The incoming chain must be longer');
            return;
        }
        if(!Blockchain.isValidChain(chain)){
            console.error('The incoming chain must be valid');
            return;
        }
        console.log('replacing chain with ',chain);
        this.chain = chain;
    }

};

module.exports = Blockchain;