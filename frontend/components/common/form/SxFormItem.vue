<template>
    <div class="sx-form-item">
        <div class="sx-form-item_content">
            <slot></slot>
        </div>
        <span class="sx-form-item_append">
            <slot name="append"></slot>
        </span>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String
        },
        titleWidth:{
            type:String,
            default:"80px"
        }
    },
    data(){
        return {
            
        }
    },
    computed:{
        titleStyle(){
            return {width:this.titleWidth}
        },
        contentStyle(){
            return {marginLeft:this.titleWidth}
        }
    }
}
</script>

<style scoped>
.sx-form-item{
    margin-bottom:22px;
}
.sx-form-item_title{
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
}
.sx-form-item_content{
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
</style>



