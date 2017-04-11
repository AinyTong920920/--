/**
 * Created by My on 2017/2/6.
 */
// 表单验证
$(function () {
    var ckResult = '';
    var checkForm = {
        //昵称验证
        ck_nick: function (elem) {
            var par = /\s/;//空格
            if (elem.val().trim().length) {
                return 'ok';
            } else if (elem.val().length > 0 && (par.test(elem.val()))) {
                return 'space';
            } else {
                return 'error';
            }
        },
        //密码验证
        ck_pwd: function (elem) {

            var par1 = elem.val().length >= 6 && elem.val().length <= 16; //6-16字符
            var par2 = !(/\s/.test(elem.val()));//不含空格
            var par3 = !(/^([+-]?)\d*\.?\d+$/.test(elem.val())) || (/^([+-]?)\d*\.?\d+$/.test(elem.val()) && elem.val().length > 9);//非9位以下纯数字

            //清空时，恢复默认样式
            if (elem.val().length == 0) {
                console.log($('#pwd_tips div'));
                $('#pwd_tips div').attr('class', 'default');
                return;
            }

            if (par1) {
                $('#pwd_tip1').attr('class', 'yes');
            } else {
                $('#pwd_tip1').attr('class', 'no red');
            }
            if (par2) {
                $('#pwd_tip2').attr('class', 'yes');
            } else {
                $('#pwd_tip2').attr('class', 'no red');
            }
            if (par3) {
                $('#pwd_tip3').attr('class', 'yes');
            } else {
                $('#pwd_tip3').attr('class', 'no red');
            }

            if (par1 && par2 && par3) {
                return true;
            } else {
                return false;
            }
        },
        //密码安全等级判断
        ck_pwd_lv: function (elem) {
            var iptxt = elem.val().trim();

            //字符类型个数
            function chTypeNum() {
                var num = 0;
                if (/[a-z]{1,}/g.test(iptxt)) {//至少含一个小写字母
                    num++;
                }
                if (/[A-Z]{1,}/g.test(iptxt)) {//至少含一个大写字母
                    num++;
                }
                if (/[0-9]{1,}/g.test(iptxt)) {//至少含一个数字
                    num++;
                }
                if (/[^a-zA-Z0-9]+/.test(iptxt)) {//其它
                    num++;
                }
                return num;
            }

            var tnum = chTypeNum();

            //都为同一字符
            function isAllSame() {
                for (var i = 0; i < iptxt.length - 1; i++) {
                    if (iptxt.charAt(i) != iptxt.charAt(i + 1)) {
                        return false;
                    }
                }
                return true;
            }

            //等级判断
            if (isAllSame()) {
                return 'allSame';
            } else if (tnum > 2 && iptxt.length >= 8) {
                return 'high';
            } else if ((tnum == 2 && iptxt.length >= 8) || (tnum > 2 && iptxt.length < 8)) {
                return 'middle';
            } else {
                return 'low';
            }
        },
        ck_rePwd: function (elem) {
            if ($('#password').val().trim().length) {//先判断第一个密码框是否有内容且不为空
                if (elem.val() == $('#password').val()) {
                    return 'ok';
                }
                if (elem.val().length > 0) {
                    return 'error';
                }
                if (elem.val().length == 0) {
                    return 'reWrite';
                }
            } else {
                return 'reWrite';
            }
        },
        ck_phoneNum: function (elem) {
            if (/^1[3|5|7|8][0-9]\d{4,8}$/.test(elem.val())) {
                return 'ok';
            } else {
                return 'error';
            }
        },
        ck_email:function (elem) {
            if(/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$ /.test(elem.val())){
                return 'ok';
            }else {
                return 'error';
            }
        }
    };


    //-----------昵称------------
    $('input#nick').focus(function () {
        $(this).parent('.bg_txt').attr('class', 'bg_txt bg_focus');
        $('#nick_info').attr('class', 'tip').text('请输入昵称');
    });

    $('input#nick').blur(function () {
        ckResult = checkForm.ck_nick($(this));
        $('#nick_bg').removeClass('bg_focus');

        switch (ckResult) {
            case 'ok':
                $('#nick_bg').attr('class', 'bg_txt');
                $('#nick_info').attr('class', 'ok').text('');
                break;
            case 'error':
                $('#nick_bg').attr('class', 'bg_txt bg_error');
                $('#nick_info').attr('class', 'error').text('昵称不可以为空');
                break;
            case 'space':
                $('#nick_bg').addClass('bg_error');
                $('#nick_info').attr('class', 'error').text('昵称不可以为空格');
                break;
        }

    });

    // -------------密码-------------
    $('input#password').focus(function () {
        $(this).parent('.bg_txt').attr('class', 'bg_txt bg_focus');
        $('#pwd_tips').attr('class', 'pwd_tips');
        $('#pwd_result').attr('class', 'hide');
    });
    $('input#password').keyup(function () {
        ckResult = checkForm.ck_pwd($(this));
    });
    $('input#password').blur(function () {
        if ($(this).val().length == 0) {//失去焦点后查看值为空
            $('#pwd_tips div').attr('class', 'default');
            $('#password_bg').attr('class', 'bg_txt bg_error');
        } else {
            ckResult = checkForm.ck_pwd($(this));
            var level = checkForm.ck_pwd_lv($(this));

            if (ckResult) {
                $('#pwd_tips').attr('class', 'pwd_tips hide');
                $('#password_bg').attr('class', 'bg_txt');
                $('#pwd_result').attr('class', '');
                switch (level) {
                    case 'allSame':
                        $('#password_pic').attr('class', 'rankLow').text('弱');
                        $('#password_info').text('相同字符密码易被破解，请用多组合的密码');
                        break;
                    case 'high':
                        $('#password_pic').attr('class', 'rankHigh').text('高');
                        $('#password_info').text('密码强度好，请记牢！');
                        break;
                    case 'middle':
                        $('#password_pic').attr('class', 'rankMiddle').text('中等');
                        $('#password_info').text('复杂度还行，再加强一下等级？');
                        break;
                    case 'low':
                        $('#password_pic').attr('class', 'rankLow');
                        $('#password_info').text('试试字母、数字、标点的组合吧');
                        break;
                }
            } else {
                $('#pwd_tips').attr('class', 'pwd_tips');
                $('#pwd_result').attr('class', 'hide');
                $('#password_bg').attr('class', 'bg_txt bg_error');

            }
        }
    });

    // -------------确认密码-------------
    $('input#password_again').focus(function () {
        $('#password_again_info').attr('class', 'tip').text('请再次输入密码');
        $(this).parent('.bg_txt').attr('class', 'bg_txt bg_focus');
    });

    $('input#password_again').keyup(function () {
        ckResult = checkForm.ck_rePwd($(this));
    });

    $('input#password_again').blur(function () {
        ckResult = checkForm.ck_rePwd($(this));
        switch (ckResult) {
            case 'ok':
                $('#password_again_bg').attr('class', 'bg_txt');
                $('#password_again_info').attr('class', 'ok').text('');
                break;
            case 'error':
                $('#password_again_bg').attr('class', 'bg_txt bg_error');
                $('#password_again_info').attr('class', 'error').text('密码不一致');
                break;
            case 'reWrite':
                $('#password_again_bg').attr('class', 'bg_txt bg_error');
                $('#password_again_info').attr('class', 'error').text('请再次输入密码');
                break;
        }
    });

    //-------------性别选择-----------
    $('.sex_box>a').click(function () {
        $(this).attr('class', 'checked').siblings().removeClass('checked');
    });

    //-----------手机号码------------
    $('input#phone_num').focus(function () {
        $(this).parent('.bg_txt').attr('class', 'bg_txt bg_focus');
    });
    $('input#phone_num').blur(function () {
        if ($(this).val().length == 0) {
            $('#phone_num_bg').attr('class', 'bg_txt');
        } else {
            ckResult = checkForm.ck_phoneNum($(this));
            switch (ckResult) {
                case 'ok':
                    $('#phone_num_bg').attr('class', 'bg_txt');
                    $('#phone_info').attr('class', 'ok').text('');
                    break;
                case 'error':
                    $('#phone_num_bg').attr('class', 'bg_txt bg_error');
                    $('#phone_info').attr('class', 'error').text('请输入有效的手机号码');
                    break;
            }
        }
    });

    $('input#phone_num').keyup(function () {
        if ($(this).val()) {
            $('#phone_del').attr('class', 'phone_del').click(function () {
                $('input#phone_num').val('');
                $(this).attr('class', 'phone_del hide');
                $('#phone_num_bg').attr('class', 'bg_txt');
                $('#phone_info').attr('class', 'hidden').text('');
            });
        } else {
            $('#phone_del').attr('class', 'phone_del hide');
        }
    });

    //--------是否开通空间---------
    $('#qzone').click(function () {
        if ($(this).attr('class') == 'checked') {
            $(this).attr('class', 'unchecked');
        } else {
            $(this).attr('class', 'checked');
        }
    });

    //--------注册按钮是否禁用,是否同意条款---------
    $('#agree').click(function () {
        if ($(this).attr('class') == 'a_1 checked') {
            $(this).attr('class', 'a_1 unchecked');
            $('#submit').attr('disabled', 'true').addClass('disabled');
        } else {
            $(this).attr('class', 'a_1 checked');
            $('#submit').removeAttr('disabled').removeClass('disabled');
        }
    });


    //公历动态添加的方法
    var calender_Data = {
        add_year: function () {
            if ($('#birthday_type_value').val() == '0') {
                //年份
                $('#year_value').empty();//置空
                for (var i = 1898; i < 2018; i++) {
                    if (i == 1996) {//默认选中1996年
                        $('#year_value').prepend('<option selected id="year_' + (i - 1898) + ' value="' + i + '">' + i + '年</option>');
                    }
                    $('#year_value').prepend('<option id="year_' + (i - 1898) + ' value="' + i + '">' + i + '年</option>');
                }
            }
        },
        add_month: function () {
            if ($('#year_value').val()) {
                //月份
                $('#month_value').empty();//置空
                for (var i = 1; i < 13; i++) {
                    $('#month_value').append('<option id="month_' + (i - 1) + ' value="' + i + '">' + i + '月</option>');
                }
            }
        },
        add_day: function () {
            if ($('#month_value').val()) {
                //日期
                $('#day_value').empty();//置空
                var currentYear = $('#year_value').val().slice(0, -1);
                var currentMonth = $('#month_value').val().slice(0, -1);

                var month_type1 = ['1', '3', '5', '7', '8', '10', '12'];//每月31天
                var month_type2 = ['4', '6', '9', '11'];//每月30天

                var total = 0;
                if (month_type1.indexOf(currentMonth) > -1) {
                    total = 31;
                } else if (month_type2.indexOf(currentMonth) > -1) {
                    total = 30;
                } else {//平年和闰年2月日期判断
                    if ((currentYear % 4 == 0 && currentYear % 100 != 0) || currentYear % 400 == 0) {
                        total = 29;
                    } else {
                        total = 28;
                    }
                }
                for (var i = 1; i <= total; i++) {
                    $('#day_value').append('<option id="day_' + (i - 1) + ' value="' + i + '">' + i + '日</option>');
                }
            }
        }
    };

    //-------------生日选择-------------
    //默认选择公历生日
    $('#year_value').focus(function () {
        calender_Data.add_year();
    });
    //选择年份后添加月份
    $('#month_value').focus(function () {
        calender_Data.add_month();
    });

    //选择月份后添加日期
    $('#day_value').focus(function () {
        calender_Data.add_day();
    });

    //-------------地区选择-------------
    //视图更新工具函数
    function updateView(parentId, data, info) {
        $('#' + parentId).empty();//每次更新数据时置空
        if (info) {
            $(data).each(function (index, ele) {
                $('#' + parentId).append('<option>' + this[info] + '</option>');
            });
        }
        else {
            $(data).each(function (index, ele) {
                $('#' + parentId).append('<option>' + this + '</option>');
            });
        }
    }

    //初始化地区默认选项
    // updateView('country_value', initLocation, 'n');
    inintArea(0);
    function inintArea(i) {
        updateView('country_value', datas, 'name');
        $('#country_value option').eq(i).attr('selected', 'true');
        updateView('province_value', datas[i].city, 'name');
        updateView('city_value', datas[i].city[0].area);
    }
    


    var province = '', pIndex = 0, city = '', cIndex = 0;
    //    选择province后，适配city
    $('#country_value').change(function () {
        province = $(this).val();
        $('#country_value option').each(function (index, ele) {
            if ($(this).html() == province) {
                pIndex = $(this).index();
            }
        });
        inintArea(pIndex);
        updateView('province_value', datas[pIndex].city, 'name');
    });

    //  选择city后，适配area
    $('#province_value').change(function () {
        city = $(this).val();
        $('#province_value option').each(function (index, ele) {
            if ($(this).html() == city) {
                cIndex = $(this).index();
            }
        });

        updateView('city_value', datas[pIndex].city[cIndex].area);
    });

    
    
    
    
    


});


