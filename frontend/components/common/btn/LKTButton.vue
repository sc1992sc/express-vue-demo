<template>
    <span class="lkt-btn" :class="classObject" @click="click($event)">
        <span v-show="!loading">{{text}}</span>
        <span v-show="loading" class="loadingtext"><i class="iconfont icon-loading"></i><span>{{loadingtext}}</span></span>
        <div v-show="effect" class='click-effect' :class="{'showEffect': animation}" :style="styles"></div>
    </span>
</template>
<script>
    "use strict";
    import utilsMixin from "../../../utils/utils";
    /**
     * 按钮类型:
     * 1. 蓝色背景大按钮(width: 300px)
     * 2. 白色背景蓝色边框按钮(width: 80px, height: 30px) class: lkt-btn-s border-btn
     * 3. 绿色背景按钮(width: 80px, height: 30px) class: lkt-btn-s lkt-btn-green
     *
     * lkt-btn-s: 将按钮大小设置为80px
     *
     * 指令:
     * v-on:effect="function" 当点击按钮时, 将调用父组件的function方法
     * :disabled.sync="property" 父组件中对应按钮禁用的属性。用来控制按钮是否可以点击
     * :loading.sync="property" 父组件中对应按钮loading状态。loading状态按钮不可以点击
     * loadingtext: 用来显示锁定按钮时的按钮文本
     * href: 是否打开一个链接
     *
     * 例子:
     * <lkt-btn text="提交" v-on:effect="click1" :disabled.sync="btn1" loadingtext="提交中"></lkt-btn>
     * <lkt-btn class="lkt-btn-s border-btn" text="提交" v-on:effect="click2" :disabled.sync="btn2" loadingtext="提交中"></lkt-btn>
     * <lkt-btn class="lkt-btn-s lkt-btn-green" text="提交" v-on:effect="click3" :disabled="btn3" loadingtext="提交中"></lkt-btn>
     **/
    export default {
        mixins:[utilsMixin],
        props: {
            text: {
                type: String
            },
            href: {
                type: String
            },
            loadingtext: {
                type: String
            },
            disabled: {
                type: Boolean
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        compiled: function() {
            if(!this.button_type){
                this._setButtonType(this);
            }
        },
        data: function() {
            return  {
                //按钮开始执行动画
                effect: false,
                //按钮正在执行动画
                animation: false,
                //动画的样式
                styles: {},
                //按钮类型
                button_type: null,
            }
        },
        watch: {
            "loading": function(newValue) {
                this.$nextTick(()=>{
                    if(newValue) {
                        this.$el.classList.add(this.button_type + "-loading");
                    } else {
                        this.$el.classList.remove(this.button_type + "-loading");
                    }
                })
            }
        },
        computed:{
            /**
             * 设置禁用样式
             **/
            classObject:function(){
                let disabled = this.disabled;
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
            /**
             * 点击按钮
             **/
            click: function(e) {
                if (this.disabled ||
                    this.loading ||
                    this.effect) {
                    return true;
                }

                var offsetX, offsetY;

                if(e && (e.target.classList.contains("lkt-btn") || this.isWebkit())) {
                    offsetX = e.offsetX - this.$el.clientLeft;
                    offsetY = e.offsetY - this.$el.clientTop;
                } else if(e && !this.isWebkit()) {
                    offsetX = e.layerX + e.target.offsetLeft - this.$el.clientLeft;
                    offsetY = e.layerY + e.target.offsetTop - this.$el.clientTop;
                }

                offsetX = offsetX ? offsetX: this.$el.offsetWidth / 2;
                offsetY = offsetY ? offsetY: this.$el.offsetHeight / 2;

                if (offsetX != 25) {
                    var opacity = 1.0;

                    this.effect = true;

                    var left = offsetX - this.$el.offsetHeight / 4;
                    var top  = offsetY - this.$el.offsetHeight / 4;
                    this.styles = {
                        width: this.$el.offsetHeight / 2 + "px",
                        height: this.$el.offsetHeight / 2 + "px",
                        opacity: opacity,
                        left: left + "px",
                        top: top + "px",
                        background: this._getBackgroundWithClassName(this.$el)
                    }

                    setTimeout(() => {
                        this.animation = true;
                    }, 20);

                    setTimeout(() => {
                        if(this.loadingtext) {
                            this.loading = true;
                        }

                        //发送通知给父组件
                        this.$dispatch("effect");

                        this.effect    = false;
                        this.animation = false;

                        if (this.href) {
                            window.open(this.href);
                        }
                    }, 450);
                }
            },
             /**
              * 根据样式名称获取背景色
              * @private
              */
             _getBackgroundWithClassName: ($el) => {
                var backgrounds = {
                    "lkt-btn": "#5896CC",
                    "border-btn": "#E0E0E0",
                    "lkt-btn-green": "#2AA395"
                }

                if($el.className.indexOf("border-btn") != -1) {
                    return backgrounds["border-btn"];
                } else if($el.className.indexOf("lkt-btn-green") != -1) {
                    return backgrounds["lkt-btn-green"];
                }

                return backgrounds["lkt-btn"];
            },
            /**
             * 设置按钮类型
             */
            _setButtonType: (_this)=> {
                if(_this.$el.className.indexOf("border-btn") != -1) {
                    _this.button_type = "border";
                } else if(_this.$el.className.indexOf("lkt-btn-green") != -1) {
                    _this.button_type = "green";
                } else {
                    _this.button_type = "default";
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/sass/variables";

    .lkt-btn, .border-btn, .lkt-btn-s {
        /* Rectangle 27 Copy: */
        background: $btn_default;
        border-radius: 100px;
        width: 300px;
        height:40px;
        line-height: 40px;
        display: block;
        color: #ffffff;
        text-align: center;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        backface-visibility:hidden;
        transform: rotate(0deg);
        font-size: 18px;
        vertical-align: middle;
        transition:
                background 0.3s ease-in-out,
                color 0.3s ease-in-out,
                border-color 0.3s ease-in-out;

        span {
            z-index: 2;
            position: relative;
        }

        &:hover {
            background: $btn_hover;
        }
    }

    .lkt-btn-s {
        font-size: 14px;
        width: 82px;
        border-radius: 2px;
        height: 30px;
        line-height: 30px;
    }

    .border-btn {
        border: 1px solid transparent;
        background:transparent!important;
        color: $btn_default;
        line-height: 28px;
        &:hover {
            border: 1px solid transparent;
            color: $btn_hover;
        }
    }

    .lkt-btn-green {
        background: $green_btn_default;

        // &:hover {
        //     background: $green_btn_hover;
        // }
    }

    .click-effect {
        position: absolute;
        border-radius: 100%;
        z-index: 1;
        top:0px;
        left: 0px;

        width: 1px;
        height: 1px;
        color: #ffffff !important;

        transform: scale(1.0);
        transition: transform 0.4s ease-in-out;
    }

    .showEffect {
        transform: scale(20.0);
    }

    /*各种按钮的disabled效果*/
    .btn-disabled {
        cursor: not-allowed;
    }

    .border-disabled {
        color: $btn_disable !important;
        border-color:transparent;
        cursor: not-allowed;

        &:hover {
            color: $btn_disable !important;
        }
    }

    /*各种按钮的loading效果*/
    .border-loading, .green-loading, .default-loading {
        cursor: not-allowed;
    }

    .border-loading {
        &:hover {
            border-color: transparent;
            color: $btn_default;
        }
    }

    .green-loading {
        &:hover {
            background: $green_btn_default;
        }
    }

    .default-loading {
        // &:hover {
        //     background: $btn_default;
        // }
    }

    .loadingtext {
        z-index: 2;
        width: 100%;
        height: 100%;
        display: block;

        i {
            width: 16px;
            height: 16px;
            line-height: 16px;
        }

        span, i {
            display: inline-block;
        }
    }
</style>
