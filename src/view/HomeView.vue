<script lang="ts" setup>
import { getLatestUpdataBooks } from '@/api/book/latestUpdataBooks';
import { getMostCollectBooks } from '@/api/book/mostCollectBooks';
import { getMostRecommmendBooks } from '@/api/book/mostRecommmendBooks';
import BookComponent from '@/component/home/BookComponent.vue';

const lastestUpdateBooks = await getLatestUpdataBooks();
const mostCollectBooks = await getMostCollectBooks();
const mostRecommendBooks = await getMostRecommmendBooks();
</script>

<template>
    <div class="home-container">
        <!-- 最新更新 -->
        <section class="section">
            <div class="section-header">
                <h2>最新更新</h2>
            </div>
            <div class="books">
                <div v-for="(book, index) in lastestUpdateBooks" :key="index">
                    <BookComponent :bookInfo="book" />
                </div>
            </div>
        </section>

        <!-- 最多收藏 -->
        <section class="section">
            <div class="section-header">
                <h2>最多收藏</h2>
            </div>
            <div class="books">
                <div v-for="(book, index) in mostCollectBooks" :key="index">
                    <BookComponent :bookInfo="book" />
                </div>
            </div>
        </section>

        <!-- 最多推荐 -->
        <section class="section">
            <div class="section-header">
                <h2>最多推荐</h2>
            </div>
            <div class="books">
                <div v-for="(book, index) in mostRecommendBooks" :key="index">
                    <BookComponent :bookInfo="book" />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* 主容器样式 */
.home-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 16px;
    background-color: #f9f9f9;
}

/* 各部分样式 */
.section {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
    margin-bottom: 16px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 8px;
}

.section-header h2 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
}

/* 图书列表样式 */
.books {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
}

/* 响应式布局 */
@media (max-width: 768px) {
    .books {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}
</style>
