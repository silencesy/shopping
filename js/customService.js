$(function(){
		// var oHeight = $(document).height(); //浏览器当前的高度   
		// // console.log(oHeight);
	 //    $(window).resize(function(){
		//     if($(document).height() < oHeight){
		//         $(".send-box").css("position","static");
		//     }else{ 
		//         $(".send-box").css({"position":"fixed","left": 0,"bottom":0});
		//     }
		// });
		var loaclHeight = $("section").height();//获取可视宽度
		$("input,textarea").focus(function() {
		var keyboardHeight = localHeight - $("section").height();//获取键盘的高度
		var keyboardY = localHeight - keyboardHeight;
		var addBottom = (parseInt($(this).position().top) + parseInt($(this).height()));//文本域的底部
		var offset = addBottom - keyboardY;//计算上滑的距离
		$("section").scrollTop(offset);
		});
});