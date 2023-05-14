var fs = require('fs');

fs.readFile('ex.txt','utf8', function(err,data){
    console.log(data);
});