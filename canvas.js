var canvasScaleX = 1;
var canvasScaleY = 1; 
var mousedownenter = false ; 
//var currentstroke ; 

var tools_mode = "pen"; // 0 SELECT 
               // 1 PEN 
               // 2 ERASE

var color_mode = "black";
var color_rgb = "rgb(0,0,0)";
var line_width = 1 ;

//window.onload = 
window.onresize = function () { 
    //    var C = 0.8 ; 
    //    var W_TO_H = 2/1; 
    var el = document.getElementById('tutorial'); 
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    var canvasWidth = el.offsetWidth;
    var canvasHeight = el.offsetHeight ;
    console.log("in onresize"); 
    console.log(viewportWidth, viewportHeight); 

    //    el.style.position = "fixed";
    el.setAttribute("width", canvasWidth);
    el.setAttribute("height", canvasHeight);
    //    el.style.top = 0 ; //(viewportHeight - canvasHeight) / 2;
    //    el.style.left = 0 ;//(viewportWidth - canvasWidth) / 2;

} 

function tools_pen() { 
    tools_mode = "pen"; 
    console.log("pen is selected"); 
}

function tools_erase() {
    tools_mode = "erase" ; 
    console.log("erase is selected"); 
}

function tools_highlighter() { 
    console.log("highligher is not implemented yet."); 
}

function tools_text() { 
    console.log("text is not implemented yet."); 
}

function color_black() { 
    color_mode = "black";
    color_rgb = "rgb(0,0,0)";
}

function color_green() { 
    color_mode = "green";
    color_rgb = "rgb(0,220,0)";
}

function color_red() { 
    color_mode = "red";
    color_rgb = "rgb(220,0,0)";
}

function color_blue() { 
    color_mode = "blue";
    color_rgb = "rgb(0,0,220)";
}

function width_fine() { 
    line_width = 1;
}

function width_medium() {
    line_width = 3;  
}

function width_thick() {
    line_width = 5; 
}

getPosition = function (obj) {
    var x = 0, y = 0;
    if (obj.offsetParent) {
        do {
            x += obj.offsetLeft;
            y += obj.offsetTop;
            obj = obj.offsetParent;
        } while (obj);
    }
    return {'x': x, 'y': y};
};

getSize = function (obj) {
    var x = 0, y = 0;
    x = obj.offsetWidth ;
    y = obj.offsetHeight ; 
    return {'w': x, 'h': y};
};

// Get mouse event position in DOM element
getEventPosition = function (e, obj, scale) {
    var evt, docX, docY, pos;
    //if (!e) evt = window.event;
    evt = (e ? e : window.event);
    if (evt.pageX || evt.pageY) {
        docX = evt.pageX;
        docY = evt.pageY;
    } else if (evt.clientX || evt.clientY) {
        docX = evt.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        docY = evt.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    pos = getPosition(obj);
    if (typeof scale === "undefined") {
        scale = 1;
    }
    return {'x': (docX - pos.x) / scale, 'y': (docY - pos.y) / scale};
};

function init() { 
    $('.js-enabled').memu({ 
				icon: {
			  		inset: true,
					margin: {
						top: 4,
						right: 10
					}
				},
				width: 150,
				rootWidth: 75,
				height: 25
			  });

    var canvas = document.getElementById('tutorial') ; 
    var canvasWidth = canvas.offsetWidth; 
    var canvasHeight = canvas.offsetHeight;
    console.log(canvasWidth, canvasHeight); 

    //    el.style.position = "fixed";
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    //    el.style.top = 0 ; //(viewportHeight - canvasHeight) / 2;

    canvas.onselectstart = function() { return false; }
    canvas.addEventListener('mousedown',ev_mousedown,false); 
    canvas.addEventListener('mousemove',ev_mousemove,false);
    canvas.addEventListener('mouseup',ev_mouseup,false); 
    canvas.addEventListener('mousedoubleclick',ev_mousedclick,false); 
    
    $("#pen").click(tools_pen);
    $("#erase").click(tools_erase);
    $("#black").click(color_black);
    $("#blue").click(color_blue);
    $("#red").click(color_red);
    $("#green").click(color_green);
    $("#fine").click(width_fine);
    $("#medium").click(width_medium);
    $("#thick").click(width_thick);
    $("#save").click(save);
    $("#clear").click(clear);
    $("#colorpickbtn").click(colorpick); 
    clear(); 

    $("#colorpickerField1").colorpicker({});
}

function colorpick() 
{
    var col=$("#colorpickerField1").val();
    if (col != null) {
      color_mode = "gen";
      color_rgb = col;
    }
    return false; 
}


function save() { 
    var canvas = document.getElementById('tutorial');
    var dataURL = canvas.toDataURL("image/png"); 
    console.log(dataURL);
    document.getElementById("canvasImg").src = dataURL;
//    $.ajax({ type : 'POST', 
//             url : 'http://susy.physics.lsa.umich.edu:7500/uploadwebcanvas',
//             img : dataURL
//           }, 
//           function(data) {});

    $.post('http://susy.physics.lsa.umich.edu:7500/uploadwebcanvas', 
           { 
             img : canvas.toDataURL("image/png")
           }, 
           function(data) {});
}


function clear() { 
    var canvas = document.getElementById('tutorial'); 
    if (canvas.getContext) { 
      var ctx = canvas.getContext('2d');
      // var siz = getSize(canvas); 
      ctx.fillStyle="rgb(255,255,255)";
      console.log(canvas.width);
      console.log(canvas.height);
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}


function ev_mousedclick(ev) { 
    console.log('double clicked'); 
}

function ev_mousedown(ev) {
    var eventpos = getEventPosition( ev, this ) ; 
    x = eventpos.x ; 
    y = eventpos.y ;

    mousedownenter = true ; 

    //    console.log(x,y);
    //    console.log('mouse button down');

    var canvas = document.getElementById('tutorial'); 

    console.log(getSize(canvas)) ;

    if (canvas.getContext) { 
      var ctx = canvas.getContext('2d'); 
      if( tools_mode == "pen") { 
         ctx.beginPath(); 
         ctx.moveTo(x,y) ;
      }
      else if( tools_mode == "erase") {
         ctx.fillStyle="rgb(255,255,255)"; 
         ctx.fillRect(x-5,y-5,10,10);          
      }  
    }
}

function ev_mousemove(ev) {
    if( mousedownenter ) { 
	var eventpos = getEventPosition( ev, this ) ; 
	x = eventpos.x ; 
	y = eventpos.y ;
	
	//	console.log(x,y);
	var canvas = document.getElementById('tutorial'); 
	if (canvas.getContext) { 
	  var ctx = canvas.getContext('2d');
          if( tools_mode == "pen" ) { 
            ctx.strokeStyle = color_rgb; 
            ctx.lineWidth = line_width;
	    ctx.lineTo(x,y) ;  
	    ctx.stroke();
          }
          else if( tools_mode == "erase" ) {
            ctx.fillStyle="rgb(255,255,255)"; 
            ctx.fillRect(x-5,y-5,10,10);          
          }    	    
	}
    }
}

function ev_mouseup(ev) {
    var eventpos = getEventPosition( ev, this ) ; 
    x = eventpos.x ; 
    y = eventpos.y ;

    mousedownenter = false ;

    //    console.log(x,y);
    //    console.log('mouse button up'); 
} 
