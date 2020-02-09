const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain',()=>{
    const blockchain = new Blockchain();

    it('contains a `chain` Array instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('Blockchain starts with genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain successfully',()=>{
        const newdata= 'this is test';
        blockchain.addBlock({data:newdata});   // input to this addBlock should be a Block object. JS helps us as we can just supply attributes of the class to get the object
        
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newdata);
    });
})