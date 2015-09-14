/**
 * Created by Administrator on 2015/5/6.
 */
(function($){
    $.fn.extend({
        // coffee方法,事件管理
        coffee: function (obj) {
            for (var eName in obj)
                for (var selector in obj[eName])
                    $(this).on(eName, selector, obj[eName][selector]);
        },
        // 返回顶部
        bTop: function () {
            // autohide 自动隐藏
            // offset 距离顶部多少距离时自动隐藏按钮
            // speed 滚动持续时间
            // position 如果设置为 false，则需要手动在 css 中设置“按钮”的位置
            // right 右侧距离
            // bottom 底部距离
            this.click(function () {
                $("html,body").stop(true).animate({scrollTop: 0}, 1000);
            });
        },
        // 弹出层插件
        layer: function(opts){
            var defaults = {
                v: '0.0.1',
                trigger : 'click',
                type: 'msg',
                shade: [0.3, '#000'],  //弹出遮罩层，默认#000，透明度0.3，关闭为false
                size: [630, 360],   //弹出层尺寸
                scrollbar: true,
                page: ''
            }, options = $.extend(defaults, opts);
            return this.each(function(){
                var Func,lay,page = $(this).data('url');

                if(options.type === 'msg'){
                    Func = function(module, callback){
                        if($('#layer').length < 1){
                            /*$('<div class="layer" id="layer"><div class="layer-box"><div class="layer-box-con"><embed src="' + page + '" quality="high" width="630" height="360" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed></div><div class="layer-close"></div></div></div></div>').appendTo('body');*/
                            $('body').append('<div class="layer" id="layer">');
                            var law = options.size[0]/2;
                            var lah = options.size[1]/2;
                            $("#layer").html('<div class="layer-box"><div class="layer-box-con"><embed src="' + page + '" quality="high" wmode="Transparent" width="630" height="360" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed></div><div class="layer-close"></div></div>');
                            $("#layer .layer-box").css({'margin-left':-law,'margin-top':-lah,'width': options.size[0],'height': options.size[1]});
                        }
                    }
                }else if(options.type === 'confirm'){
                    Func = function(module, callback){
                        $('<div>',{
                            html: '<div class="alertTip"><p class="tips">提示：' + module + '</p><a class="sure" href="javascript:;">确定</a><a class="cancel" href="javascript:;">取消</a></div>',
                            id: 'layer'
                        }).appendTo('body');
                        $('#layer,.alertTip').show();
                        $('.sure').click(callback);
                    }
                }else if(options.type === 'page'){
                    Func = function(module, callback) {

                    }
                }

                //弹出层效果
                var shade = options.shade ? $('<div class="layer-shade" id="layer-shade" style="opacity:'+ (options.shade[0]||options.shade) +'; filter:alpha(opacity='+ (options.shade[0]*100||options.shade*100) +');background-color:'+ (options.shade[1]||'#000') +';"></div>') : '';


                //点击关闭事件
                /*$('#layer,.cancel,.sure').on('click',function(){
                    $(this).remove();
                });*/

                /*$('body').on('click', '.layer-shade', function(){
                    $('#layer').remove();
                    $('body').css('overflow', 'auto');
                });*/

                $('body').coffee({
                    click: {
                        '.layer-shade,.layer-close': function(){
                            $('#layer').remove();
                            $('body').css('overflow', 'auto');
                        }
                    }
                });


                $(this).on(options.trigger, function(){
                    Func(options.page);
                    shade.prependTo('#layer');
                    //浏览器滚动条
                    options.scrollbar ? $('body').css('overflow', 'hidden') : '';
                })
            });
        },
        // 动画插件
        anim: function(opts){
            var defaults = {
                v: '0.0.1',
                delay: 200,   //延迟触发的距离
                ease: 'fadeInUp'
            }, options = $.extend(defaults, opts);
            return this.each(function(i) {
                var ease = $(this).attr('anim-ease') || options.ease,t = $(this);
                var bottom_of_object, bottom_of_window;   //元素距离顶部的值，元素进入视野的高度
                bottom_of_object = parseInt($(this).offset().top) + options.delay;
                bottom_of_window = $(window).scrollTop() + $(window).height();
                //console.log(bottom_of_object + "," + bottom_of_window);
                if (bottom_of_window > bottom_of_object) {
                    return $(this).addClass("active animated " + ease);
                }
            })
        },
        // 动态图
        gif: function(opts){
            var defaults = {
                v: '0.0.1',
                delay: 1000   //延迟时间
            }, options = $.extend(defaults, opts);
            return this.each(function() {
                var len = $(this).children().length;
                var that = $(this);
                var i = 0;
                setInterval(function(){
                    i >= len ? i = 0 : false;
                    that.children().eq(i).show();
                    that.children().eq(i-1).hide();
                    i++;
                }, options.delay || 1000);
            })
        }
    })
})(jQuery);
$(function(){
    /*初始化滚动条*/
    $("html").niceScroll({
        autohidemode:false,
        cursorwidth:6,
        cursorborder:"none",
        cursorcolor: "#00713d",
        horizrailenabled:false,
        cursorborderradius:"3px",
        zindex: "999",
        preservenativescrolling: false
    });

    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        loop:true,
        grabCursor: true,
        paginationClickable: true
    });
    $('.arrow-left').on('click', function(e){
        e.preventDefault();
        mySwiper.swipePrev()
    });
    $('.arrow-right').on('click', function(e){
        e.preventDefault();
        mySwiper.swipeNext()
    });

    var scrollbar = new Swiper('.scrollbar', {
        scrollContainer:true,
        mousewheelControl : true,
        mode:'vertical',
        //Enable Scrollbar
        scrollbar: {
            container :'.swiper-scrollbar',
            hide: false,
            draggable: true
        }
    });


    var tabsSwiper = new Swiper('.swiper-tabs',{
        speed:500,
        //mode: 'vertical',
        onSlideChangeStart: function(){
            $(".cont_pc_l .on").removeClass('on');
            $(".cont_pc_l li").eq(tabsSwiper.activeIndex).addClass('on')
        }
    });
    $(".cont_pc_l li").on('touchstart mousedown',function(e){
        e.preventDefault();
        $(".cont_pc_l .on").removeClass('on');
        $(this).addClass('on');
        tabsSwiper.swipeTo($(this).index())
    });
    $(".cont_pc_l li").click(function(e){
        e.preventDefault()
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



});