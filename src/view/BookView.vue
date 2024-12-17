<script lang="ts" setup>
import { getBookChapterList } from '@/api/book/bookChapterList';
import { getBookInfo } from '@/api/book/bookInfo';
import { BookInfoNew, type BookInfo } from '@/model/book';
import { addNotification } from '@/util/notify';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const bookId = ref<number>(-1);
bookId.value = Number(route.params.book_id);

const bookInfo = ref<BookInfo>(BookInfoNew());
const bookChapterList = ref<[number, string][]>([]);

const fetchBookData = async () => {
    try {
        const bookInfoRes = await getBookInfo(bookId.value);
        const bookChapterListRes = await getBookChapterList(bookId.value);

        bookInfo.value = bookInfoRes.data;
        bookChapterList.value = bookChapterListRes.data;
    } catch {
        addNotification({
            type: "error",
            title: "数据获取",
            content: "书籍获取错误"
        })
    }
};

onMounted(fetchBookData);
</script>

<template>
    <div class="bookContainer">
        <div class="bookInfo">
            <img :src="bookInfo.cover_url" alt="书籍封面" class="bookCover" />
            <div class="flex-1">
                <h1 class="bookName">{{ bookInfo.book_name }}</h1>
                <p class="authorName">作者: {{ bookInfo.author_name }}</p>
                <p class="bookClass">分类: {{ bookInfo.book_class }}</p>
                <p class="bookStatus">状态: {{ bookInfo.book_status }}</p>
                <p class="bookPlatform">来源: {{ bookInfo.platform }}</p>
                <p class="bookTagList">
                    标签:
                    <span v-for="tag in bookInfo.book_tags.split(' ')" :key="tag" class="bookTag">
                        {{ tag }}
                    </span>
                </p>
                <p class="bookDesc">
                    {{ bookInfo.book_desc }}
                </p>
            </div>
        </div>

        <div class="bookChapterInfoList">
            <h2 class="">目录</h2>
            <ul class="">
                <li v-for="chapter in bookChapterList" :key="chapter[1]">
                    <a :href="`/book/${bookInfo.book_id}/${chapter[0]}`">{{ chapter[1] }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.bookContainer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 2rem auto;
    font-family: 'Arial', sans-serif;
}

.bookInfo {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
}

.bookCover {
    width: 150px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.flex-1 {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bookName {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.authorName,
.bookClass,
.bookStatus {
    font-size: 1rem;
    color: #555;
}

.bookTagList {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 1rem;
    color: #666;
}

.bookTag {
    background-color: #e0e0e0;
    border-radius: 12px;
    padding: 0.2rem 0.8rem;
    font-size: 0.9rem;
    color: #333;
}

.bookDesc {
    font-size: 1rem;
    color: #444;
    line-height: 1.5;
    margin-top: 0.5rem;
}

.bookChapterInfoList {
    padding-top: 1rem;
}

.bookChapterInfoList h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
}

.bookChapterInfoList ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.bookChapterInfoList li {
    margin-bottom: 0.8rem;
}

.bookChapterInfoList a {
    display: block;
    padding: 0.8rem 1rem;
    background-color: #fff;
    border-radius: 8px;
    text-decoration: none;
    color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
}

.bookChapterInfoList a:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}
</style>
