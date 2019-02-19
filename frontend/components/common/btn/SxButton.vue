<template>
    <div class="sx-component-button" 
    :style="style"
    :class="{'disabled':disabled,'border-disabled':disabled}"
    @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'SxButton',
    props:{
        type:{
            type:String,
            default:'primary'
        },
        size:{
            type:String,
            default:'normal'
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {

        }
    },
    computed:{
        style(){
            let bg,display;
            switch(this.type){
                case 'primary':
                    bg='#409EFF';
                    break;
                
            }
            switch(this.size){
                case 'small':
                    display={display:'inline-block',lineHeight:'1em',padding:'5px'}
                    break;
                case 'normal':
                    display={width:'100%',lineHeight:'1.8em',padding:'8px'}
                    break;
            }
            display.background=bg;
            return display;
        }
    },
    methods:{
        onClick(){
            if(!this.disabled)
                this.$emit('on-click');
        }
    }
}
</script>

<style scoped>
.sx-component-button{
    border-radius:23px;
    text-align:center;
    color:#fff;
    box-sizing:border-box;
    font-size:1em
}
.disabled{
    background: #ffc6d1 !important;
    cursor: not-allowed;
}
.border-disabled {
    border-color: #ffc6d1 !important;
    cursor: not-allowed;
}
</style>

