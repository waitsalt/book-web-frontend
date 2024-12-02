<script lang="ts" setup>
import type { BookInfo } from '@/model/book';
import router from '@/util/router';

const { bookInfo } = defineProps<{ bookInfo: BookInfo }>()

const gotoBook = () => {
    router.push(`/book/${bookInfo.book_id}`);
}
</script>

<template>
    <div class="book-card" @click="gotoBook">
        <div class="cover">
            <img :src="bookInfo.cover_url" alt="Book Cover">
        </div>
        <div class="book-details">
            <h3 class="book-name">{{ bookInfo.book_name }}</h3>
            <!-- 合并作者、平台和状态为一行 -->
            <div class="book-meta">
                <span class="author">{{ bookInfo.author_name }}</span>
                <span class="platform">平台: {{ bookInfo.platform }}</span>
                <span class="status">状态: {{ bookInfo.book_status }}</span>
            </div>
            <div class="tags">
                <span v-for="tag in bookInfo.book_tags.split(' ')" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <p class="book-desc">{{ bookInfo.book_desc }}</p>
        </div>
    </div>
</template>

<style scoped>
.book-card {
    display: flex;
    width: 400px;
    flex-direction: row;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    overflow: hidden;
}

.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: #f0f0f0;
}

.cover {
    width: 140px;
    height: 210px;
    margin-right: 16px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.book-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
}

.book-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    /* margin-bottom: 8px; */
}

.book-meta {
    display: flex;
    /* justify-content: space-between; */
    gap: 10px;
    /* 为项之间增加间距 */
    margin-bottom: 5px;
}

.author,
.platform,
.status {
    font-size: 0.9rem;
    color: #777;
}

.book-desc {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 8px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background-color: #f1f1f1;
    color: #333;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
}
</style>
