import axios from 'axios'

function requestMethod(url,params,data,method,timeout=1000){
    return axios({
        url:url,
        params:params,
        data:data,
        method:method,
        timeout:timeout
    }).then((response)=>{
        return response.data;
    }).catch((error)=>{

    })
}

export default {
    requestMethod:requestMethod
}