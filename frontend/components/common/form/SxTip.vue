<template>
    <div class="tip" v-show="visible">
        {{text}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            visible:false,
            text:''
        }
    },
    methods:{
        show(text){
            this.text=text;
            this.visible=true;
            setTimeout(this.close,3000)
        },
        close(){
            this.visible=false;
        }
    }
}
</script>

<style scoped>
    .tip{
        text-align:center;
        background: #ddd;
        font-size:14px;
        width:100%;
        padding:5px;
        box-sizing:border-box;
        color:#d0011b
    }
</style>

