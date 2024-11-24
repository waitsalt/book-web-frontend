<script setup>
import router from '@/util/router';
import { onMounted, ref } from 'vue';

const showCard = ref(false); // 控制卡片显示/隐藏
const hiddenCard = ref(true)

// 鼠标进入时显示卡片，并清除隐藏卡片的定时器
const handleMouseEnter = () => {
    showCard.value = true;
};
const handleMouseLeave = () => {
    setTimeout(() => {
        showCard.value = false;
    }, 700);
}

const goto_user_view = () => {
    router.push("/user");
}

</script>

<template>
    <div class="floating-nav" @mouseenter="handleMouseEnter" @click="goto_user_view">
        <!-- 圆形按钮 -->
        <div class="floating-btn">
            <img src="/src/public/web.png" alt="Nav" class="nav-icon" />
        </div>

        <!-- 浮动卡片 -->
        <div v-if="showCard" class="floating-card" @mouseleave="handleMouseLeave">
            <div class="part-1">
                <div class="collect">
                    <a href="/user/collect">
                        收藏
                    </a>
                </div>
                <div class="history">
                    <a href="/user/history">
                        历史
                    </a>
                </div>
                <div class="logout">
                    <a href="/user/logout">
                        退出登录
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.part-1 {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.part-1 div {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    text-align: left;
    transition: background 0.3s, color 0.3s;
    /* 添加过渡效果 */
}

.part-1 div:hover {
    background: #f0f0f0;
    /* 鼠标悬停时的文字颜色 */
}

.part-1 .logout {
    color: #d9534f;
    /* 特别标记退出的颜色 */
}


.floating-nav {
    position: fixed;
    right: 5px;
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
    position: absolute;
    /* 确保图片完全覆盖父容器 */
    width: 100%;
    /* 图片宽度适应按钮大小 */
    height: 100%;
    /* 图片高度适应按钮大小 */
    object-fit: cover;
    /* 保持图片比例，同时填充容器 */
    border-radius: 50%;
    /* 确保图片也为圆形 */
    pointer-events: none;
    /* 防止图片阻挡鼠标事件 */
}

.floating-card {
    position: absolute;
    top: 60px;
    right: 0;
    width: 100px;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1001;
}
</style>
