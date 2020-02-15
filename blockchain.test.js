const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain',()=>{
    //const blockchain = new Blockchain();

     let blockchain; // a dynamic variable

    beforeAll(()=>{
        const blockchain = new Blockchain();    // this will cause each test to have a new instance of the Blockchain class
        let newChain = new Blockchain();                                        // due to which the tests run independently, not influenced by changes in other tests
        let originalChain = blockchain.chain;
    });

    it('contains a `chain` Array instance',()=>{
        const blockchain = new Blockchain();
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('Blockchain starts with genesis block',()=>{
        const blockchain = new Blockchain();
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain successfully',()=>{
        const blockchain = new Blockchain();
        const newdata= 'this is test';
        blockchain.addBlock({data:newdata});   // input to this addBlock should be a Block object. JS helps us as we can just supply attributes of the class to get the object
        
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newdata);
    });

    // Tests for Chain Validation :
    // 1. Correct Block fields are present in every block
    // 2. lastHash field of each Block is actually  a reference to the previous Block in the chain
    // 3. Block hash is valid. 

    describe('isValidChain()',()=>{

        describe('when chain does not start with genesis block', ()=>{
            it('returns false',()=>{
                const blockchain = new Blockchain();
                blockchain.chain[0] = {data: 'fake-genesis-block'}
                
                //isValidChain is a static function hence we can call it on the class itself than on the object i.e. 
                // Blockchain.isValidChain() is also fine rather than blockchain.isValidChain()
                expect(Blockchain.isValidChain(blockchain.chain)).toEqual(false);

            });
        });

        describe('when chain starts with genesis block and has multiple blocks', ()=>{

            // beforeEach(()=>{                                    // to avoid writing the same in each test case
            //     blockchain.addBlock({data:'IIT Guwahati'});
            //     blockchain.addBlock({data:'IIT Kanpur'});
            //     blockchain.addBlock({data:'IIT Bombay'});
            // });
                
            describe('and a lastHash reference has changed',()=>{
                it('returns false',()=>{
                    const blockchain = new Blockchain();
                blockchain.addBlock({data:'IIT Guwahati'});
                blockchain.addBlock({data:'IIT Kanpur'});
                blockchain.addBlock({data:'IIT Bombay'});

                blockchain.chain[2].lastHash = 'broken-lastHash';
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                });
            });

            describe('and the chain contains a block with invalid field',()=>{
                it('returns false',()=>{
                    const blockchain = new Blockchain();
                    blockchain.addBlock({data:'IIT Guwahati'});
                blockchain.addBlock({data:'IIT Kanpur'});
                blockchain.addBlock({data:'IIT Bombay'});

                blockchain.chain[2].data = 'tampered-data';
                expect(Blockchain.isValidChain(blockchain.chain)).toEqual(false);
                });
            });

            describe('and the chain does not contain any invalid blocks.',()=>{
                it('returns true',()=>{
                    const blockchain = new Blockchain();
                    blockchain.addBlock({data:'IIT Guwahati'});
                blockchain.addBlock({data:'IIT Kanpur'});
                blockchain.addBlock({data:'IIT Bombay'});

                expect(Blockchain.isValidChain(blockchain.chain)).toEqual(true);
                });
            })

        });

    });

    // Chain Replacement Tests

    describe('replaceChain()',()=>{

        let errorMock, logMock;

        beforeEach(()=>{                            // this is used to silent the logs and errors
            errorMock=jest.fn();
            logMock = jest.fn();                    // jest.fn does not print by default
            global.console.error = errorMock;
            global.console.log = logMock;
            
        });

        describe('When the incoming chain is not longer',()=>{

            beforeEach(()=>{
                let newChain = new Blockchain();                                        // due to which the tests run independently, not influenced by changes in other tests
                let blockchain = new Blockchain();     
                
                let originalChain = blockchain.chain;
                newChain.chain[0]={new: 'chain'};
                blockchain.replaceChain(newChain.chain);
            });

            it('Does not replace the chain',()=>{
                let newChain = new Blockchain();                                        // due to which the tests run independently, not influenced by changes in other tests
                let blockchain = new Blockchain();     
                
                let originalChain = blockchain.chain;
                newChain.chain[0]={new: 'chain'};
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);   // no change
            });

            it('logs an error',()=>{
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('When the new chain is longer',()=>{

        

            describe('and the chain is invalid',()=>{

                beforeEach(()=>{
                    let newChain = new Blockchain();                                        // due to which the tests run independently, not influenced by changes in other tests
                    let blockchain = new Blockchain();
                    let originalChain = blockchain.chain;
                    newChain.addBlock({data:'IIT Guwahati'});
                newChain.addBlock({data:'IIT Kanpur'});
                newChain.addBlock({data:'IIT Bombay'});
                    newChain.chain[2].hash = 'some-fake-hash';
                    blockchain.replaceChain(newChain.chain);
                   
                });

                it('Does not replace the chain',()=>{
                    let newChain = new Blockchain();                                        // due to which the tests run independently, not influenced by changes in other tests
                    let blockchain = new Blockchain();
                    let originalChain = blockchain.chain;
                    newChain.addBlock({data:'IIT Guwahati'});
                newChain.addBlock({data:'IIT Kanpur'});
                newChain.addBlock({data:'IIT Bombay'});
                    newChain.chain[2].hash = 'some-fake-hash';
                    blockchain.replaceChain(newChain.chain);
                   
                    expect(blockchain.chain).toEqual(originalChain);   // no change
                });
                it('logs an error',()=>{
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            describe('and the chain is valid',()=>{

                beforeEach(()=>{
                    let blockchain = new Blockchain();
                    let newChain = new Blockchain();                                        // due to which the tests run independently, not influenced by changes in other tests
                    let originalChain = blockchain.chain;
                    newChain.addBlock({data:'IIT Guwahati'});
                newChain.addBlock({data:'IIT Kanpur'});
                newChain.addBlock({data:'IIT Bombay'});
                    blockchain.replaceChain(newChain.chain);
                   
                });

                it('Replaces the chain',()=>{
                    let blockchain = new Blockchain();
                    let newChain = new Blockchain();                                        // due to which the tests run independently, not influenced by changes in other tests
                    let originalChain = blockchain.chain;
                    newChain.addBlock({data:'IIT Guwahati'});
                newChain.addBlock({data:'IIT Kanpur'});
                newChain.addBlock({data:'IIT Bombay'});
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);   // change
                });

                it('tells about chain replacement',()=>{
                    expect(logMock).toHaveBeenCalled();
                });
            });
            
        });
            
        });

    

});