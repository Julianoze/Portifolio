$(document).ready(function(){
	$('td').click(function(){
		toggle = this.style;
		toggle.background = toggle.background? "":"#D4D4D4";
		toggle.color = toggle.color? "":"gray";
		$(this).css("border-color","blue");
		if(toggle.background == "")
			$(this).css({"border-color":"#D4D4D4"});
		else
			$(this).css({"border-color": "#BEBEBE"});
	});
	var usado=[0];
	for(var i=1;i<26;i++){
		number=Math.floor(Math.random()*75);
		if(i==0){
			$('#n'+i).append(number);
			usado[i]=Number(number);
		}
		else{
		j=0;
		while(j!=-1){
			j=usado.indexOf(number);
				if(j!=-1)
					number=Math.floor(Math.random()*75);
			}
		};
			usado[i]=Number(number);
			$('#n'+i).append(number);
	};	
});

