$(function() { 
    var url = "http://susy.physics.lsa.umich.edu:7500/listwebcanvas"; 
    var params = { format : 'json' }; 
    $.getJSON( url, params, callback ); 
      
  }); 


function callback( json ) { 
    $('#result').empty(); 
    $.each(json, function(i,n) {
        console.log(i); 
	var str = "" ; 
        str += '<hr/> <p>' + n.creationtime + ' </p> <div id="pic' + i + '" ></div>' ; 
	$(str).appendTo('#result');
        console.log(str);
	//str = i; 
        console.log(n.uuid);
        var url = "http://susy.physics.lsa.umich.edu:7500/webcanvas/" + n.uuid
        var params = { format : 'json' };
        $.getJSON( url, params, function(json) { imgcallback(i,json) } );          
    });

}

function imgcallback( i, json ) { 
    // console.log(json);
    var idee='#pic' + i; 
    console.log('size =' + $(idee).size());
    $(idee).empty();
    var str = '<img src="' + json + '" />';
    $(str).appendTo(idee);


    
}