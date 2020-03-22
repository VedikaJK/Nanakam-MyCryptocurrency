const crypto = require('crypto'); //javascript module 'crypto' (== class)
//this has a CreateHash function which can be used to create crypto objects

const sha256=(...inputs)=>{              // javascripts spread operator for multiple no. of inputs

        const hash=crypto.createHash('sha256');
        hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));    //update accepts a string hence join
                                                    // sort so that any order of inputs produces same o/p
        return ( hash.digest('hex'));
}; 

module.exports = sha256;