<template>
    <div class="dialog" v-show="visible" transition="fadeIn">
        <div class="dialog-mask"></div>
        <div class="dialog-content">
            <div class="dialog_hd">
                <strong class="dialog_title">{{title}}</strong>
            </div>
            <div class="dialog_bd">{{message}}</div>
            <div class="dialog_ft">
                <a href="javascript:void(0)" @click="onClose">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            visible:false,
            title:'提示',
            message:''
        }
    },
    methods:{
        onClose(){
            this.visible=false;
        }
    }
}
</script>

<style scoped>
.dialog{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
}
.dialog-content{
    position: absolute;
    display: table;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
}
.dialog_hd{
    padding: 1.3em 1.6em .5em;
}
.dialog_title{
    font-weight: 400;
    font-size: 18px;
}
.dialog_bd{
    padding: 0 1.6em .8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #999;
}
.dialog_ft{
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.dialog_ft a{
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #3cc51f;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;
}
/* .fadeIn-transition {
  transition: all .3s ease;
  overflow: hidden;
} */
/* .fadeIn-enter, .fadeIn-leave {
  opacity: 0;
} */
</style>


