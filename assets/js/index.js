$(()=>{
    var layer=layui.layer

    //退出功能

    $('#btnLogout').on('click',()=>{
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, 
        function(index){
            //do something
            localStorage.removeItem('Authorization')
            location.href='/login.html'
            layer.close(index);
          });
    })

    const getUser=()=>{
        $.ajax({
            url:'/my/userinfo',
            type:'get',
            success:res=>{
                console.log(res);
                if(res.status!==0){
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data)
            }
        })
    }
    getUser()
    
    //渲染用户头像

    const renderAvatar=(user)=>{
        var name=user.nickname||user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;'+name) 
        if(user.user_pic){
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        }else{
            $('.layui-nav-img').hide()
            var frist=name.substr(0,1).toUpperCase()
            $('.text-avatar').html(frist).show()
        }
    }
})