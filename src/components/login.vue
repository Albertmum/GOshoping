<template>
<div>
    <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
    </div>
    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <div class="nav-tit">
                    <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                    <a href="/register.html">免费注册</a>
                 </div>

                <div id="loginform" name="loginform" class="login-box">
                    <div class="input-box">
                        <input v-model="inputusername" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                    </div>
                    <div class="input-box">
                        <input v-model="inputpassword" id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                    </div>
                    <div class="btn-box">
                            <input @keyup.enter="signIn" @click="signIn" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                            <!-- <el-button :plain="true" @keyup.enter="signIn" @click="signIn" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">立即登录</el-button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name:"login",
    data:function(){
        return{
            inputusername:'',
            inputpassword:''
        }
    },
    methods:{
        signIn(){
            this.$axios.post("site/account/login",{user_name:this.inputusername,password:this.inputpassword}).then(res=>{
                console.log(res);
                
                if(res.data.message=='登录成功'){
                    this.$message({
                    message:res.data.message,
                    type:'success'
                });
                    this.$router.push('/payOrder')
                }else{
                    this.$message({
                    message:res.data.message,
                    type:'warning'
                });
                }
            })
        }
   
    }
     
};
</script>

<style>
#loginform input{
    width: 100%;
    height: 100%;
    outline: 0 none;
}
</style>
