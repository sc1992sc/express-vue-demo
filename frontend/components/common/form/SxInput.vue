<template>
    <div class="sx-input">
        <span  class="sx-input_append">
            <slot></slot>
        </span>
        <input autocomplete="off"
            :type="type"
            :placeholder="placeholder"
            class="normal_input"
            :style="inputStyle"
            v-model="field" 
            @mouseenter="enterInput"
            @mouseleave="leaveInput"
            @focus="onFocus"
            @blur="onBlur">
        <img :src="delIcon" alt="" 
        class="input-cancel" 
        :style="iconStyle" 
        v-show="showCancle"
        @click="onCancle">
        <div class="error" v-show="status==2">{{errorText}}</div>
    </div>
</template>

<script>
import delIcon from 'assets/del.png'
export default {
    props:{
        prop:{
            type:String
        },
        placeholder:{
            type:String
        },
        solt:{
            type:Boolean,
            default:false
        },
        type:{
            type:String,
            default:'text'
        },
        value:{

        }
    },
    watch:{
        value(){
            this.field=this.value;
        },
        field(){
            this.$emit('input',{name:this.prop,value:this.field});
            if(this.errorLocked){
                this.check(this.inputRule,true);
            }
        }
    },
    data(){
        return {
            field:this.value,
            status:0,
            locked:false,
            errorLocked:false,
            errorText:'',
            inputRule:null,
            delIcon:delIcon
        }
    },
    computed:{
        inputStyle(){
            let style={borderBottom:this.statusMap(this.status)}
            if(this.solt)
                style['paddingRight']='126px';
            return style;
        },
        iconStyle(){
            let style={}
            if(this.solt)
                style['right']='110px';
            return style;
        },
        showCancle(){
            return this.field!='';
        }
    },
    methods:{
        onCancle(){
            this.field='';
        },
        enterInput(){
            if(!this.locked&&!this.errorLocked)
                this.status=1;
        },
        leaveInput(){
            if(!this.locked&&!this.errorLocked)
                this.status=0;
        },
        onFocus(){
            if(!this.errorLocked){
                this.status=1;
                this.locked=true;
            }  
        },
        onBlur(){
            if(!this.errorLocked){
                this.status=0;
                this.locked=false;
            }
        },
        statusMap(status){
            switch(status){
                case 0:
                    return 'solid 1px #ccc';
                case 1:
                    return 'solid 1px #3C9EFA';
                case 2:
                    return 'solid 1px #d0011b';
                default:
                    return 'solid 1px #ccc';
            }
        },
        check(rule,recheck=true){
            if(!this.inputRule)
                this.inputRule=rule;
            if(recheck)
                this.reset();
            if(this.inputRule && this.inputRule.length){
                let items=this.inputRule.map((item,index)=>{
                    let reduce={};
                    for(let i in item){
                        if(i!='tip'){
                            reduce.name=i;
                            reduce.index=index;
                        }
                    }
                    return reduce
                });

                let isRquired=false;

                for(let j=0;j<items.length;j++){
                    if(items[j].name=='required'){
                        isRquired=items[j];
                        break;
                    }
                }

                // let isRquired=items.find((child)=>{
                //     return child.name=='required';
                // })
                if(isRquired){
                    let target;
                    if(this.field==''){
                        target=this.inputRule[isRquired.index];
                        this.showError(target.tip);
                        return false;
                    }else{
                        items=items.filter((child)=>{
                            return child.name!='required';
                        })

                        return this.checkOneByOne(items);
                    }
                }else if(this.field!=''){
                    return this.checkOneByOne(items);
                }
            }
            return true;
        },
        checkOneByOne(items){
            let status;
            for(let i=0;i<items.length;i++){
                let item=items[i];
                let target=this.inputRule[item.index];
                for(let i in target){
                    let res=true;
                    if(i=='reg'){
                        res=target[i].test(this.field);
                    }
                    if(!res){
                        this.showError(target.tip);
                        status=false;
                        break;
                    }else{
                        status=true;
                        this.reset();
                        break;
                    }
                }
                if(!status){
                    return false;
                }
            }
            return true
        },
        showError(text){
            this.status=2;
            this.errorLocked=true;
            this.errorText=text;
        },
        reset(){
            this.status=0;
            this.errorLocked=false;
            this.errorText='';
        }
    }
}
</script>

<style scoped>
.sx-input{position:relative}
.sx-input .normal_input {
    height: 34px;
    width:100%;
    background-color:transparent;
    /* padding: 7px 36.8px 8px 20px; */
    padding-right:16px;
    margin-top: 0px;
    outline: none;
    color: #000;
    -webkit-appearance: none;
    border:1px solid transparent;
    box-sizing:border-box
}
.sx-input_append{
    width:100px;
    position: absolute;
    top:3px;
    right:0;
    top:0
}
.input-cancel{
    position: absolute;
    top:12px;
    right:0;
}
.error{
    position: absolute;
    bottom:-18px;
    left:0;
    color:#d0011b;
    line-height:1.1em
}
</style>


