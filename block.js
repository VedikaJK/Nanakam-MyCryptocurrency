class Block{
    constructor(timestamp,lastHash,hash,data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash=hash;
        this.data=data;
    }
}

const b1 = new Block('1st Jan','hdcbbsdbs','egcue','egcbdn');

console.log("Block1",b1);