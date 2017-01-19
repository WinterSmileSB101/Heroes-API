(function (){
	var line_odd = $('<div class="lineF"> </div>');
	var line_even = $('<div class="lineS"> </div>');	
	var hexagon = $('<div class="boxF"> <div class="boxS"> <div class="boxT">   <div class="overlay"></div></div> </div> </div>');
	
	var data = heroes;
	var n = (data.length / 13) * 2 ;
	
		for (var i = 0; i < 52;  i++) {
			var boxF = $('<a class="boxF">  </a>');
			var boxS = $('<div class="boxS">   </div>');
			var boxT = $('<div class="boxT">    </div>');
			var guideUrl = '/api/guide/all/' + data[i]['name'];
			boxF.attr('href', guideUrl);
			var icon_url = 'https://www.heroesfire.com/images/wikibase/icon/heroes/' + data[i]['name'] + '.png';
			boxT.attr('style', 'background-image:url(' +  icon_url +  ')' );
			var overlay = $(data[i]['Free'] ?   $('<div class="overlay free" >   </div> ') : $('<div class="overlay" >  </div> '));

			boxT.append(overlay);
			boxS.append(boxT);
			boxF.append(boxS);
			$('#hive').append($('<li> </li>').append(boxF));
		}

}) ();