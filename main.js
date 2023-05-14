var http = require('http');
var fs = require('fs');
var url = require('url'); //url 정보들 가져와저장

var app = http.createServer(function(request,response){
  var _url = request.url; //  /? 뒤쪽 정보 url로부터 가져옴
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url,true).pathname;
  var title = (queryData.id);
  var description;


  if(pathname === '/'){
    if(queryData.id === undefined ){

      fs.readdir('./data',function(err, filelist){
        title = 'Welcome';
        description = 'Hello, Node js';

        var list = '<ol>';
        for(var i=0; i<filelist.length; i++){
          list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
        }
        list = list +'</ol>';

        var template = `
        <!DOCTYPE html>
      <html>
      <head>  <!-- 문서의 정보들-->
          <title>WEB1 - ${title}</title>  <!-- 페이지 제목-->
          <meta charset="utf-8">   <!-- utf-8로 브라우저를 읽어라-->
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script> <!-- jQuery-->
      
          <link rel="stylesheet" href="style.css">
          <script src="color.js"></script>
      </head>
      
      <body style="background-color: black;color:white;">  <!-- 문서의 내용물-->
          <h1><a href="/">WEB</a></h1>
          <input id="night_day" type="button" value="[DAY]" onclick="nightDayHandler(this)">
      
          <div id="grid">
          ${list}
      
          <div>
          <h2>${title}</h2> 
          ${description}
      </body>
      </html>
      `;

      response.writeHead(200);
      response.end(template);
      });
    }
    else{
      fs.readFile(`data/${queryData.id}`,'utf8', function(err,data){ 
        fs.readdir('./data',function(err, filelist){
          description = data;

          var list = '<ol>';
          for(var i=0; i<filelist.length; i++){
            list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
          }
          list = list +'</ol>';

          var template = `
          <!DOCTYPE html>
        <html>
        <head>  <!-- 문서의 정보들-->
            <title>WEB1 - ${title}</title>  <!-- 페이지 제목-->
            <meta charset="utf-8">   <!-- utf-8로 브라우저를 읽어라-->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script> <!-- jQuery-->
        
            <link rel="stylesheet" href="style.css">
            <script src="color.js"></script>
        </head>
        
        <body style="background-color: black;color:white;">  <!-- 문서의 내용물-->
            <h1><a href="/">WEB</a></h1>
            <input id="night_day" type="button" value="[DAY]" onclick="nightDayHandler(this)">
        
            <div id="grid">
            ${list}
        
            <div>
            <h2>${title}</h2> 
            ${description}
        </body>
        </html>
        `;

          response.writeHead(200);
          response.end(template);
        });
      });
      
    }

      //웹페이지에 출력
    //response.end(queryData.id);  // /? 뒷부분 웹페이지에 출력
    // response.end(fs.readFileSync(__dirname + _url));

  }
  else{
    response.writeHead(404);
    response.end('Not found'); 
  }
  
  
  

});
app.listen(3000);