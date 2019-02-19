
function index(req,res){
    res.render('user.ejs');
}

function getUserInfo(req,res){
    G.logger.info('获取用户信息')

    res.json({
        code:0,
        data:{
            username:"admin"
        }
    })
}

module.exports={
    index:index,
    getUserInfo:getUserInfo
}