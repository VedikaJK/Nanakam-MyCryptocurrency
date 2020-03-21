const Blockchain = require('../blockchain')   //we don't need to specify index, every index file gets automatically accessed

const blockchain = new Blockchain();

blockchain.addBlock({data : 'initial'});

let prevTimestamp,nextTimestamp,nextBlock,timeDiff,average;

const times = [];

console.log(`Block 1`, blockchain.chain[blockchain.chain.length-1]);
//mine 10,000 blocks

for(let i=0;i<10000;i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data : `block ${i}`});
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;

    timeDiff = nextTimestamp- prevTimestamp; // time taken to mine

    times.push(timeDiff);

    average = times.reduce((total,num)=>(total + num))/times.length; //callback function

   console.log(`Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}ms`);
    

    
}