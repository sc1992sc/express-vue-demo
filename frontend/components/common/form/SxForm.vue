<template>
    <div class="sx-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        rules:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data(){
        return {

        }
    },
    methods:{
        valid(cb){
            let isValid=true;
            for(let i=0;i<this.$children.length;i++){
                let item=this.$children[i];
                if(item.$children[0] && item.$children[0].check && typeof item.$children[0].check=='function'){
                    let inputValid=item.$children[0].check(this.rules[item.$children[0].prop]);
                    if(!inputValid)
                        isValid=false;
                }
            }
            if(isValid)
                cb();
        }
    }
}
</script>

<style scoped>
.sx-form{
    max-width:320px;
    margin:0 auto
}
</style>


