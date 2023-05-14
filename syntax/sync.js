var fs = require('fs');

// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt','utf-8');
// console.log(result);
// console.log('C');


console.log('A');
fs.readFile('syntax/sample.txt','utf-8',function(err, result){  //읽고 function 실행
    console.log(result);
});
console.log('C');