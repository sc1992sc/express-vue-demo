<template>
    <div class="search">
        <input 
        class="search-input"
        :style="inputFocus"
        type="text"
        placeholder="请输入关键字"
        @focus="onFocus"
        @blur="onBlur"
        @keyup.enter="onSearch"
        v-model="value">
        <span class="search-btn" @click="onCancle">{{cancelText}}</span>
    </div>
</template>

<script>
export default {
    name:'search',
    props:{
        search:{
            type:Function,
            required:true
        },
        cancelText:{
            type:String,
            default:'取消'
        }
    },
    data(){
        return {
            value:'',
            isFocus:false
        }
    },
    computed:{
        inputFocus(){
            return this.isFocus?{border:'1px solid #359CFD'}:{border:'1px solid #eee'}
        }
    },
    watch:{
        value(){
            setTimeout(this.onSearch,500)
        }
    },
    methods:{
       onSearch(){
           this.search(this.value);
       },
       onCancle(){
           this.value='';
       },
       onFocus(){
           this.isFocus=true;
       },
       onBlur(){
           this.isFocus=false;
       }
    },
    components:{
        
    }
}
</script>

<style scoped>
.search{
    width:100%;
    box-sizing:border-box;
    padding-right:60px;
    position: relative;
}
.search-input{
    width:100%;
    padding:3px 10px;
    outline:none;
    border:1px solid #eee;
    border-radius:5px;
}
.search-btn{
    position: absolute;
    width:60px;
    right:0;
    top:0;
    text-align:center;
    line-height:36px;
    color:#359CFD;
    font-size:15px;
}
</style>


