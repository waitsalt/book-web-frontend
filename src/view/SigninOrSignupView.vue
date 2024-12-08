<script lang="ts" setup>
import { postSignin } from '@/api/user/signin';
import { getCaptchaImage } from '@/api/util/captchaImage';
import { uuid } from '@/api/util/uuid';
import type { UserAuth, UserClaims, UserSigninPayload, UserSignupPayload } from '@/model/user';
import { useUserStore } from '@/store/user';
import router from '@/util/router';
import { jwtDecode } from 'jwt-decode';
import { onMounted, ref, watch } from 'vue';

const isSignin = ref(true);
const captchaImageData = ref('');
const btnText = ref('发送邮件');
const disableBtn = ref(false);


const userStore = useUserStore();

const captcha_image_key = uuid();

const userSigninPayload = ref<UserSigninPayload>({
    user_name: '',
    user_password: '',
    captcha_image_key: uuid(),
    captcha_image: ''
});

const userSignupPayload = ref<UserSignupPayload>({
    user_name: '',
    user_password: '',
    user_email: '',
    avatar_url: '',
    captcha_image_key: uuid(),
    captcha_image: '',
    captcha_email: ''
});

// 获取当前路径并检查是否为登录页
const localUrl = window.location.href;
const lastestUrlPart = localUrl.split('/').pop();
const checkIsSignin = () => {
    isSignin.value = lastestUrlPart === 'signin';
};

// 检查用户是否已登录
const checkUserIsHaveSignin = () => {
    if (userStore.userPublic.user_id != 0) {
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
    captchaImageData.value = await getCaptchaImage(userSigninPayload.value.captcha_image_key) as string;
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

// 登陆事件
const signinEvent = async () => {
    let userAuth: UserAuth = await postSignin(userSigninPayload.value);
    isSignin.value = true;
}

onMounted(async () => {
    checkUserIsHaveSignin();
    checkIsSignin();
    await refreshCaptchaImage();
});

// 监听用户状态的变化
watch(() => userStore.userPublic.user_id, checkUserIsHaveSignin);
</script>

<template>
    <div class="SigninOrSignupContainer">
        <div v-if="isSignin" class="formContainer">
            <h2>登录</h2>
            <div class="form-content">
                <div class="input-group">
                    <label for="username">用户名:</label>
                    <input v-model="userSigninPayload.user_name" id="username" type="text" placeholder="请输入用户名" />
                </div>
                <div class="input-group">
                    <label for="password">密码:</label>
                    <input v-model="userSigninPayload.user_password" id="password" type="password"
                        placeholder="请输入密码" />
                </div>
                <div class="input-group">
                    <label for="captchaImage">图形验证码:</label>
                    <div class="captchaContainer">
                        <input v-model="userSigninPayload.captcha_image" id="captchaImage" type="text"
                            placeholder="请输入验证码" />
                        <img :src="captchaImageData" alt="验证码" class="captcha-image" @click="refreshCaptchaImage" />
                    </div>
                </div>
                <div class="links">
                    <span class="link" @click="goToSignup">没有账号？</span>
                    <span class="link">忘记密码</span>
                </div>
                <button class="submitBtn" @click="signinEvent">登录</button>
            </div>
        </div>

        <div v-else class="formContainer">
            <h2>注册</h2>
            <div class="form-content">
                <div class="input-group">
                    <label for="username">用户名:</label>
                    <input v-model="userSignupPayload.user_name" id="username" type="text" placeholder="请输入用户名" />
                </div>
                <div class="input-group">
                    <label for="password">密码:</label>
                    <input v-model="userSignupPayload.user_password" id="password" type="password"
                        placeholder="请输入密码" />
                </div>
                <div class="input-group">
                    <label for="email">邮箱:</label>
                    <input v-model="userSignupPayload.user_email" id="email" type="email" placeholder="请输入邮箱" />
                </div>
                <div class="input-group">
                    <label for="captchaImage">图形验证码:</label>
                    <div class="captchaContainer">
                        <input v-model="userSignupPayload.captcha_image" id="captchaImage" type="text"
                            placeholder="请输入验证码" />
                        <img :src="captchaImageData" alt="验证码" class="captcha-image" @click="refreshCaptchaImage" />
                    </div>
                </div>
                <div class="input-group">
                    <label for="captchaEmail">邮箱验证码:</label>
                    <div class="captchaContainer">
                        <input v-model="userSignupPayload.captcha_email" id="captchaEmail" type="text"
                            placeholder="请输入邮箱验证码" />
                        <button class="verifyBtn" :disabled="disableBtn" @click="sendEmailEvent">{{ btnText }}</button>
                    </div>
                </div>
                <div class="links">
                    <span class="link" @click="goToSignin">已有账号？</span>
                </div>
                <button class="submitBtn">注册</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 全局样式 */
.SigninOrSignupContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
    font-family: 'Arial', sans-serif;
}

/* 表单容器样式 */
.formContainer {
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
.captchaContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.captcha-image,
.verifyBtn {
    width: 100px;
    height: 40px;
    object-fit: cover;
    border-radius: 5px;
    margin-left: 10px;
    border: 1px solid #ccc;
    padding: 2px;
}

/* 验证按钮 */
.verifyBtn {
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

.verifyBtn:hover {
    background-color: #6dd5fa;
}

.verifyBtn:active {
    background-color: #1d7b99;
}

/* 禁用状态的按钮样式 */
.verifyBtn:disabled {
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
.submitBtn {
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

.submitBtn:hover {
    background-color: #6dd5fa;
}

.submitBtn:active {
    background-color: #1d7b99;
}
</style>
