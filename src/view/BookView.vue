<script lang="ts" setup>
import { getBookChapterList } from '@/api/book/bookChapterList';
import { getBookInfo } from '@/api/book/bookInfo';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const bookId = ref<number>();
bookId.value = Number(route.params.book_id);
const bookInfo = ref(await getBookInfo(bookId.value));
const bookChapterList = ref(await getBookChapterList(bookId.value))
</script>

<template>
    <div class="container">
        <h1></h1>
    </div>
</template>

<style scoped></style>