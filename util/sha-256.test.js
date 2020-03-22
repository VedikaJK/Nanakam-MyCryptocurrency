const sha256 = require('./sha-256');

describe('SHA-256',()=>{
    it('Generates a SHA256 hash',()=>{
        expect(sha256('vedika')).toEqual('18a85516cad57db5440a94b3c713c7e997cc70425c9c67b0703ce2e46b807460');
    });

    it('Generates the same hash irrespective of order of inputs if inputs are same',()=>{
        expect(sha256('hundred','ten','one')).toEqual(sha256('ten','one','hundred'));
    });

    it('produces a unique hashwhen the properties have changed on an input',()=>{
        const foo ={};
        const originalHash = sha256(foo);
        foo['a'] = 'a';
        expect(sha256(foo)).not.toEqual(originalHash);
    });
    
});