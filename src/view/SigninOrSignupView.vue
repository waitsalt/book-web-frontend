<script lang="ts" setup>
import { getCaptchaImage } from '@/api/util/captchaImage';
import { uuid } from '@/api/util/uuid';
import { useUserInfoStore } from '@/store/userInfo';
import router from '@/util/router';
import { onMounted, ref, watch } from 'vue';

const isSignin = ref(true);
const captchaImageKey = ref(uuid());
const captchaImageData = ref('');
const btnText = ref('发送邮件');
const disableBtn = ref(false);

// 获取当前路径并检查是否为登录页
const localUrl = window.location.href;
const lastestUrlPart = localUrl.split('/').pop();
const checkIsSignin = () => {
    isSignin.value = lastestUrlPart === 'signin';
};

// 检查用户是否已登录
const userInfoStore = useUserInfoStore();
const checkUserIsHaveSignin = () => {
    if (userInfoStore.userInfo.user_id !== 0) {
        router.push('/user');
    }
};

// 路径跳转
const goToSignup = () => {
    router.push('/signup');
    isSignin.value = false;
};
const goToSignin = () => {
    router.push('/signin');
    isSignin.value = true;
};

// 刷新验证码
const refreshCaptchaImage = async () => {
    captchaImageData.value = await getCaptchaImage(captchaImageKey.value) as string;
};

// 邮件发送按钮
const sendEmailEvent = () => {
    disableBtn.value = true;
    let count = 60;
    const interval = setInterval(() => {
        btnText.value = `${count--}秒`;
        if (count < 0) {
            clearInterval(interval);
            disableBtn.value = false;
            btnText.value = '发送邮件';
        };
    }, 1000);
};

onMounted(() => {
    checkUserIsHaveSignin();
    checkIsSignin();
    refreshCaptchaImage();
});

// 监听用户状态的变化
watch(() => userInfoStore.userInfo.user_id, checkUserIsHaveSignin);
</script>

<template>
    <div class="container">
        <div v-if="isSignin" class="form-container">
            <h2>登录</h2>
            <form class="form-content">
                <div class="input-group">
                    <label for="username">用户名:</label>
                    <input id="username" type="text" placeholder="请输入用户名" />
                </div>
                <div class="input-group">
                    <label for="password">密码:</label>
                    <input id="password" type="password" placeholder="请输入密码" />
                </div>
                <div class="input-group">
                    <label for="captchaImage">图形验证码:</label>
                    <div class="captcha-container">
                        <input id="captchaImage" type="text" placeholder="请输入验证码" />
                        <img :src="captchaImageData" alt="验证码" class="captcha-image" @click="refreshCaptchaImage" />
                    </div>
                </div>
                <div class="links">
                    <span class="link" @click="goToSignup">没有账号？</span>
                    <span class="link">忘记密码</span>
                </div>
                <button class="submit-btn">登录</button>
            </form>
        </div>

        <div v-else class="form-container">
            <h2>注册</h2>
            <form class="form-content">
                <div class="input-group">
                    <label for="username">用户名:</label>
                    <input id="username" type="text" placeholder="请输入用户名" />
                </div>
                <div class="input-group">
                    <label for="password">密码:</label>
                    <input id="password" type="password" placeholder="请输入密码" />
                </div>
                <div class="input-group">
                    <label for="email">邮箱:</label>
                    <input id="email" type="email" placeholder="请输入邮箱" />
                </div>
                <div class="input-group">
                    <label for="captchaImage">图形验证码:</label>
                    <div class="captcha-container">
                        <input id="captchaImage" type="text" placeholder="请输入验证码" />
                        <img :src="captchaImageData" alt="验证码" class="captcha-image" @click="refreshCaptchaImage" />
                    </div>
                </div>
                <div class="input-group">
                    <label for="captchaEmail">邮箱验证码:</label>
                    <div class="captcha-container">
                        <input id="captchaEmail" type="text" placeholder="请输入邮箱验证码" />
                        <button class="verify-btn" :disabled="disableBtn" @click="sendEmailEvent">{{ btnText }}</button>
                    </div>
                </div>
                <div class="links">
                    <span class="link" @click="goToSignin">已有账号？</span>
                </div>
                <button class="submit-btn">注册</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* 全局样式 */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #b4b8ab;
    font-family: 'Arial', sans-serif;
}

/* 表单容器样式 */
.form-container {
    width: 100%;
    max-width: 500px;
    padding: 30px;
    background-color: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    text-align: center;
    box-sizing: border-box;
}

h2 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
    font-weight: 600;
}

/* 输入框样式 */
.input-group {
    margin-bottom: 20px;
    text-align: left;
}

.input-group label {
    font-size: 1rem;
    color: #555;
    display: block;
    margin-bottom: 5px;
}

.input-group input {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    outline: none;
    background-color: #f9f9f9;
}

.input-group input:focus {
    border-color: #2193b0;
    box-shadow: 0 0 5px rgba(33, 147, 176, 0.5);
}

/* 验证码容器 */
.captcha-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.captcha-image,
.verify-btn {
    width: 100px;
    height: 40px;
    object-fit: cover;
    border-radius: 5px;
    margin-left: 10px;
    border: 1px solid #ccc;
    padding: 2px;
}

/* 验证按钮 */
.verify-btn {
    height: 45px;
    width: 140px;
    font-size: 1rem;
    color: white;
    background-color: #2193b0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.verify-btn:hover {
    background-color: #6dd5fa;
}

.verify-btn:active {
    background-color: #1d7b99;
}

/* 禁用状态的按钮样式 */
.verify-btn:disabled {
    background-color: #d1d1d1;
    /* 灰色背景 */
    color: #a1a1a1;
    /* 灰色文字 */
    cursor: not-allowed;
    /* 禁用状态的鼠标样式 */
    pointer-events: none;
    /* 禁止点击事件 */
}


/* 链接文字 */
.links {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.links .link {
    font-size: 0.9rem;
    color: #2193b0;
    cursor: pointer;
    transition: color 0.3s ease;
}

.links .link:hover {
    color: #6dd5fa;
}

/* 提交按钮 */
.submit-btn {
    width: 100%;
    padding: 14px;
    font-size: 1.2rem;
    color: white;
    background-color: #2193b0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #6dd5fa;
}

.submit-btn:active {
    background-color: #1d7b99;
}
</style>
