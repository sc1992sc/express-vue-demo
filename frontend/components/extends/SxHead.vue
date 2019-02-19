<template>
    <div class="sx-head">
        <span class="icon-left" @click="onClick" v-if="hasback"></span>
        {{title}}
        <span class="icon-right">
            <slot name="right"></slot>
        </span>
    </div>
</template>

<script>
export default {
    name:'SxHead',
    props:['title','hasback'],
    props:{
        title:{
            type:String
        },
        hasback:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{

        }
    },
    methods:{
        onClick(){
            let arr=location.href.split('/');
            let bool=false;
            for(let i=0;i<arr.length;i++){
                if(arr[i]=='sign_in#!'){
                    bool=true;
                    break;
                }
            }
            // let bool=arr.find((item)=>item=='sign_in#!')
            if(bool && arr[arr.length-1]==''){

            }else{
                window.history.go(-1);
            }
        }
    }
}
</script>

<style scoped>
.sx-head{
    height:44px;
    background-color:#3C9EFA;
    color:#fff;
    text-align:center;
    position: relative;
    line-height:44px;
}
.icon-left{
    position: absolute;
    width:20px;
    height: 44px;
    top:0;
    left:15px;
}
.icon-right{
    position: absolute;
    width:20px;
    height: 44px;
    top:0;
    right:15px;
}
</style>


