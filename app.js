var cache = require('memory-cache');
var crypto = require("crypto");
let testEntry = require('./testEntry.json')
 
let randId = crypto.randomBytes(64).toString('hex');
console.log(randId);

cache.put(randId, testEntry, 100);
console.log(cache.get(randId));
 
setTimeout(() => {
    console.log(cache.get(randId));
}, 150)
 