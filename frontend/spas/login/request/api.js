import requestMethod from './index'
var dohttp=requestMethod.requestMethod

export default {
    sigin:(data)=>{
        return dohttp('/sigin',{},data,'post')
    }
}