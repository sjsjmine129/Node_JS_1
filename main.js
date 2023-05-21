var http = require('http');
var fs = require('fs');
var url = require('url'); //url 정보들 가져와저장

function templateHTML(title, list, body){
  return `
  <!DOCTYPE html>
<html>
<head>  <!-- 문서의 정보들-->
    <title>WEB1 - ${title}</title>  <!-- 페이지 제목-->
    <meta charset="utf-8">   <!-- utf-8로 브라우저를 읽어라-->
    <style>
      .grid-container {
        display: grid;
        grid-template-columns: 200px minmax(0, 1fr) minmax(0, 1fr); /* First column fixed, other columns adjust */
        grid-gap: 10px
      }
    </style>
</head>

<body style="background-color: gray;color:powderblue;">  <!-- 문서의 내용물-->
  <h1><a href="/">WEB</a></h1>
  <input id="night_day" type="button" value="[DAY]" onclick="nightDayHandler(this)">

  <div class="grid-container">
    <div>
      ${list}
      <a href="/create">create</a>
    </div>
    <div>
      ${body}
    </div>
  </div>
</body>
</html>
`;
}

function make_list(filelist){
  var list = '<ol>';
  for(var i=0; i<filelist.length; i++){
    list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list = list +'</ol>';

  return list;
}



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

        var list = make_list(filelist);

        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

      response.writeHead(200);
      response.end(template);
      });
    }
    else{
      fs.readFile(`data/${queryData.id}`,'utf8', function(err,data){ 
        fs.readdir('./data',function(err, filelist){
          description = data;

          var list = make_list(filelist);

          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  }
  else if(pathname === '/create'){
    fs.readdir('./data',function(err, filelist){
      title = 'WEB - create';
      var list = make_list(filelist);
      var template = templateHTML(title, list, `
      <form action="http://localhost:3000/process_create" method="post">
      <!-- 위 주소로 아래의 데이터들 받아서 submit시 보냄    쿼리로 안보내고 숨겨서 전송 -->
          <p></p><input type="text" name ="title" placeholder="title"></p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
      </form>`);

      response.writeHead(200);
      response.end(template);
    });
  }
  else{
    response.writeHead(404);
    response.end('Not found'); 
  }
  
});
app.listen(3000);