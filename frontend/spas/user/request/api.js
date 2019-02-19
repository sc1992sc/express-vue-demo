import requestMethod from './index'
var dohttp=requestMethod.requestMethod

export default {
    logout:(data)=>{
        return dohttp('/logout',{},data,'post')
    },
    getUserInfo:()=>{
        return dohttp('/users/user_info_get',{},{},'get')
    }
}