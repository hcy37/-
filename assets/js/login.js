$(()=>{
    
    $('#link_reg').on('click',()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 自定义校验规则
    var form=layui.form
    var layer=layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ],
        repwd:val=>{
            var pwd=$('.reg-box [name=password]')
            .val()
        if(pwd!==val){
            return '两次密码不一致'
        }
        }
    })

    //注册
    $('#form_reg').on('submit',e=>{
        e.preventDefault()
        var password=$('.reg-box [name=password]')
            .val()
        var username=$('.reg-box [name=user]')
        .val()
        $.ajax({
            url:'/api/reguser',
            type:'post',
            data:{
                username,
                password
            },
            success:res=>{
                if(res.status!==0){
                    return layer.msg(res.message);
                }

                layer.msg('注册成功，请登录!');
                $('#link_login').click()
            }
        })
    })

    //登录
    $('#form_login').on('submit',e=>{
        e.preventDefault()
        var password=$('.login-box [name=password]')
            .val()
        var username=$('.login-box [name=user]')
        .val()
        console.log(password,username);
        $.ajax({
            type:'post',
            url:'/api/login',
            data:{
                username,
                password
            },
            //快速获取表单数据
            // data:$(this).serialize(),
            success:res=>{
                console.log(res);
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('登录成功,欢迎！'+username);
                localStorage.setItem('Authorization',res.token)
                location.href='/index.html'

            }
        })
    })
})