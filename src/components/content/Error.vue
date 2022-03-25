<template>
    <div class="error-main">
        <div class="four-O-four">404</div>
        <div class="msg">您访问的页面走丢了！</div>
        <div class="rtn"><el-button @click="toHome">返回首页</el-button></div>
    </div>
</template>

<script>
    export default {
        name: "Error",
        methods: {
            toHome() {
                this.$router.push('/');
            }
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'background-color:rgb(140, 197, 255)')
        },

        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        }
    }
</script>

<style scoped>
    .four-O-four {
        margin-top: 100px;
        text-align: center;
        font-size: 120px;
        color: #fff;
    }
    .msg {
        margin-top: 100px;
        text-align: center;
        font-size: 20px;
        color: #fff;
    }
    .rtn {
        margin-top: 20px;
        text-align: center;
    }
</style>