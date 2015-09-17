$(function() {
    /*初始化滚动条*/
    $("html").niceScroll({
        autohidemode: false,
        cursorwidth: 6,
        cursorborder: "none",
        cursorcolor: "#00713d",
        horizrailenabled: false,
        cursorborderradius: "3px",
        zindex: "999",
        preservenativescrolling: false
    });
    /*移动端侧栏*/
    if ('ontouchstart' in window) {
        var click = 'touchstart';
    } else {
        var click = 'click';
    }
    $('div.burger').on(click, function () {
        if (!$(this).hasClass('open')) {
            $('.menu').css('height','90%');
            openMenu();
        } else {
            $('.menu').css('height','auto');
            closeMenu();
        }
    });
    /*$('div.menu ul li a').on(click, function (e) {
     e.preventDefault();
     closeMenu();
     });*/
    function openMenu() {
        $('div.menu-bg').addClass('animate');
        $('div.burger').addClass('open');
        $('div.x, div.z').addClass('collapse');
        $('.menu li').addClass('animate');
        setTimeout(function () {
            $('div.y').hide();
            $('div.x').addClass('rotate30');
            $('div.z').addClass('rotate150');
        }, 70);
        setTimeout(function () {
            $('div.x').addClass('rotate45');
            $('div.z').addClass('rotate135');
        }, 120);
    }
    function closeMenu() {
        $('.menu li').removeClass('animate');
        setTimeout(function () {
            $('div.burger').removeClass('open');
            $('div.x').removeClass('rotate45').addClass('rotate30');
            $('div.z').removeClass('rotate135').addClass('rotate150');
            $('div.menu-bg').removeClass('animate');
            setTimeout(function () {
                $('div.x').removeClass('rotate30');
                $('div.z').removeClass('rotate150');
            }, 50);
            setTimeout(function () {
                $('div.y').show();
                $('div.x, div.z').removeClass('collapse');
            }, 70);
        }, 100);
    }


    /*企业荣誉大图*/
    $('.honor .box').on(click, function(){
        $('body').append('<div class="bg"></div><img class="zoomImg" src=""/>');
        var $img = $('.zoomImg');
        $img.attr('src', $(this).children('img').attr('src'));
        var imgWidth = $img.width();
        var imgHeight = $img.height();
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var imgLeft = 0;
        var imgTop = 0;
        if(imgWidth > winWidth){
            imgTop = (winHeight - imgHeight)/2;
            $img.css({'left': '5%','top': imgTop,'width': '90%','height': 'auto'});
        }else{
            imgLeft = (winWidth - imgWidth)/2;
            imgTop = (winHeight - imgHeight)/2;
            //console.log($('.zoomImg').width());
            $img.css({'left': imgLeft,'top': imgTop});
        }
    });

    /*关闭弹出层*/
    $('body').delegate('.bg', click, function(){
        $(this).remove();
        $('.zoomImg').remove();
    })
});