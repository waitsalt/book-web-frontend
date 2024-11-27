<script lang="ts" setup>
import { useUserInfoStore } from '@/store/userInfo';
import router from '@/util/router';
import { ref } from 'vue';
import { AiOutlineMenu, AiOutlineUser } from 'vue-icons-plus/ai';

// 设置浮动卡片的显示与持续时间
const cursorInIcon = ref(false);
const cursorInCard = ref(false);
const showTime = ref(700);
const iconConfig = ref({
    color: 'white',
    size: 30,
});

const enterUserIconEvent = () => {
    cursorInIcon.value = true;
    iconConfig.value.color = '#284B63';
};

const leaveUserIconEvent = () => {
    iconConfig.value.color = 'white';
    setTimeout(() => {
        cursorInIcon.value = false;
    }, showTime.value);
};

const enterPathCardEvent = () => {
    cursorInCard.value = true;
};

const leavePathCardEvent = () => {
    setTimeout(() => {
        cursorInCard.value = false;
    }, showTime.value);
};

// 路径跳转
const goToUser = () => {
    router.push('/user');
};
const goToSignin = () => {
    router.push('/signin');
};

// 用户是否登陆
const userIsLogin = ref(false);
const nologinIconConfig = ref({
    color: 'white',
    size: 30,
});

const userInfoStore = useUserInfoStore();
if (userInfoStore.userInfo.user_id != 0) {
    userIsLogin.value = true;
}

const enterNologinUserIconEvent = () => {
    nologinIconConfig.value.color = '#284B63';
};

const leaveNologinUserIconEvent = () => {
    nologinIconConfig.value.color = 'white';
};

</script>

<template>
    <div class="container">
        <!-- 用户图标 -->
        <div v-if="userIsLogin" class="user-icon" @mouseenter="enterUserIconEvent" @mouseleave="leaveUserIconEvent"
            @click="goToUser">
            <AiOutlineMenu :color="iconConfig.color" :size="iconConfig.size" />
        </div>
        <!-- 未登录时显示的登录按钮 -->
        <div v-else class="nologin-user-icon" @mouseenter="enterNologinUserIconEvent"
            @mouseleave="leaveNologinUserIconEvent" :style="{ color: nologinIconConfig.color }" @click="goToSignin">
            <AiOutlineUser :color="nologinIconConfig.color" :size="nologinIconConfig.size" /> <strong>登录</strong>
        </div>
    </div>
    <!-- 用户卡片 -->
    <div class="user-card" :class="{ hidden: !(cursorInCard || cursorInIcon) }" @mouseenter="enterPathCardEvent"
        @mouseleave="leavePathCardEvent">
        <p>用户信息</p>
    </div>
</template>

<style scoped>
/* 外部容器 */
.container {
    position: relative;
}

/* 用户图标样式 */
.user-icon {
    position: fixed;
    top: 10px;
    right: 10px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #c2c2b2;
    /* 渐变背景 */
    cursor: pointer;
    border: 2px solid #EEF0EB;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 添加阴影 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-icon:hover {
    transform: scale(1.1);
    background-color: #B4B8AB;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    /* 高亮时增加阴影 */
}

/* 未登录时显示的登录按钮样式 */
.nologin-user-icon {
    position: fixed;
    top: 10px;
    right: 15px;
    height: 60px;
    width: 130px;
    border-radius: 50px;
    background: #c2c2b2;
    cursor: pointer;
    border: 2px solid #EEF0EB;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nologin-user-icon:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    /* 增加阴影效果 */
}

/* 用户卡片样式 */
.user-card {
    position: fixed;
    top: 75px;
    right: 10px;
    padding: 15px;
    background-color: #F4F9E9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    /* 添加卡片阴影 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    /* 高亮时的阴影 */
}

/* 隐藏卡片 */
.hidden {
    display: none;
}
</style>
