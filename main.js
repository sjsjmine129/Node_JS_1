var http = require('http');
var fs = require('fs');
var url = require('url'); //url 정보들 가져와저장
var qs = require('querystring');

var template = require('./lib/template.js');


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

        var list = template.list(filelist);
        var html = template.html(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);

      response.writeHead(200);
      response.end(html);
      });
    }
    else{
      fs.readFile(`data/${queryData.id}`,'utf8', function(err,data){ 
        fs.readdir('./data',function(err, filelist){
          description = data;

          var list = template.list(filelist);
          var html = template.html(title, list, `<h2>${title}</h2>${description}`, 
          `
          <a href="/create">create</a> 
          <a href="/update?id=${title}">update</a>
          <form action="delete_process" method="post">
           <input type="hidden" name="id" value="${title}">
           <input type="submit" value="delete">
          </form>
          `);

          response.writeHead(200);
          response.end(html);
        });
      });
    }
  }
  else if(pathname === '/create'){
    fs.readdir('./data',function(err, filelist){
      title = 'WEB - create';
      var list = template.list(filelist);
      var html = template.html(title, list, 
      `
        <form action="/process_create" method="post">
        <!-- 위 주소로 아래의 데이터들 받아서 submit시 보냄    쿼리로 안보내고 숨겨서 전송 -->
            <p></p><input type="text" name ="title" placeholder="title"></p>
            <p>
                <textarea name="description" 
                placeholder="description" style="width: 800px; height: 600px;"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
      `,
      ``);

      response.writeHead(200);
      response.end(html);
    });
  }
  else if(pathname === '/process_create'){
    var body = '';
    var description ='';
    var title = '';

    request.on('data',function(data){ //정보수집
      body = body + data;
    });
    request.on('end', function(){  //정보수집 끝
      var post = qs.parse(body);
      title = post.title;
      description = post.description;

      fs.writeFile(`data/${title}`, description, 'utf-8',
      function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });
  }
  else if(pathname === '/update'){
    fs.readFile(`data/${queryData.id}`,'utf8', function(err,data){ 
      fs.readdir('./data',function(err, filelist){
        description = data;
        var list = template.list(filelist);
        var html = template.html(title, list, 
        `
          <form action="/process_update" method="post">
            <input type="hidden" name="id" value="${title}">
            <p></p><input type="text" name ="title" placeholder="title" value="${title}"></p>
            <p>
                <textarea name="description" 
                placeholder="description" style="width: 800px; height: 600px;">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
        `, 
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);

        response.writeHead(200);
        response.end(html);
      });
    });
  }
  else if(pathname == '/process_update'){
    var body = '';
    var description ='';
    var title = '';

    request.on('data',function(data){ //정보수집
      body = body + data;
    });
    request.on('end', function(){  //정보수집 끝
      var post = qs.parse(body);
      var id = post.id;
      title = post.title;
      description = post.description;
      fs.rename(`data/${id}`,`data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf-8',
        function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    });
  }
  else if(pathname == '/delete_process'){
    var body = '';
    var description ='';
    var title = '';

    request.on('data',function(data){ //정보수집
      body = body + data;
    });
    request.on('end', function(){  //정보수집 끝
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function(error){
        response.writeHead(302, {Location: `/`});
        response.end();
      });
    });
  }
  else{
    response.writeHead(404);
    response.end('Not found'); 
  }
  
});
app.listen(3000);