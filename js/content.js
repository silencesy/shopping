$(function(){
    new FastClick(document.body);
    input_value();


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
	$(".add").click(function(){
            $(this).prev().prev().css("color","#000");
			var n=$(this).prev().val();
			var num=parseInt(n)+1;
			if(num==0){
                return;
            }
			$(this).prev().val(num);
	});

    // 点击全选和全不选
    $("#checkedAll").click(function() {
        all = $(this).prop("checked");
        $(".icon_checkbox").each(function() {
            $(this).prop("checked", all);
        });
        addstyle();
    });

    // 设置统一样式
    function addstyle() {
        $(".sec .point-selected").each(function() {
            if ($(this).prop("checked")==true) {
                $(this).addClass('icon_right');

            } else {
               $(this).removeClass('icon_right');
               if ($("#checkedAll").prop("checked")==true) {
                $("#checkedAll").prop("checked","false");
               }
            }
        })
    };   
    

    
    $('.delete-checked').click(function(event) {
        $(".sec input[type='checkbox']:checked").parents('.sec').remove();
        cartIsEmpty();
    });

    // 选择商品时按钮更换背景
    $(".point-selected").click(function() {
        $(this).toggleClass("icon_right");
        allLight();
        totl();
    });
    // $(".checkProduct").click(function() {
    //     $(this).find('.point-selected').toggleClass("icon_right");
    //     $(this).find('.point-selected').change(function () {
    //         if($(this).is(':checked')){
    //             $(this).attr("checked",''); 
    //         }else{
    //             $(this).attr("checked",'true'); 
    //         }
    //     });
    //     allLight();
    //     totl();
    // });    

    // 当所有都选中时all亮起
    function allLight() {
        var i = 0;
        $(".sec .point-selected").each(function() {
            if ($(this).prop("checked")==true) {
                i++;
            }
        })
        if(i==$(".sec .point-selected").length){
            $('#checkedAll').addClass('icon_right');
            $("#checkedAll").prop("checked","true");
        } else {
            $('#checkedAll').removeClass('icon_right');
            $("#checkedAll").prop("checked","");
        }       
    }

    // 购物车是否为空
    function cartIsEmpty () {
        if ($('.sec').length===0) {
            location.href="http://www.baidu.com";//跳到空的购物车页面
        }
    }


    // 默认输入的值
    function input_value() {
        $('.productInfo-mumber').each(function(){
            $(this).parents('.sec').find('.numer').val($(this).text());
        })
    }

    // 购物车点击切换编辑
    $('.head-Edit-btn').click(function(){
        $(this).addClass('hide');
        $('.priceinfo').addClass('hide');
        $('.productInfo-box').addClass('hide');
        $('.producutNum').removeClass('hide');
        $('.head-done').removeClass('hide');
        $('.delete-checked').show();
        $('.topay-checked').hide();
    });
    $('.head-done').click(function(){
        $(this).addClass('hide');
        $('.priceinfo').removeClass('hide');
        $('.productInfo-box').removeClass('hide');
        $('.producutNum').addClass('hide');
        $('.head-Edit-btn').removeClass('hide');
        $('.numer').parents('.sec').find('.productInfo-mumber').text();
        $('.delete-checked').hide();
        $('.topay-checked').show();
        $('.numer').each(function(index, el) {
            $(this).parents('.sec').find('.productInfo-mumber').text($(this).val());
        });
        totl();
        $('.contai').each(function(){
            this.style.left = '0px';
        })            
    });    

    // 点击删除商品
    $('.delete').on("click",function(){
        $(this).parent().parent().remove();
        totl();
        cartIsEmpty ();
    });

    // 合计
    function totl() {
        var sum = 0;
       $(".sec input[type='checkbox']:checked").each(function(){
            sum += parseInt($(this)
                .parents('.sec')
                .find('.productInfo-pri-number')
                .text()) * parseInt($(this)
                .parents('.sec')
                .find('.productInfo-mumber')
                .text());
       });
       $('.priceAll-number').text(sum);

    }    


    // tap事件封装
    $(document).on("touchstart", function(e) {
    if(!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 0);
    });
    $(document).on("touchmove", function(e) {
        if(!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 1);
    });
    $(document).on("touchend", function(e) {
        if(!$(e.target).hasClass("disable") && $(e.target).data("isMoved") == 0) $(e.target).trigger("tap");
    });


    // 修改收货地址页
    $(".address-del").click(function(){
            $(this)
            .find('.address-circle')
            .addClass("address-right");
    $(this)
    .find('.address-circle')
    .addClass("address-color");
            $(this)
            .parents('.address-content')
            .siblings('.address-content')
            .find('.address-circle')
            .removeClass('address-right')
            .removeClass('address-color');  
        });
        $('.address-delete').on('click',function(){
            $(this).parents('.address-content').remove();
        });    







    
});