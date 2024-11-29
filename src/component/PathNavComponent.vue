<script lang="ts" setup>
import router from '@/util/router';
import { ref } from 'vue';
import { AiOutlineMenu } from 'vue-icons-plus/ai';

const isHovered = ref({
    icon: false,
    card: false,
});

const iconConfig = ref({
    color: 'white',
    size: 30,
});

const hoverTimeout = ref(700); // Hover 延时设置，控制显示卡片和隐藏卡片的时间

// 更新图标状态
const updateIconState = (isHoveredIcon: boolean) => {
    iconConfig.value.color = isHoveredIcon ? '#284B63' : 'white';
};

// 图标进入事件
const enterPathIconEvent = () => {
    isHovered.value.icon = true;
    updateIconState(true);
};

// 图标离开事件
const leavePathIconEvent = () => {
    updateIconState(false);
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
            <AiOutlineMenu :color="iconConfig.color" :size="iconConfig.size" />
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
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #c2c2b2;
    cursor: pointer;
    border: 2px solid #eef0eb;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pathIcon:hover {
    transform: scale(1.1);
    background-color: #B4B8AB;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    /* 放大时阴影效果 */
}

/* 路径卡片样式 */
.pathCard {
    position: fixed;
    top: 90px;
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
    transition: opacity 0.3s ease;
}

.pathCard:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    /* 放大时阴影效果 */
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
