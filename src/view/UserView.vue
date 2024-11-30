<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/store/user';
import router from '@/util/router';
import SettingComponent from '@/component/user/SettingComponent.vue';
import CollectComponent from '@/component/user/CollectComponent.vue';
import HistoryComponent from '@/component/user/HistoryComponent.vue';
import UploadComponent from '@/component/user/UploadComponent.vue';
import ManageComponent from '@/component/user/ManageComponent.vue';

// 获取用户信息存储
const userInfoStore = useUserStore();

const localUrl = window.location.href;
const lastestUrlPart = localUrl.split('/').pop();
// 状态管理，记录当前选中的导航项
const activeNav = ref(lastestUrlPart); // 默认选中 'setting'

const checkUserIsHaveSignin = () => {
    if (userInfoStore.userInfo.user_id === 0) {
        router.push('/signin');
    }
}

const settingComponent = SettingComponent;

// 切换选中的导航项
const selectNav = (nav: string) => {
    router.push(`/user/${nav}`)
    activeNav.value = nav;
}

onMounted(() => {
    if (activeNav.value === 'user') {
        activeNav.value = 'setting';
        router.push("/user/setting");
    }
    checkUserIsHaveSignin();
})

watch(() => userInfoStore.userInfo.user_id, checkUserIsHaveSignin);
</script>


<template>
    <div class="userContainer">
        <!-- 左侧导航栏 -->
        <div class="pathNav">
            <div class="navItem" :class="{ active: activeNav === 'setting' }" @click="selectNav('setting')">设置</div>
            <div class="navItem" :class="{ active: activeNav === 'collect' }" @click="selectNav('collect')">收藏</div>
            <div class="navItem" :class="{ active: activeNav === 'history' }" @click="selectNav('history')">历史</div>
            <div class="navItem" :class="{ active: activeNav === 'manage' }" @click="selectNav('manage')">管理</div>
            <div class="navItem" :class="{ active: activeNav === 'upload' }" @click="selectNav('upload')">上传</div>
        </div>

        <!-- 右侧视图，根据选中的导航项显示不同组件 -->
        <div class="pathView">
            <div v-if="activeNav === 'setting'">
                <component :is="settingComponent"></component>
            </div>
            <div v-if="activeNav === 'collect'">
                <component :is="CollectComponent"></component>
            </div>
            <div v-if="activeNav === 'history'">
                <component :is="HistoryComponent"></component>
            </div>
            <div v-if="activeNav === 'manage'">
                <component :is="ManageComponent"></component>
            </div>
            <div v-if="activeNav === 'upload'">
                <component :is="UploadComponent"></component>
            </div>
        </div>
    </div>
</template>


<style scoped>
.userContainer {
    display: flex;
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    font-family: 'Arial', sans-serif;
}

.pathNav {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin: 0px 0 0 0;
    background-color: #F1F0E8;
    padding: 20px 20px;
    border-radius: 20px 0 0 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    height: auto;
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
    border-radius: 10px;
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
    padding: 20px;
    background-color: #fff;
    border-radius: 20px 0px 0px 20px;
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
