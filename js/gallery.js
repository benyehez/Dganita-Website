dganita = {
	arrImgs: null,
	curIdx: 0,
	rightArrowClick: function() {
		var arrow_r = document.getElementById('arrow_r');
		var arrow_l = document.getElementById('arrow_l');
		if(dganita.curIdx == dganita.arrImgs.length - 1)
			return
		dganita.curIdx = dganita.curIdx + 1;
		arrow_l.style.visibility='visible';
		if(dganita.curIdx == dganita.arrImgs.length - 1)
		{
			arrow_r.style.visibility='hidden';
		}
		else
		{
			arrow_r.style.visibility='visible';
		}
		dganita.animateGallery();
	},
	leftArrowClick: function() {
		var arrow_r = document.getElementById('arrow_r');
		var arrow_l = document.getElementById('arrow_l');
		if(dganita.curIdx == 0)
			return
		dganita.curIdx = dganita.curIdx - 1;
		arrow_r.style.visibility='visible';
		if(dganita.curIdx == 0)
		{
			arrow_l.style.visibility='hidden';
		}
		else
		{
			arrow_l.style.visibility='visible';
		}
		dganita.animateGallery();
	},
	animateGallery: function(){
		var offset = $($("#glr_tbl td")[dganita.curIdx]).attr("offset");
		
		$("#arrow_r,#arrow_l").unbind();
		$("#glr_tbl").animate({
			'left': offset + 'px'
		}, {
			'duration': 1000,
			'complete': function(){
				$("#arrow_r").click(dganita.rightArrowClick);
				$("#arrow_l").click(dganita.leftArrowClick);
			}
		});
	}
}

$(document).ready(function(){
	var container = $("#content");
	container.hide();
	dganita.arrImgs = $("#content img");
	$("#content img").remove();
	container.show();
	var table1 = $("<table style='width:500px;table-layout:fixed;overflow:hidden; white-space: nowrap;'><tr>" + 
	"<td style='width:50px'><p id='arrow_r' style='font:250% Arial;color:#fffef2;text-align:left;visibility:visible;'> < </p></td>" + 
	"<td style='width:400px;overflow:hidden' id='cont2'></td>" + 
	"<td style='width:50px'><p id='arrow_l' style='font:250% Arial;color:#fffef2;text-align:right;visibility:hidden;'> > </p></td>" + 
	"</tr></table>");
	container.append(table1);
	var totalWidth = 0;
	for(var i = 0; i < dganita.arrImgs.length; i++){
		var width = Math.max(parseInt($(dganita.arrImgs[i]).attr("width"), 10), 400);
		totalWidth += width;
	}
	var table = $("<table id='glr_tbl' style='position:relative' width='" + totalWidth + "'><tr></tr></table>");
	var offset = 0;
	for(var i = 0; i < dganita.arrImgs.length; i++){
		var width = Math.max(parseInt($(dganita.arrImgs[i]).attr("width"), 10), 400);
		var td = $("<td style='text-align:center' valign='top' width='" + width + "' offset='" + offset + "'></td>");
		offset += width;
		td.append(dganita.arrImgs[i]);
		table.append(td);
	}
	$("#cont2").append(table);

	$("#arrow_r").click(dganita.rightArrowClick);
	$("#arrow_l").click(dganita.leftArrowClick);

// uncomment the following to put the next collection titles below the pictures
//	$("#content>div").remove().appendTo($("#content"));
});