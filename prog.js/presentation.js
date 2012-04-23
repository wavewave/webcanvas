$(function() { 
    var url = "http://susy.physics.lsa.umich.edu:7500/listwebcanvas"; 
    var params = { format : 'json' }; 
    $.getJSON( url, params, callback ); 
      
  }); 


function callback( json ) { 
    $('#impress').empty(); 
    $.each(json, function(i,n) {
        console.log(i); 
	var str = "" ; 
        str += '<div id="pic' + i + '" class="step slide" data-x="-' + i*1000 + '" data-y="-1000" ><q>' + n.uuid + '</q></div>' ; 
	$(str).prependTo('#impress');
        console.log(str);
	//str = i; 
        console.log(n.uuid);
        var url = "http://susy.physics.lsa.umich.edu:7500/webcanvas/" + n.uuid
        var params = { format : 'json' };
        $.getJSON( url, params, function(json) { imgcallback(i,json) } );          
    });
    impress().init();
}

function imgcallback( i, json ) { 
    // console.log(json);
    var idee='#pic' + i; 
    console.log('size =' + $(idee).size());
    $(idee).empty();
    var str = '<img src="' + json + '" width="100%" />';
    $(str).appendTo(idee);    
}
