<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getMostCollectBooks } from '@/api/book/mostCollectBooks';
import BookComponent from '@/component/home/BookComponent.vue';
import { getLatestUpdataBooks } from '@/api/book/latestUpdataBooks';
import { getMostRecommmendBooks } from '@/api/book/mostRecommmendBooks';
import type { BookInfo } from '@/model/book';

const latestUpdateBooks = ref<BookInfo[]>([]);
const mostCollectBooks = ref<BookInfo[]>([]);
const mostRecommendBooks = ref<BookInfo[]>([]);
const bookInfoShow = ref<BookInfo[]>([]);
const activeTab = ref('latest'); // 当前选中标签
const loading = ref(true); // 加载状态
const error = ref<string | null>(null); // 错误信息

onMounted(async () => {
    try {
        loading.value = true;
        let res = await getLatestUpdataBooks();
        latestUpdateBooks.value = res.data;
        bookInfoShow.value = latestUpdateBooks.value; // 默认显示最新更新
    } catch (err) {
        error.value = '加载数据失败，请稍后重试';
        console.error(err);
    } finally {
        loading.value = false;
    }
});

// 切换标签方法
const switchTab = (tab: string) => {
    activeTab.value = tab;
    if (tab === 'latest') {
        bookInfoShow.value = latestUpdateBooks.value;
    } else if (tab === 'collect') {
        bookInfoShow.value = mostCollectBooks.value;
    } else if (tab === 'recommend') {
        bookInfoShow.value = mostRecommendBooks.value;
    }
};
</script>

<template>
    <div class="home-container">
        <ul class="homeNav">
            <a v-for="tab in ['latest', 'collect', 'recommend']" href="#" :class="{ active: activeTab === tab }"
                @click.prevent="switchTab(tab)">
                {{ tab === 'latest' ? '最新更新' : tab === 'collect' ? '最多收藏' : '最多推荐' }}
            </a>
        </ul>
        <div v-if="loading" class="loading">加载中...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else class="bookShow">
            <BookComponent v-for="(bookInfo, index) in bookInfoShow" :key="index" :bookInfo="bookInfo" />
        </div>
    </div>
</template>

<style scoped>
.home-container {
    background-color: #f2f2f8;
    font-family: 'Arial', sans-serif;
}

.homeNav {
    position: fixed;
    top: 70px;
    z-index: 100;
    display: flex;
    justify-content: space-around;
    border-radius: 50px;
    padding: 5px 5px;
    width: 290px;
    margin-left: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.homeNav a {
    text-decoration: none;
    color: black;
    font-size: 16px;
    padding: 3px 15px;
    border-radius: 50px;
    transition: background-color 0.3s, transform 0.2s;
}

.homeNav a:hover {
    background-color: #cacaca;
    transition: background-color 0.3s, transform 0.2s;
}

.homeNav a.active {
    color: white;
    background-color: #00a1d6;
}

.bookShow {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
    padding: 20px;
}

.loading,
.error {
    text-align: center;
    font-size: 1.2rem;
    color: #777;
}
</style>
