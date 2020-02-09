const Block = require('./block');

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
};

module.exports = Blockchain;