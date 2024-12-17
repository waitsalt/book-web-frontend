<script lang="ts" setup>
import type { BookInfo } from '@/model/book';
import router from '@/util/router';

const { bookInfo } = defineProps<{ bookInfo: BookInfo }>();

const gotoBook = () => {
    router.push(`/book/${bookInfo.book_id}`);
};
</script>

<template>
    <div class="book-card" @click="gotoBook">
        <div class="cover">
            <img :src="bookInfo.cover_url" alt="Book Cover" loading="lazy">
        </div>
        <div class="book-details">
            <h3 class="book-name">{{ bookInfo.book_name }}</h3>
            <div class="book-meta">
                <span class="author">{{ bookInfo.author_name }}</span>
                <span class="platform">{{ bookInfo.platform }}</span>
                <span :class="['status', bookInfo.book_status.toLowerCase()]">
                    {{ bookInfo.book_status }}
                </span>
            </div>
            <div class="tags">
                <span v-for="tag in bookInfo.book_tags.split(' ')" :key="tag" class="tag">
                    {{ tag }}
                </span>
            </div>
            <p class="book-desc">{{ bookInfo.book_desc }}</p>
        </div>
    </div>
</template>

<style scoped>
.book-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border-radius: 12px;
    cursor: pointer;
    transition: box-shadow 0.2s ease, background-color 0.2s ease;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.cover {
    width: 120px;
    height: 180px;
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
    border-radius: 8px;
}

.book-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.book-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
}

.book-meta {
    display: flex;
    gap: 10px;
    font-size: 0.9rem;
}

.book-desc {
    font-size: 0.9rem;
    line-height: 1.4;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.tag {
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.8rem;
}
</style>
