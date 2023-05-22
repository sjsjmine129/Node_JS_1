
module.exports = {
    html: function(title, list, body, makebutton){
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
          ${makebutton}
        </div>
        <div>
          ${body}
        </div>
      </div>
    </body>
    </html>
    `;
    },
    list: function(filelist){
      var list = '<ol>';
      for(var i=0; i<filelist.length; i++){
        list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      }
      list = list +'</ol>';
    
      return list;
    }
}
  
