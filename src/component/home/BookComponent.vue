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
    border-radius: 15px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    overflow: hidden;
}

.book-card:hover {
    background-color: #d8d8e1;
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
}

.book-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
}

.book-meta {
    display: flex;
    gap: 10px;
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
    background-color: #d6d6d6;
    color: #333;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.8rem;
}
</style>
