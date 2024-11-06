<script lang="ts" setup>
import { get_book } from '@/lib/Api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const book_id = route.params.book_id as string;

const book_info = ref<null | { name: string; author: string; status: string; tag: string; desc: string; chapter: Array<[string, string]> }>(null);

onMounted(async () => {
    const data = await get_book(book_id);
    book_info.value = data;
});

</script>

<template>
    <!-- <h1>书名: {{ book_info.name }}</h1>
    <h2>作者: {{ book_info.author }}</h2>
    <h2>状态: {{ book_info.status }}</h2>
    <h2>标签: {{ book_info.tag }}</h2>
    <h2>简介: {{ book_info.desc }}</h2>
    <h2>章节: </h2>
    <ul>
        <li v-for="chapter_info in book_info.chapter">
            <a :href="`/${book_id}/${chapter_info[0]}`">{{ chapter_info[1] }}</a>
        </li>
    </ul> -->
    <h1>Book</h1>
    <h2 v-if="book_info">书名: {{ book_info.name }}</h2>
    <h3 v-if="book_info">作者: {{ book_info.author }}</h3>
    <h3 v-if="book_info">状态: {{ book_info.status }}</h3>
    <h3 v-if="book_info">标签: {{ book_info.tag }}</h3>
    <h3 v-if="book_info">简介: {{ book_info.desc }}</h3>
    <h3 v-if="book_info">章节: </h3>
    <button>
        <a :href="`http://127.0.0.1:8000/book/download/${book_id}`">下载</a>
    </button>
    <ul v-if="book_info">
        <li v-for="chapter_info in book_info.chapter" :key="chapter_info[0]">
            <a :href="`/${book_id}/${chapter_info[0]}`">{{ chapter_info[1] }}</a>
        </li>
    </ul>

</template>