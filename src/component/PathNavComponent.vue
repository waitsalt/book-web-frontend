<script setup>
import router from '@/util/router';
import { ref } from 'vue';

const showCard = ref(false); // 控制卡片显示/隐藏
const isHiding = ref(false); // 控制卡片消失动画
let hideTimeout = null; // 定时器变量

// 鼠标进入时显示卡片，并清除隐藏卡片的定时器
const handleMouseEnter = () => {
    clearTimeout(hideTimeout); // 清除隐藏定时器
    isHiding.value = false;
    showCard.value = true;
};

// 鼠标离开时启动隐藏卡片的定时器
const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
        isHiding.value = true; // 启动消失动画
        setTimeout(() => {
            showCard.value = false;
            isHiding.value = false; // 重置状态
        }, 300); // 动画持续时间
    }, 700); // 延迟隐藏
};

const gotoHome = () => {
    router.push('/');
};
</script>

<template>
    <div class="floating-nav" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- 圆形按钮 -->
        <div class="floating-btn" @click="gotoHome">
            <img src="/src/public/web.png" alt="Nav" class="nav-icon" />
        </div>

        <!-- 浮动卡片 -->
        <div v-if="showCard || isHiding" class="floating-card" :class="{ 'fade-out': isHiding }">
            <p>这是浮动卡片的内容。</p>
        </div>
    </div>
</template>

<style scoped>
.floating-nav {
    position: fixed;
    left: 5px;
    top: 5px;
    z-index: 1000;
}

.floating-btn {
    width: 50px;
    height: 50px;
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
    top: 60px;
    left: 0;
    width: 200px;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    animation: slideIn 0.3s ease forwards;
}

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
</style>
