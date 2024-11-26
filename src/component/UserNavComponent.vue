<script lang="ts" setup>
import { get_user_info } from '@/api/user/user_info';
import request from '@/util/request';
import router from '@/util/router';
import type { PublicUser } from '@/util/types';
import { onMounted, ref } from 'vue';

const showCard = ref(false); // 控制卡片显示/隐藏
const isHiding = ref(false); // 控制卡片消失动画
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

// 鼠标进入时显示卡片，并清除隐藏卡片的定时器
const handleMouseEnter = () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
    isHiding.value = false;
    showCard.value = true;
};

// 鼠标离开时启动隐藏卡片的定时器
const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
        isHiding.value = true;
        setTimeout(() => {
            showCard.value = false;
            isHiding.value = false;
        }, 300); // 动画持续时间
    }, 700); // 延迟隐藏
};


const isSignin = ref(true);
const userInfo = ref<PublicUser | null>(null);

const gotoUser = () => router.push('/user');
const gotoCollect = () => router.push('/user/collect');
const gotoHistory = () => router.push('/user/history');
const gotoUpload = () => router.push('/user/upload');
const gotoManage = () => router.push('/user/manage');
const gotoSetting = () => router.push('/user/setting');
const gotoSignin = () => router.push('/signin');
const handleLogout = () => {
    localStorage.removeItem('book-web-auth-token');
    userInfo.value = null;
    router.push('/signin');
};

// 检查用户登录状态
const checkUserLogin = async () => {
    const token = localStorage.getItem('book-web-auth-token');
    if (!token) {
        isSignin.value = true;
        return;
    }
    request.defaults.headers.common['Authorization'] = token;
    try {
        const res = await get_user_info();
        userInfo.value = res.data;
        isSignin.value = false;
    } catch {
        isSignin.value = true; // 登录失效
    }
};

onMounted(async () => {
    await checkUserLogin();
});
</script>

<template>
    <div class="floating-nav" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- 圆形按钮 -->
        <div class="floating-btn" @click="gotoUser">
            <img src="/src/public/web.png" alt="Nav" class="nav-icon" />
        </div>

        <!-- 浮动卡片 -->
        <div v-if="showCard || isHiding" class="floating-card" :class="{ 'fade-out': isHiding }">
            <div class="user-card">
                <template v-if="!isSignin">
                    <div class="user-info">
                        <div><strong>用户:</strong> {{ userInfo?.user_name }}</div>
                        <div><strong>邮箱:</strong> {{ userInfo?.user_email }}</div>
                        <div><strong>等级:</strong> {{ userInfo?.level }}</div>
                    </div>
                    <div class="user-path">
                        <div class="collect" @click="gotoCollect"><span class="icon">⭐</span> 收藏</div>
                        <div class="history" @click="gotoHistory"><span class="icon">🕒</span> 历史</div>
                        <div class="upload" @click="gotoUpload"><span class="icon">⬆️</span> 上传</div>
                        <div class="manage" @click="gotoManage"><span class="icon">📁</span> 管理</div>
                        <div class="setting" @click="gotoSetting"><span class="icon">⚙️</span> 设置</div>
                    </div>
                    <div class="action">
                        <div class="logout-btn" @click="handleLogout">退出登录</div>
                    </div>
                </template>
                <template v-else>
                    <div class="action">
                        <div class="signin-btn" @click="gotoSignin">立即登录</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hidden {
    display: none;
}

/* 全局样式 */
body {
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
    margin: 0;
    padding: 0;
}

.floating-nav {
    position: fixed;
    right: 5px;
    top: 5px;
    z-index: 1000;
}

.floating-btn {
    width: 60px;
    height: 60px;
    background-color: #007bff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.floating-btn:hover {
    background-color: #0056b3;
    transform: scale(1.1);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
}

.nav-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    pointer-events: none;
}

.floating-card {
    position: absolute;
    top: 70px;
    right: 0;
    width: 250px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    animation: slideIn 0.3s ease forwards;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    transition: box-shadow 0.3s ease;
}

.floating-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

/* 动画效果 */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-out {
    animation: slideOut 0.3s ease forwards;
}

@keyframes slideOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(20px);
    }
}

.user-card {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.user-info div {
    margin-bottom: 10px;
    color: #333;
}

.user-path {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
}

.user-path div {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    font-size: 14px;
    color: #555;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.user-path div:hover {
    background-color: #e0e0e0;
    color: #007bff;
}

.icon {
    margin-right: 8px;
    font-size: 18px;
}

.action {
    text-align: center;
}

/* 美化登出按钮 */
.logout-btn {
    background: linear-gradient(45deg, #dc3545, #b52a37);
    /* 红色渐变 */
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
    /* 添加阴影 */
    transition: transform 0.3s, box-shadow 0.3s;
    /* 平滑的过渡效果 */
}

.logout-btn:hover {
    transform: translateY(-3px);
    /* 鼠标悬停时轻微弹起 */
    box-shadow: 0 6px 12px rgba(220, 53, 69, 0.5);
    /* 增强悬停阴影效果 */
}


/* 美化按钮样式 */
.signin-btn {
    background: linear-gradient(45deg, #007bff, #0056b3);
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.4);
}

.signin-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 123, 255, 0.5);
    transition: transform 0.3s, box-shadow 0.3s;
}
</style>
