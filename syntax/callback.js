var a = function(){
    console.log('A');
}

function slowfunc(callback){    //call back 이라는 함수를 받음
    callback();                 //slowfunc끝 나고 받은 함수 부름 -> a 받았으니 A출력
}

slowfunc(a);