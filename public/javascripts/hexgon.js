

(function (){
	var line_odd = $('<div class="lineF"> </div>');
	var line_even = $('<div class="lineS"> </div>');	
	var hexagon = $('<div class="boxF"> <div class="boxS"> <div class="boxT">   <div class="overlay"></div></div> </div> </div>');
	
	var data = heroes;
	var n = (data.length / 13) * 2 ;
		for (var i = 0; i < 52;  i++) {
				var boxF = $('<div class="boxF">  </div>');
				var boxS = $('<div class="boxS">   </div>');
				var boxT = $('<a class="boxT"> </a>');
				var guideUrl = '/api/guide/all/' + data[i]['name'];
				boxT.attr('href', guideUrl);
				var icon_url = 'https://www.heroesfire.com/images/wikibase/icon/heroes/' + data[i]['name'] + '.png';
				boxT.attr('style', 'background-image:url(' +  icon_url +  ')' );
				var overlay = $(data[i]['Free'] ?   $('<div class="overlay free" >   </div> ') : $('<div class="overlay" >  </div> '));
 
				//var info_position = 'top:' + 58.24 * i +  'px; ' +   'left:' + 33.6 * (i % 2) +  'px;'    ;
				//var li = $('<li> </li>');
				
				
	
				//info.attr('style', info_position);	
				boxT.append(overlay);			
				boxS.append(boxT);
				boxF.append(boxS);
		
				
				$('#hive').append($('<li> </li>').append(boxF)); 
		
			
		
		}
	
	
	
	
	

}) ();