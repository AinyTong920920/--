$(function () {
    //---------副导航nav2hover事件-------
    $('li.slpd').hover(function () {
        $('i.ico2_get').addClass('on');
    },function () {
        $('i.ico2_get').removeClass('on');
    });

    // 账号检测模拟
    $('a.login').click(function () {
        $('.login_checkbox').show();
    });
    $('.close_ckbox').click(function () {
        $('.login_checkbox').hide();
    });
    

    // -------section1左侧菜单-购物返彩贝商家---滑动门事件-------
    var busi_index=0,busi_height=0,pos_Top=0;
    $('.sideleft .menu_left>li').hover(function () {
        busi_index=$(this).index();
        busi_height=$(this).find('.busi_nav_panel').height();
        pos_Top=$(this).position().top;

        $(this).addClass('on').siblings().removeClass('on');
        $(this).find('.busi_nav_panel').addClass('on');

        judgePos(busi_index,busi_height,pos_Top);

    },function () {
        $(this).removeClass('on');
        $('.busi_nav_panel').removeClass('on');
    });

    //判断滑动菜单出现的位置
    function judgePos(index,height,pos_top) {
        var menuHeight=$('.menu_left').height()+16;
        console.log(menuHeight);
        console.log(height+pos_top);
        if(height+pos_top>menuHeight){
            pos_top=menuHeight-(height+pos_top);
            $('.menu_left>li').eq(index).find('.busi_nav_panel').css('top',pos_top+'px');
        }
    }
    
    //鼠标划入方向检测事件
    var DIR_POS = {
        left: {
            top: '0',
            left: '-100%'
        },
        right: {
            top: '0',
            left: '100%'
        },
        bottom: {
            top: '100%',
            left: '0'
        },
        top: {
            top: '-100%',
            left: '0'
        }
    };

    $('.busi_last').each(function () {
        new MouseDirection(this, {
            enter: function ($element, dir) {
                //每次进入前先把.trans类移除掉，以免后面调整位置的时候也产生过渡效果
                var $content = $element.find('.busilist_fanli').removeClass('trans');

                //调整位置
                $content.css(DIR_POS[dir]);

                //reflow
                $content[0].offsetWidth;

                //启用过渡
                $content.addClass('trans');

                //滑入
                $content.css({left: '0', top: '0'});
            },
            leave: function ($element, dir) {
                $element.find('.busilist_fanli').css(DIR_POS[dir]);
            }
        });
    });




    //------- 焦点图----------
    // 初始化
    $('.picList').css('left', 0);
    $('.titleList span').eq(0).addClass('on').siblings().removeClass('on');

    var posLeft = $('.picList li').width();
    var i = 0, Focustimer = null;

    function Focusshow() {
        if (i % 2) {
            $('.picList').stop().animate({
                'left': 0
            }, 500);
            $('.titleList span').eq(0).addClass('on').siblings().removeClass('on');
        }
        else {
            $('.picList').stop().animate({
                'left': -posLeft + 'px'
            }, 500);
            $('.titleList span').eq(1).addClass('on').siblings().removeClass('on');

        }
        i++;
    }

    Focustimer = setInterval(function () {
        Focusshow();
    }, 3000);

    $('.titleList span').stop().hover(function () {
        clearInterval(Focustimer);
        i = $(this).index() + 1;
        Focusshow();
    }, function () {
        Focustimer = setInterval(function () {
            Focusshow();
        }, 3000);
    });


    // -------快速入口icon图标hover时更改背景图定位---------
    var icon, icon_left;
    $('.quickEt_up li').hover(function () {
        icon = $(this).find('i');
        icon_left = icon.css('background-position').split(' ')[0];
        icon.css('background-position', icon_left + ' -114px');
    }, function () {
        icon.css('background-position', icon_left + ' -99px');
    });


    // -------右侧返回顶部，微信，购物导航-------
    // 返回顶部
    $('.mod_top').hide();
    $(window).scroll(function () {
        var myTop = $(window).scrollTop();
        if (myTop > 40) {
            $(".mod_top").fadeIn(300, function () {
                $(this).clearQueue();
            });
        } else {
            $(".mod_top").fadeOut(300, function () {
                $(this).clearQueue();
            });
        }
    });

    $(".mod_top_btn").on("click", function () {
        $("body,html").animate({
            scrollTop: 0
        }, 200);
    });

    // 微信导航
    $('.mod_top_edu').hover(function () {
        $('.edu_bd').css({
            'width':'700px',
            'height':'120px',
            'display':'block'
        }).hover(function () {
            $('.edu_bd').show();
        });
    },function () {
        $('.edu_bd').css({
            'width':'0',
            'height':'0',
            'display':'none'
        });
    });

    // 购物导航
    $('.mod_top_wx').hover(function () {
        $('.wx_bd').css({
            'width':'186px',
            'height':'96px'
        });
    },function () {
        $('.wx_bd').css({
            'width':'0',
            'height':'0'
        });
    });

    // -----------彩贝商旅tab切换事件------------
    //初始化
    $('.sec3_main ul.sec3_mod ').eq(0).show().siblings().hide();
    var tabIndex=0;
    $('.sec3_nav li').click(function () {
        tabIndex=$(this).index();
        $('.sec3_nav a').removeClass('on');
        $(this).find('a').addClass('on');
        $('.sec3_main ul.sec3_mod ').eq(tabIndex).show().siblings().hide();
    });




});
