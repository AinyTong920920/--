$(function () {
    
    // 账号检测模拟
    $('a.login').click(function () {
        $('.login_checkbox').show();
    });
    $('.close_ckbox').click(function () {
        $('.login_checkbox').hide();
    });

    //抽奖程序
    var i = 0, raNum = 0, award = '', flag = true;
    $('.pale_pointer').hover(function () {
        $(this).addClass('hover');
    },function () {
        $(this).removeClass('hover');
    });

    $(".pale_pointer").clearQueue().click(function () {
        if (flag) {//防止重复点击后i的无效累加
            i++;
            flag=false;
            if (i > 3) {
                return overFn();
            }

            raNum = Math.random() * 360;//产生0~360之间的随机数

            if (157.5 < raNum && raNum <= 202.5) {//ipad抽中的概率
                // raNum = Math.random() * 202.5;
            }

            $(this).rotate({
                duration: 2000,//从开始到结束的时间
                angle: 0,//开始的角度
                animateTo: raNum + 1440,//旋转的角度
                callback: function () {//回调函数（转完之后。。。）
                    rotateFn();
                }
            });
        }
    });

    function rotateFn() {
        if (0 < raNum && raNum <= 22.5) {
            award = '1彩贝积分';
        }
        else if (22.5 < raNum && raNum <= 67.5) {
            award = '彩贝水杯';
        }
        else if (67.5 < raNum && raNum <= 112.5) {
            award = '蛇年QQ公仔';
        }
        else if (112.5 < raNum && raNum <= 157.5) {
            award = '1Q币';
        }
        else if (157.5 < raNum && raNum <= 202.5) {
            award = '16GiPad4——wifi版';
        }
        else if (202.5 < raNum && raNum <= 247.5) {
            award = '手机挂件';
        }
        else if (247.5 < raNum && raNum <= 292.5) {
            award = '2彩贝积分';
        }
        else if (292.5 < raNum && raNum <= 337.5) {
            award = 'Q哥Q妹公仔';
        }
        else {
            award = '1彩贝积分';
        }
        if (i == 3) {
            $('.replayBtn').hide();
            $('.time_over').delay(2000).show();
        }
        $('.result_layout').show();
        $('.result_txt .awards_name').text(award);
        flag=true;
    }

    // 转盘初始化
    function initFn() {
        $('.result_layout').hide();
        $('.result_txt .awards_name').text('');
    }

    //抽奖次数大于上限
    function overFn() {
        $('.result_layout').show();
        $('.result_txt .failed').show();
        $('.sucs').hide();
        $('.replayBtn').hide();
        $('.time_over').addClass('on');
    }

    // 抽奖结果弹框点击事件
    $('.closeBtn').click(function () {
        initFn();
    });

    $('.replayBtn').click(function () {
        initFn();
    });


});