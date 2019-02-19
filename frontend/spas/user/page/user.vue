<template>
    <div>
        <div> hello {{username}}</div>
        <button @click="onExit">退出登录</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:''
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            this.$api.getUserInfo().then((res)=>{
                if(res.code==0){
                    this.username=res.data.username;
                }
            })
        },
        onExit(){
            this.$api.logout().then((res)=>{
                if(res.code=='000000'){
                    location.href='http://localhost:3000';
                }
            })
        }
    }
}
</script>

