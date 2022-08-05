$.ajaxPrefilter(options=>{
    const bast='http://www.liulongbin.top:3007'
    options.url=bast+options.url
    if(options.url.indexOf('/my')!==-1){
        options.headers={
        Authorization:localStorage.getItem('Authorization')
            
    }
    }
    options.complete=res=>{
        if(res.responseJSON.status===1){
            localStorage.removeItem('Authorization')
            location.href='login.html'
        }
    }
})