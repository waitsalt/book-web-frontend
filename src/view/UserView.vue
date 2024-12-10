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
const userStore = useUserStore();

const localUrl = window.location.href;
const lastestUrlPart = localUrl.split('/').pop();

const activeNav = ref(lastestUrlPart); // 默认选中 'setting'

const checkUserIsHaveSignin = () => {
    if (userStore.userPublic.user_id === 0) {
        router.push('/signin');
    }
}

// 切换选中的导航项
const selectNav = (nav: string) => {
    router.push(`/user/${nav}`)
    activeNav.value = nav;
}

const tabList = ref(["setting", "collect", 'history', 'manage', 'upload'])
const tabText = (tab: string) => {
    switch (tab) {
        case 'setting': return '设置';
        case 'collect': return '收藏';
        case 'history': return '历史';
        case 'manage': return '管理';
        case 'upload': return '上传';
    }
}

onMounted(() => {
    if (activeNav.value === 'user') {
        activeNav.value = 'setting';
        router.push("/user/setting");
    }
    checkUserIsHaveSignin();
})

watch(() => userStore.userPublic.user_id, checkUserIsHaveSignin);
</script>


<template>
    <div class="userContainer">
        <!-- 左侧导航栏 -->
        <ul class="userNav">
            <a v-for="tab in tabList" :key="tab" href="#" :class="{ active: activeNav === tab }"
                @click.prevent="selectNav(tab)">
                {{ tabText(tab) }}
            </a>
        </ul>

        <!-- 右侧视图，根据选中的导航项显示不同组件 -->
        <div class="pathView">
            <div v-if="activeNav === 'setting'">
                <component :is="SettingComponent"></component>
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
    width: 100%;
    height: 100%;
    background-color: #f2f2f8;
    font-family: 'Arial', sans-serif;
}

/* 导航栏样式 */
.userNav {
    position: fixed;
    top: 70px;
    z-index: 100;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    border-radius: 50px;
    padding: 6px 6px;
    width: 320px;
    margin-left: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.userNav a {
    text-decoration: none;
    color: black;
    font-size: 16px;
    padding: 3px 15px;
    border-radius: 50px;
    transition: background-color 0.3s, transform 0.2s;
}

.userNav a:hover {
    background-color: #cacaca;
    transition: background-color 0.3s, transform 0.2s;
}

.userNav a.active {
    color: white;
    background-color: #00a1d6;
}

.pathView {
    flex-grow: 1;
    margin-top: 50px;
    overflow-y: auto;
}
</style>
