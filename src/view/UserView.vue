<script lang="ts" setup>
import { ref } from 'vue';
import { useUserInfoStore } from '@/store/userInfo';
import router from '@/util/router';
import SettingComponent from '@/component/user/SettingComponent.vue';

// 获取用户信息存储
const userInfoStore = useUserInfoStore();

// 状态管理，记录当前选中的导航项
const activeNav = ref('setting'); // 默认选中 'setting'

const checkUserIsHaveSignin = () => {
    if (userInfoStore.userInfo.user_id === 0) {
        router.push('/signin');
    }
}

const settingComponent = SettingComponent;

// 切换选中的导航项
const selectNav = (nav: string) => {
    activeNav.value = nav;
    checkUserIsHaveSignin();
}
</script>


<template>
    <div class="userContainer">
        <!-- 左侧导航栏 -->
        <div class="pathNav">
            <div class="navItem" :class="{ active: activeNav === 'setting' }" @click="selectNav('setting')">设置</div>
            <div class="navItem" :class="{ active: activeNav === 'collect' }" @click="selectNav('collect')">收藏</div>
            <div class="navItem" :class="{ active: activeNav === 'history' }" @click="selectNav('history')">历史</div>
            <div class="navItem" :class="{ active: activeNav === 'manager' }" @click="selectNav('manager')">管理</div>
            <div class="navItem" :class="{ active: activeNav === 'upload' }" @click="selectNav('upload')">上传</div>
        </div>

        <!-- 右侧视图，根据选中的导航项显示不同组件 -->
        <div class="pathView">
            <div v-if="activeNav === 'setting'">
                <component :is="settingComponent"></component>
            </div>
            <div v-if="activeNav === 'collect'">收藏内容</div>
            <div v-if="activeNav === 'history'">历史内容</div>
            <div v-if="activeNav === 'manager'">管理内容</div>
            <div v-if="activeNav === 'upload'">上传内容</div>
        </div>
    </div>
</template>


<style scoped>
/* 全局样式 */
.userContainer {
    position: relative;
    top: 80px;
    display: flex;
    margin-top: 80;
    padding: 0;
    font-family: 'Arial', sans-serif;
    height: 100vh;
    background-color: #f9f9f9;
}

.pathNav {
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: #F1F0E8;
    padding: 20px 0;
    border-radius: 20px 0 0 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    height: 100%;
}

.navItem {
    width: 100%;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 18px;
    color: #333;
    text-align: center;
    padding: 12px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.navItem:hover {
    background-color: #f1f1f1;
    transform: scale(1.05);
}

.navItem.active {
    font-weight: bold;
    color: #007bff;
    background-color: #e0f7ff;
    border-radius: 10px;
}

/* 右侧视图样式 */
.pathView {
    flex-grow: 1;
    margin-left: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 0 20px 20px 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

.pathView>div {
    margin-bottom: 20px;
}

.pathView>div {
    padding: 20px;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
