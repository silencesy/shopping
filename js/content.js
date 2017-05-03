$(function(){

	// 点击减商品数量
	$(".sub").click(function(){
		var n=$(this).next().val();
		var num=parseInt(n)-1;
        if (num==1) {
           $(this).css("color","#BFBEBE"); 
        }
		if(num==0){
            return;
        }
		$(this).next().val(num);
	});
	// 点击增加商品数量
    // 
	$(".add").click(function(){
            $(this).prev().prev().css("color","#000");
			var n=$(this).prev().val();
			var num=parseInt(n)+1;
			if(num==0){
                return;
            }
			$(this).prev().val(num);
	});


    // 选择商品时按钮更换背景

    $(".point-selected").click(function() {
        $(this).toggleClass ("icon_right");         
    });

    $('.delete').on("click",function(){
        $(this).parent().parent().slideUp();
    });


	// 左滑删除
    var container = document.querySelectorAll('.contai');

    for(var i=0; i<container.length; i++) {
        
        var x, y, X, Y, swipeX, swipeY;
        
        container[i].addEventListener('touchstart', function (event) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
            swipeX = true;
            swipeY = true ;
        });

        container[i].addEventListener('touchmove', function (event) {

            X = event.changedTouches[0].pageX;
            Y = event.changedTouches[0].pageY;
            
            // 左右滑动
            if(swipeX && Math.abs(X-x) - Math.abs(Y-y) > 0) {

                // 阻止事件冒泡
                event.stopPropagation();

                if(X - x > 10) {
                    event.preventDefault();
                    this.style.left = '0px';
                }
                if(x - X > 10) {
                    event.preventDefault();
                    this.style.left = '-1.333333rem';
                }
                swipeY = false;
            }

            // 上下滑动
            if(swipeY && Math.abs(X-x) - Math.abs(Y-y) < 0) {
                swipeX = false;
            }
            
        });

    }
    
});