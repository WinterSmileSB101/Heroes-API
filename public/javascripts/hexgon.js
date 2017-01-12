

(function (){
	
		
	var line_odd = $('<div class="lineF"> </div>');
	var line_even = $('<div class="lineS"> </div>');	
	var hexagon = $('<div class="boxF"> <div class="boxS"> <div class="boxT">   <div class="overlay"></div></div> </div> </div>');
	var data =  [{"Hero":"abathur","ID":"'6' ","Free":false},{"Hero":"anubarak","ID":"'1000' ","Free":false},{"Hero":"artanis","ID":"'1639' ","Free":false},{"Hero":"arthas","ID":"'23' ","Free":false},{"Hero":"azmodan","ID":"'1001' ","Free":false},{"Hero":"brightwing","ID":"'392' ","Free":false},{"Hero":"chen","ID":"'963' ","Free":true},{"Hero":"cho","ID":"'1707' ","Free":false},{"Hero":"chromie","ID":"'2037' ","Free":false},{"Hero":"dehaka","ID":"'1952' ","Free":false},{"Hero":"diablo","ID":"'20' ","Free":true},{"Hero":"etc","ID":"'19' ","Free":false},{"Hero":"falstad","ID":"'10' ","Free":false},{"Hero":"gall","ID":"'1735' ","Free":false},{"Hero":"gazlowe","ID":"'3' ","Free":false},{"Hero":"greymane","ID":"'1808' ","Free":false},{"Hero":"illidan","ID":"'9' ","Free":false},{"Hero":"jaina","ID":"'1101' ","Free":false},{"Hero":"johanna","ID":"'1392' ","Free":false},{"Hero":"kaelthas","ID":"'1324' ","Free":false},{"Hero":"kerrigan","ID":"'11' ","Free":false},{"Hero":"kharazim","ID":"'1536' ","Free":false},{"Hero":"leoric","ID":"'1472' ","Free":false},{"Hero":"li-li","ID":"'672' ","Free":false},{"Hero":"li-ming","ID":"'1860' ","Free":false},{"Hero":"lt-morales","ID":"'1676' ","Free":true},{"Hero":"lunara","ID":"'1774' ","Free":false},{"Hero":"malfurion","ID":"'15' ","Free":true},{"Hero":"muradin","ID":"'21' ","Free":false},{"Hero":"murky","ID":"'708' ","Free":false},{"Hero":"nazeebo","ID":"'2' ","Free":false},{"Hero":"nova","ID":"'13' ","Free":false},{"Hero":"raynor","ID":"'1' ","Free":false},{"Hero":"rehgar","ID":"'879' ","Free":false},{"Hero":"rexxar","ID":"'1565' ","Free":true},{"Hero":"sgt-hammer","ID":"'16' ","Free":true},{"Hero":"sonya","ID":"'12' ","Free":false},{"Hero":"stitches","ID":"'22' ","Free":false},{"Hero":"sylvanas","ID":"'1276' ","Free":false},{"Hero":"tassadar","ID":"'7' ","Free":false},{"Hero":"the-butcher","ID":"'1437' ","Free":false},{"Hero":"the-lost-vikings","ID":"'1209' ","Free":false},{"Hero":"thrall","ID":"'1143' ","Free":true},{"Hero":"tracer","ID":"'1993' ","Free":false},{"Hero":"tychus","ID":"'8' ","Free":false},{"Hero":"tyrael","ID":"'18' ","Free":false},{"Hero":"tyrande","ID":"'4' ","Free":false},{"Hero":"uther","ID":"'5' ","Free":false},{"Hero":"valla","ID":"'14' ","Free":true},{"Hero":"xul","ID":"'1892' ","Free":true},{"Hero":"zagara","ID":"'791' ","Free":false},{"Hero":"zeratul","ID":"'17' ","Free":true}];
	
	var n = (data.length / 13) * 2 ; 
	/**
	
	for (var i = 0; i < n;  i++) {
		
		var line = $('<ul class="lineF"> </ul>');
		
		var count = (i % 2 == 0  ? 7 : 6);
		
		
		var line_position = 'top:' + 58.24 * i +  'px; ' +   'left:' + 33.6 * (i % 2) +  'px;'    ;
		line.attr('style', line_position);	
		
		
	
		for (var j = 0; j < 7; j++) {
				
			
			if (j + 7 * i  < 52) {
				var boxF = $('<div class="boxF">  </div>');
				var boxS = $('<div class="boxS">   </div>');
				var boxT = $('<div class="boxT"> </div>');
				var icon_url = 'http://www.heroesfire.com/images/wikibase/icon/heroes/' + data[j + 7 * i ]['Hero'] + '.png';
				boxT.attr('style', 'background-image:url(' +  icon_url +  ')' );
				
				var overlay =  data[j+7*i]['Free'] ?   $('<div class="overlay free" >   </div> ') : $('<div class="overlay" >  </div> ');
				
				
				//var info_position = 'top:' + 58.24 * i +  'px; ' +   'left:' + 33.6 * (i % 2) +  'px;'    ;
				var li = $('<li> </li>');
				
				
				var p = 70 * i + 'px';
				var info = $('<div class="info  style="left:'   +  p +   '"   " > </div> ')
				//info.attr('style', info_position);	
				boxT.append(overlay);			
				boxS.append(boxT);
				boxF.append(boxS);
				li.append(boxF);
				overlay.append(info);
				
				
				line.append(li);
	
			}
				
		
		}		
		
		
	
		$('.box').append(line); 
		
				
	}
	
	**/
	
		for (var i = 0; i < 52;  i++) {
				var boxF = $('<div class="boxF">  </div>');
				var boxS = $('<div class="boxS">   </div>');
				var boxT = $('<div class="boxT"> </div>');

				var icon_url = 'http://www.heroesfire.com/images/wikibase/icon/heroes/' + data[i ]['Hero'] + '.png';
				boxT.attr('style', 'background-image:url(' +  icon_url +  ')' );
				
				var overlay =  data[i]['Free'] ?   $('<div class="overlay free" >   </div> ') : $('<div class="overlay" >  </div> ');
				
				
				//var info_position = 'top:' + 58.24 * i +  'px; ' +   'left:' + 33.6 * (i % 2) +  'px;'    ;
				//var li = $('<li> </li>');
				
				
	
				//info.attr('style', info_position);	
				boxT.append(overlay);			
				boxS.append(boxT);
				boxF.append(boxS);
		
				
				$('#hive').append($('<li> </li>').append(boxF)); 
		
			
		
		}
	
	
	
	
	

}) ();