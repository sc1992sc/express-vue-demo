<template>
    <div>
        <sx-head title="hello"></sx-head>
        <div class="wrap">
            <sx-form :rules='rules' ref='form'>
                <sx-form-item title="用户名">
                    <sx-input 
                    prop="userName"
                    placeholder="请输入用户名"
                    :value="userName"
                    @input="onInput"
                    >
                    </sx-input>
                </sx-form-item>
                <sx-form-item title="密码">
                    <sx-input 
                    prop="code"
                    placeholder="请输入密码"
                    type="password"
                    :solt="false"
                    :value="code"
                    @input="onInput"
                    >
                    </sx-input>
                </sx-form-item>
                <sx-button @on-click="onSubmit" class="submit">登录</sx-button>
            </sx-form>
        </div>
    </div>
</template>

<script>
import SxForm from 'components/common/form/SxForm'
import SxFormItem from 'components/common/form/SxFormItem'
import SxInput from 'components/common/form/SxInput'
import SxTip from 'components/common/form/SxTip'
import SxButton from 'components/common/btn/SxButton'
import SxHead from 'components/extends/SxHead'
const reg=/^1[34578]\d{9}$/;
export default {
    data(){
        return {
            userName:'admin',
            code:'123456',
            disabled:true,
            rules:{
                userName:[
                    {required:true,tip:'请输入用户名'}
                ],
                code:[
                    {required:true,tip:'请输入密码'}
                ]
            }
        }
    },
    methods:{
        onInput(field){
            this[field.name]=field.value;
        },
        onSubmit(){      
            this.$refs.form.valid(()=>{
                this.$api.sigin({
                    username:this.userName,
                    code:this.code
                }).then(res=>{
                    location.href='http://localhost:3000/users'
                },err=>{
                    
                })
            })
        }
    },
    components:{
        SxForm,SxFormItem,SxTip,SxInput,SxButton,SxHead
    }
}
</script>



