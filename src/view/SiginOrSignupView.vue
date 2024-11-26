<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { signin } from '@/api/user/signin';
import { captcha_image as get_c_image } from '@/api/util/get_captcha_image';
import { generateUUID } from '@/api/util/uuid';
import router from '@/util/router';
import request from '@/util/request';
import { get_user_info } from '@/api/user/user_info';

// 更改视图
const switch_login = ref(false);
const switch_login_event = () => {
    switch_login.value = !switch_login.value;
}

// 登陆
const user_name = ref('');
const user_eamil = ref('')
const user_password = ref('');
const captcha_email = ref('');
const captcha_image_key = ref(generateUUID());
const captcha_image = ref('');
const captcha_image_data = ref('');
async function user_signin() {
    try {
        let data = await signin(user_name.value, user_password.value, captcha_image.value, captcha_image_key.value);
    }
    catch {
        router.push("/user")
    }
}

// 注册
const email_error = ref('');
function validateEmail() {
    const email = user_eamil.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
        email_error.value = '邮箱格式不合法';
    } else {
        email_error.value = '';
    }
}

let can_send_email = ref(true)
const button_text = ref('发送')
function check_email() {
    if (user_eamil.value === '') {
        alert("用户邮件未填写")
        return false;
    }
    return true;
}
function send_email() {
    if (!check_email()) return;

    // 发送邮件验证码的逻辑
    console.log("发送邮件验证码");

    // 禁用按钮
    can_send_email.value = false;
    button_text.value = "60秒";
    let countdown = 60;

    const timer = setInterval(() => {
        countdown -= 1;
        button_text.value = `${countdown}秒`;

        if (countdown <= 0) {
            clearInterval(timer);
            can_send_email.value = true;
            button_text.value = "发送";
        }
    }, 1000);
}
async function get_captcha_image() {
    let data = await get_c_image(captcha_image_key.value);
    captcha_image_data.value = data.data;
}
// 检查用户登录状态
const checkUserLogin = async () => {
    const token = localStorage.getItem('book-web-auth-token');
    if (!token) {
        return;
    }
    request.defaults.headers.common['Authorization'] = token;
    try {
        const res = await get_user_info();
        router.push("/user")
    }
    catch {
    }
};

onMounted(async () => {
    await checkUserLogin();
});

// 自动运行
onMounted(() => {
    get_captcha_image()
})
</script>

<template>
    <div class="temp">
        <div class="container">
            <div class="signup" :class="{ hidden: switch_login }"
                :style="switch_login ? { transform: 'translateX(100%)' } : {}">
                <h2>登陆</h2>
                <label>用户名</label>
                <input v-model="user_name" type="text">
                <label>密码</label>
                <input v-model="user_password" type="password">
                <label>验证码:</label>
                <div class="input-group">
                    <input v-model="captcha_image" type="text">
                    <img :src="captcha_image_data" alt="验证码" @click="get_captcha_image" class="captcha-img">
                </div>
                <a href="#" @click="switch_login_event">没有账号</a>
                <div>
                    <button class="btn-signin" @click="user_signin">登陆</button>
                </div>
            </div>
            <div class="signup" :class="{ hidden: !switch_login }"
                :style="!switch_login ? { transform: 'translateX(-100%)' } : {}">
                <h2>注册</h2>
                <label>用户名</label>
                <input v-model="user_name" type="text">
                <label>邮箱</label><label v-if="email_error != ''" class="error-message">{{ email_error }}</label>
                <input v-model="user_eamil" type="text">
                <label>密码:</label>
                <input v-model="user_password" type="password">
                <label>验证码:</label>
                <div class="input-group">
                    <input v-model="captcha_image" type="text">
                    <img :src="captcha_image_data" alt="验证码" @click="get_captcha_image" class="captcha-img">
                </div>
                <label>邮箱验证码:</label>
                <div class="input-group">
                    <input v-model="captcha_email" type="text">
                    <button class="btn-send" @click="send_email" :disabled="!can_send_email">{{ button_text }}</button>
                </div>
                <a href="#" @click="switch_login_event">已有账号</a>
                <div>
                    <button class="btn-signin">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.temp {
    background: linear-gradient(to right, #ece9e6, #ffffff);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    width: 400px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    padding: 20px;
    position: relative;
    transition: transform 0.3s ease-in-out;
}

.hidden {
    display: none;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

label {
    font-size: 14px;
    color: #555;
    display: block;
    margin-bottom: 8px;
}

input[type="text"],
input[type="password"] {
    height: 40px;
    width: 100%;
    padding: 0 10px;
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border 0.3s ease;
    line-height: 40px;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border-color: #007BFF;
    outline: none;
}

a {
    color: #007BFF;
    font-size: 14px;
    display: block;
    text-align: right;
    text-decoration: none;
    margin-bottom: 20px;
}

a:hover {
    text-decoration: underline;
}

button {
    width: 100%;
    height: 40px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.input-group {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.captcha-img {
    width: 130px;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;
}

.btn-send {
    width: 130px;
    height: 40px;
    padding: 0 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-send:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.btn-send:hover:not(:disabled) {
    background-color: #218838;
}
</style>
