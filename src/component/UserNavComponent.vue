<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import router from '@/util/router';
import { onMounted, ref, watch } from 'vue';
import { AiOutlineMenu, AiOutlineUser } from 'vue-icons-plus/ai';

// 1 --- start
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

const enterNologinUserIconEvent = () => {
    nologinIconConfig.value.color = '#284B63';
};

const leaveNologinUserIconEvent = () => {
    nologinIconConfig.value.color = 'white';
};
// 1 --- end


// 路径跳转
const goToPath = (path: string) => {
    router.push(path);
};

// 用户是否登陆
const userHasSignin = ref(false);
const nologinIconConfig = ref({
    color: 'white',
    size: 30,
});

const userStore = useUserStore();

const checkUserIsHaveSignin = () => {
    if (userStore.userInfo.user_id != 0) {
        userHasSignin.value = true;
    } else {
        userHasSignin.value = false;
    }
}

const logoutEvent = () => {
    userStore.$reset();
    router.push('/signin');
}

onMounted(() => {
    checkUserIsHaveSignin()
})

const userAvatarUrl = () => {
    if (userStore.userInfo.avatar_url == "") {
        return '/src/public/web.png'
    } else {
        return userStore.userInfo.avatar_url;
    }
}

watch(() => userStore.userInfo.user_id, checkUserIsHaveSignin);
</script>

<template>
    <div class="userNavContainer">
        <!-- 用户图标 -->
        <div v-if="userHasSignin" class="userIcon" @mouseenter="enterUserIconEvent" @mouseleave="leaveUserIconEvent"
            @click="goToPath('user')">
            <img :src="userAvatarUrl()" alt="">
        </div>
        <!-- 未登录时显示的登录按钮 -->
        <div v-else class="nologinUserIcon" @mouseenter="enterNologinUserIconEvent"
            @mouseleave="leaveNologinUserIconEvent" :style="{ color: nologinIconConfig.color }"
            @click="goToPath('signin')">
            <AiOutlineUser :color="nologinIconConfig.color" :size="nologinIconConfig.size" /> <strong>登录</strong>
        </div>
    </div>
    <!-- 用户卡片 -->
    <div class="userCard" :class="{ hidden: !(cursorInCard || cursorInIcon) }" @mouseenter="enterPathCardEvent"
        @mouseleave="leavePathCardEvent">
        <div class="userInfo">
            <div><strong>用户:</strong> {{ userStore.userInfo.user_name }}</div>
            <div><strong>邮箱:</strong> {{ userStore.userInfo.user_email }}</div>
            <div><strong>等级:</strong> {{ userStore.userInfo?.level }}</div>
        </div>
        <div class="pathNav">
            <div class="setting" @click="goToPath('/user/setting')"><span class="icon">⚙️</span> 设置</div>
            <div class="collect" @click="goToPath('/user/collect')"><span class="icon">⭐</span> 收藏</div>
            <div class="history" @click="goToPath('/user/history')"><span class="icon">🕒</span> 历史</div>
            <div class="upload" @click="goToPath('/user/upload')"><span class="icon">⬆️</span> 上传</div>
            <div class="manage" @click="goToPath('/user/manage')"><span class="icon">📁</span> 管理</div>
        </div>
        <div class="userAction">
            <div class="logout" @click="logoutEvent">
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
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #c2c2b2;
    cursor: pointer;
    border: 2px solid #EEF0EB;
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

/* 未登录时显示的登录按钮样式 */
.nologinUserIcon {
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

.nologinUserIcon:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 隐藏卡片 */
.hidden {
    display: none;
}

.userCard {
    position: absolute;
    top: 90px;
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
.userInfo {
    padding: 10px;
    margin: 15px;
    font-size: 14px;
    color: #333;
    background-color: #f2f2f2;
    border-radius: 5px;
}

.userInfo strong {
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