var Link ={
    changeLinkColor : function(color){
    // var links = document.querySelectorAll('a');
    // var i =0;
    //     while(i<links.length){
    //         links[i].style.color=color;
    //         i=i+1;
    //     }

        // same with jQuery
        $('a').css('color',color);
    }
}

var Body ={
    changeColor : function(color){
        // document.querySelector('body').style.color=color;

        $('body').css('color',color);
    },

    changeBackgraoundColor : function(color){
        // document.querySelector('body').style.backgroundColor=color;
        $('body').css('backgroundColor',color);
    }
    
}


function nightDayHandler(self){
    if( self.value === '[DAY]'){
        Body.changeBackgraoundColor('white')
        Body.changeColor('black')
        self.value='[NIGHT]';

        Link.changeLinkColor('blue')
    }
    else{
        Body.changeBackgraoundColor('black')
        Body.changeColor('white')
        self.value='[DAY]';
        
        Link.changeLinkColor('powderblue')
    } 
}