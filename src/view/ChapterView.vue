<script lang="ts" setup>
import { get_chapter } from '@/lib/Api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const book_id = route.params.book_id as string;
const chapter_id = route.params.chapter_id as string;
const chapter_content = ref()

onMounted(async () => {
    const data = await get_chapter(book_id, chapter_id);
    chapter_content.value = data;
});

</script>

<template>
    <h1>Chapter</h1>
    <p>{{ chapter_content }}</p>
</template>