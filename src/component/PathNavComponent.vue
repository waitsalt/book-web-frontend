<script lang="ts" setup>
import router from '@/util/router';
import { ref } from 'vue';
import { AiOutlineMenu } from 'vue-icons-plus/ai';
import { BsBook } from 'vue-icons-plus/bs';

const isHovered = ref({
    icon: false,
    card: false,
});

const iconConfig = ref({
    color: 'white',
    size: 30,
});

const hoverTimeout = ref(700); // Hover 延时设置，控制显示卡片和隐藏卡片的时间


// 图标进入事件
const enterPathIconEvent = () => {
    isHovered.value.icon = true;
};

// 图标离开事件
const leavePathIconEvent = () => {
    setTimeout(() => { // 如果没有在卡片上
        isHovered.value.icon = false; // 让图标变为非hover状态
    }, hoverTimeout.value);
};

// 卡片进入事件
const enterPathCardEvent = () => {
    isHovered.value.card = true;
};

// 卡片离开事件
const leavePathCardEvent = () => {
    setTimeout(() => {
        isHovered.value.card = false; // 离开卡片后延时隐藏
    }, hoverTimeout.value);
};

// 跳转到首页
const goToHome = () => {
    router.push('/');
};
</script>

<template>
    <div class="pathNavContainer">
        <!-- 路径图标 -->
        <div class="pathIcon" @mouseenter="enterPathIconEvent" @mouseleave="leavePathIconEvent" @click="goToHome">
            <!-- <BsBook :color="iconConfig.color" :size="iconConfig.size" /> -->
            <BsBook />
        </div>

        <!-- 路径卡片 -->
        <div class="pathCard" :class="{ hidden: !(isHovered.icon || isHovered.card) }" @mouseenter="enterPathCardEvent"
            @mouseleave="leavePathCardEvent">
            <p>内容vsdvs</p>
        </div>
    </div>
</template>

<style scoped>
/* 外层容器 */
.pathNavContainer {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #B4B8AB;
    /* 添加渐变背景 */
    z-index: 1000;
}

/* 路径图标样式 */
.pathIcon {
    position: fixed;
    top: 10px;
    left: 10px;
    height: 46px;
    width: 46px;
    color: #00a1b6;
    background-color: #d9eef7;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.3s ease;
}

.pathIcon:hover {
    color: #ffffff;
    background-color: #00a1b6;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    /* 放大时阴影效果 */
}

/* 路径卡片样式 */
.pathCard {
    position: fixed;
    z-index: 2000;
    top: 70px;
    left: 10px;
    padding: 15px;
    border-radius: 12px;
    /* 更大的圆角 */
    background-color: #f4f9e9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    font-size: 1rem;
    color: #333;
    text-align: center;
    opacity: 0.9;
    z-index: 1001;
    transition: box-shadow 0.3s ease;
}

.pathCard:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.pathCard p {
    margin: 0;
    padding: 0;
    font-weight: 600;
}

/* 控制路径卡片的隐藏 */
.hidden {
    display: none;
}

/* 添加平滑的透明度过渡 */
.pathCard {
    opacity: 0;
    transition: opacity 0.5s ease;
}

.pathCard:not(.hidden) {
    opacity: 1;
}
</style>
