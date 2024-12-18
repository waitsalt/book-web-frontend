<script lang="ts" setup>
import { getLogout } from '@/api/user/logout';
import { useUserStore } from '@/store/user';
import router from '@/util/router';
import { onMounted, ref, watch } from 'vue';
import { AiOutlineMenu, AiOutlineUser } from 'vue-icons-plus/ai';
import { Fa6RegCircleUser } from 'vue-icons-plus/fa6';

// 1 --- start
// 设置浮动卡片的显示与持续时间
const cursorInIcon = ref(false);
const cursorInCard = ref(false);
const showTime = ref(700);

const enterUserIconEvent = () => {
    cursorInIcon.value = true;
};

const leaveUserIconEvent = () => {
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
// 1 --- end


// 路径跳转
const goToPath = (path: string) => {
    router.push(path);
};

// 用户是否登陆
const userHasSignin = ref(false);

const userStore = useUserStore();

const checkUserIsHaveSignin = () => {
    if (userStore.userPublic.user_id != 0) {
        userHasSignin.value = true;
    } else {
        userHasSignin.value = false;
    }
}

const logoutEvent = async () => {
    let res = await getLogout()
    router.push('/signin');
}

onMounted(() => {
    checkUserIsHaveSignin()
})

watch(() => userStore.userPublic.user_id, checkUserIsHaveSignin);
</script>

<template>
    <div class="userNavContainer">
        <!-- 用户图标 -->
        <div v-if="userHasSignin" class="userIcon" @mouseenter="enterUserIconEvent" @mouseleave="leaveUserIconEvent"
            @click="goToPath('/user')">
            <img :src="userStore.userPublic.avatar_url" alt="" class="avatar">
        </div>
        <!-- 未登录时显示的登录按钮 -->
        <div v-else class="nologinUserIcon" @click="goToPath('signin')">
            <Fa6RegCircleUser /> <strong>登录</strong>
        </div>
    </div>
    <!-- 用户卡片 -->
    <div class="userCard" :class="{ hidden: !(cursorInCard || cursorInIcon) }" @mouseenter="enterPathCardEvent"
        @mouseleave="leavePathCardEvent">
        <div class="userPublic">
            <div><strong>用户:</strong> {{ userStore.userPublic.user_name }}</div>
            <div><strong>邮箱:</strong> {{ userStore.userPublic.user_email }}</div>
            <div><strong>等级:</strong> {{ userStore.userPublic.level }}</div>
        </div>
        <div class="pathNav">
            <div class="setting" @click="goToPath('/user/setting')"><span class="icon">⚙️</span> 设置</div>
            <div class="collect" @click="goToPath('/user/collect')"><span class="icon">⭐</span> 收藏</div>
            <div class="history" @click="goToPath('/user/history')"><span class="icon">🕒</span> 历史</div>
            <div class="upload" @click="goToPath('/user/upload')"><span class="icon">⬆️</span> 上传</div>
            <div class="manage" @click="goToPath('/user/manage')"><span class="icon">📁</span> 管理</div>
        </div>
        <div class="userAction">
            <div class="logout" @click="logoutEvent()">
                退出登陆
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 外部容器 */
.userNavContainer {
    position: absolute;
    z-index: 1000;
}

/* 用户图标样式 */
.userIcon {
    position: fixed;
    top: 10px;
    right: 10px;
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background-color: #e2f2f9;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.userIcon:hover {
    transform: scale(1.1);
    background-color: #B4B8AB;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.userIcon img {
    width: 100%;
    height: 100%;
}

.avatar {
    display: block;
    background-color: #cccccc;
    border-radius: 50%;
    border: 1px solid #ddd;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 未登录时显示的登录按钮样式 */
.nologinUserIcon {
    position: fixed;
    top: 10px;
    right: 15px;
    height: 46px;
    width: 110px;
    border-radius: 50px;
    background-color: #d9eef7;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    color: #12a7d8;
    transition: box-shadow 0.3s ease;
}

.nologinUserIcon:hover {
    /* transform: scale(1.1); */
    background-color: #00a1d6;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 隐藏卡片 */
.hidden {
    display: none;
}

.userCard {
    position: absolute;
    top: 70px;
    right: 10px;
    width: 250px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    animation: slideIn 0.3s ease forwards;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    transition: box-shadow 0.3s ease;
}

.userCard:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 用户信息部分 */
.userPublic {
    padding: 10px;
    margin: 15px;
    font-size: 14px;
    color: #333;
    background-color: #f2f2f2;
    border-radius: 5px;
}

.userPublic strong {
    color: #5a5a5a;
}

/* 路径导航部分 */
.pathNav {
    display: flex;
    flex-direction: column;
    margin: 15px;
    padding: 16px;
    background-color: #f2f2f2;
    /* 背景色改为柔和的浅灰色 */
    border-radius: 5px;
}

.pathNav div {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #555;
    border-radius: 5px;
    padding: 8px;
    /* 添加内边距 */
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s, color 0.3s;
}

.pathNav div:hover {
    background-color: #e0e0e0;
    color: #007bff;
}

.icon {
    margin-right: 10px;
    font-size: 18px;
}

/* 用户操作部分 */
.userAction {
    margin: 15px;
    padding: 15px;
    text-align: center;
    background-color: #f9f9f9;
    /* 添加背景色 */
}

/* 退出登录按钮 */
.logout {
    background: linear-gradient(45deg, #dc3545, #b52a37);
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
    transition: transform 0.3s, box-shadow 0.3s;
}

.logout:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(220, 53, 69, 0.4);
}

/* 动画效果 */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>