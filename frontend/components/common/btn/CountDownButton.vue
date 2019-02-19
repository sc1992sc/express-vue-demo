<template>
    <span class="lkt-btn" :class="classObject" @click.capture="began">
        <span v-if="!counting" v-show="!loading">{{text}}</span>
        <span v-if="!counting" v-show="loading">
            <!-- <i class="iconfont icon-loading"></i> -->
            <span>{{loadingtext}}</span>
        </span>
        <span v-if="counting">剩余{{counting_text}}秒</span>
        <!-- <div v-show="effect" class='click-effect' :class="{'showEffect': animation}" :style="styles"></div> -->
    </span>
</template>
<script>
    import LKTButton from './LKTButton.vue';
    const MAX_TIME = 60;

    /**
     * 倒计时按钮
     *
     * 所有指令同LKTButton
     *
     * 当倒计时结束时, 会发送通知 『countdown』 给父组件
     *
     * 例子:
     *
     * <cd-btn class="lkt-btn-s border-btn"
     *         text="获取验证码"
     *         v-on:countdown="countdown"
     *         v-on:effect="click4"
     *         :disabled.sync="btn4"
     *         loadingtext="正在获取">
     * </cd-btn>
     */
    export default{
        extends: LKTButton,
        data: function() {
            return {
                counting: false,
                max_time: MAX_TIME,
                index: 0,
                counting_text: MAX_TIME
            }
        },
        computed:{
            /**
             * 设置禁用样式
             **/
            classObject:function(){
                let disabled = this.disabled||this.counting;
                if( disabled && this.button_type == "border") {
                    return {
                        "border-disabled":true,
                        "btn-disabled":false,
                    }
                } else if(!disabled && this.button_type == "border") {
                    return {
                        "border-disabled":false,
                        "btn-disabled":false,
                    }
                }
                if(disabled && this.button_type != "border") {
                    return {
                        "btn-disabled":true,
                        "border-disabled":false,
                    }
                } else if(!disabled && this.button_type != "border") {
                    return {
                        "border-disabled":false,
                        "btn-disabled":false,
                    }
                }
            }
        },
        methods: {
            began: function() {
                if (this.disabled) {
                    return false;
                }
                if(this.counting) {
                    return false;
                }
                this.countdown();
                this.click();
            },
            countdown: function() {
                if(this.counting) {
                    return false;
                }
                this.counting = true;
                var interval = setInterval(() => {
                        //console.log(this.index);
                        this.index ++;
                if(this.index < this.max_time) {
                    this.counting_text = this.max_time - this.index;
                } else {
                    this.counting_text = MAX_TIME;
                    this.counting      = false;
                    this.max_time      = MAX_TIME;
                    this.index         = 0;
                    clearInterval(interval);
                    this.$dispatch("countdown");
                }
            }, 1000);
            }
        },
        watch: {
            "loading": function(newValue, oldValue) {
                if(!newValue&&!this.disabled) {
                    this.countdown();
                }
            },
            "counting": function(newValue, oldValue) {
                if(newValue && this.button_type == "border") {
                    this.classObject["border-disabled"] = true;
                    this.classObject["btn-disabled"]        = false;
                } else if(!newValue && this.button_type == "border") {
                    this.classObject["border-disabled"] = false;
                }
                if(newValue && this.button_type != "border") {
                    this.classObject["btn-disabled"]        = true;
                    this.classObject["border-disabled"] = false;
                } else if(!newValue && this.button_type != "border") {
                    this.classObject["btn-disabled"] = false;
                }
            }
        }
    }
</script>