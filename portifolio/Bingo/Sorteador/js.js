$(document).ready(function(){
	$("#reset").hide();
	$("#button").click(function(){
	var count=0;delay=100,j=0;
	for(var k=75;k>0;k--){
		$("td").hide();
		$("#numero").hide();
		j++;
		$("#n"+k).fadeIn(delay);
		$("#n"+j).fadeIn(delay);
		delay+=100;
	};
	for(var i=1;i<75;i++){
			if($("#n"+i).css("background-color")=="red"){
				count++;
			}
		};
		if(count==73){
				$("#button").hide();
				$("#reset").show();
		}
		var num=Math.floor(Math.random()*76);
		while($("#n"+num).css("background-color")=="red" || num==0 && count<75){
				num=Math.floor(Math.random()*76);
		};
			$("#numero").slideDown(4500);
			$("#numero").html("");
			$("#numero").append(num);
			$("#n"+num).css({"background":"red"});
	});
	$("#reset").click(function(){
		for(var i=1;i<76;i++){
			$("#n"+i).css({"background-color":""})
			$("#numero").html("PRONTOS?");
			$("#reset").hide();
			$("#button").show();
		};
	});
});