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
                    <EpSuccessFilled color="#4caf50" />
                </div>
                <div class="icon" v-if="notification.type === 'info'">
                    <AiFillInfoCircle color="#2196f3" />
                </div>
                <div class="icon" v-if="notification.type === 'warning'">
                    <AiFillWarning color="#ff9800" />
                </div>
                <div class="icon" v-if="notification.type === 'error'">
                    <BsXCircleFill color="#f83434" />
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
    padding: 10px;
}

.notification {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 10px;
    min-width: 280px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    opacity: 0;
    animation: slideIn 0.5s forwards, fadeOut 0.5s 4s forwards;
    transition: all 0.3s ease;
}

.notification.success {
    background: linear-gradient(145deg, #e8f5e9, #c8e6c9);
    border-left: 6px solid #4caf50;
}

.notification.info {
    background: linear-gradient(145deg, #e3f2fd, #bbdefb);
    border-left: 6px solid #2196f3;
}

.notification.warning {
    background: linear-gradient(145deg, #fff3e0, #ffecb3);
    border-left: 6px solid #ff9800;
}

.notification.error {
    background: linear-gradient(145deg, #ffebee, #ffcdd2);
    border-left: 6px solid #f83434;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
}

.icon {
    margin-right: 10px;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
    flex-grow: 1;
    margin-right: 10px;
}


.closeButton {
    background: none;
    border: none;
    font-size: 22px;
    color: #888;
    cursor: pointer;
    transition: color 0.2s, transform 0.2s;
}

.closeButton:hover {
    color: #333;
    transform: scale(1.2);
}

.content {
    margin-top: 8px;
    font-size: 15px;
    color: #555;
    text-align: left;
}

@keyframes slideIn {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>
