<script lang="ts" setup>
import { get_user_info } from '@/api/user_info';
import request from '@/util/request';
import router from '@/util/router';
import { ref, computed, onMounted } from 'vue';

// 导航栏选项
const navItems = [
    { label: '收藏', component: 'CollectComponent' },
    { label: '历史', component: 'HistoryComponent' },
];

// 当前激活索引
const activeIndex = ref(0);

// 下划线样式
const underlineStyle = ref({
    left: '0px',
    width: '0px',
});

// 更新下划线位置
const moveUnderline = (index: number) => {
    const item = document.querySelectorAll('.nav-item')[index] as HTMLElement;
    underlineStyle.value = {
        left: `${item.offsetLeft}px`,
        width: `${item.offsetWidth}px`,
    };
};

// 重置下划线到当前激活项
const resetUnderline = () => {
    moveUnderline(activeIndex.value);
};

// 切换选项
const changeTab = (index: number) => {
    activeIndex.value = index;
    moveUnderline(index);
};


// 检查用户登录状态
const checkUserLogin = async () => {
    const token = localStorage.getItem('book-web-auth-token');
    if (!token || token === '') {
        router.push('/signin')
        return;
    }
    request.defaults.headers.common['Authorization'] = token;
    try {
        const res = await get_user_info();
    }
    catch {
        router.push("/signin")
    }
};
onMounted(async () => {
    await checkUserLogin()
})
</script>



<template>
    <div class="container">
    </div>
</template>



<style scoped></style>