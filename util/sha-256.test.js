const sha256 = require('./sha-256');

describe('SHA-256',()=>{
    it('Generates a SHA256 hash',()=>{
        expect(sha256('vedika')).toEqual('d9ab4e0835440ada6e5fcebd67058135138ae56cfd383124ec25b3e64a903cdc');
    })

    it('Generates the same hash irrespective of order of inputs if inputs are same',()=>{
        expect(sha256('hundred','ten','one')).toEqual(sha256('ten','one','hundred'));
    })
    
});