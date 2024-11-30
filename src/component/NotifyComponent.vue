<script lang="ts" setup>
import { notifications, removeNotification } from '@/util/notify';
import { AiFillInfoCircle, AiFillWarning } from 'vue-icons-plus/ai';
import { BsXCircleFill } from 'vue-icons-plus/bs';
import { EpSuccessFilled } from 'vue-icons-plus/ep';
</script>

<template>
    <div class="notifyContainer" :class="[
        notifications[0]?.position, // 根据第一个通知确定位置
    ]">
        <div v-for="notification in notifications" :key="notification.id" :class="['notification', notification.type]">
            <div class="header">
                <!-- 图标显示根据通知类型 -->
                <div class="icon" v-if="notification.type === 'success'">
                    <EpSuccessFilled size="30px" color="#4caf50" />
                </div>
                <div class="icon" v-if="notification.type === 'info'">
                    <AiFillInfoCircle size="30px" color="#2196f3" />
                </div>
                <div class="icon" v-if="notification.type === 'warning'">
                    <AiFillWarning size="30px" color="#ff9800" />
                </div>
                <div class="icon" v-if="notification.type === 'error'">
                    <BsXCircleFill size="30px" color="#f83434" />
                </div>
                <div class="title">
                    {{ notification.title }}
                </div>
                <button v-if="notification.showClose" @click="removeNotification(notification.id)"
                    class="closeButton">×</button>
            </div>
            <div class="content">{{ notification.content }}</div>
        </div>
    </div>
</template>

<style scoped>
.notifyContainer {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notification {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 8px;
    min-width: 250px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    opacity: 0;
    animation: slideIn 0.5s forwards;
}

.notification.success {
    background-color: #e8f5e9;
    border-left: 5px solid #4caf50;
}

.notification.info {
    background-color: #e3f2fd;
    border-left: 5px solid #2196f3;
}

.notification.warning {
    background-color: #fff3e0;
    border-left: 5px solid #ff9800;
}

.notification.error {
    background-color: #ffebee;
    border-left: 5px solid #f83434;
}

.header {
    display: flex;
    align-items: flex-end;
    /* 图标和标题底部对齐 */
    justify-content: space-between;
    width: 100%;
    position: relative;
    /* 关闭按钮定位的基础 */
}

.icon {
    margin-right: 10px;
}

.title {
    font-weight: bold;
    font-size: 25px;
    flex-grow: 1;
    /* 占据可用空间 */
    color: #333;
}

.closeButton {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    font-size: 20px;
    color: #888;
    cursor: pointer;
    transition: color 0.2s;
}

.closeButton:hover {
    color: #333;
}

.content {
    margin-top: 5px;
    font-size: 20px;
    color: #555;
    text-align: left;
    /* 确保内容从左到右排列 */
}

/* 动画 */
@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
