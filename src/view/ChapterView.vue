<script lang="ts" setup>
import { getChapter } from '@/api/book/chapter';
import { ChapterNew, type Chapter } from '@/model/chapter';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const bookId = ref<number>(-1);
const chapterId = ref<number>(-1);
bookId.value = Number(route.params.book_id);
chapterId.value = Number(route.params.chapter_id);
const chapter = ref<Chapter>(ChapterNew())

const fetchChapterData = async () => {
    let res = await getChapter(bookId.value, chapterId.value);
    chapter.value = res.data;
}
onMounted(async () => {
    await fetchChapterData();
    console.log(chapter.value.chapter_name);

})

</script>

<template>
    <div class="chapterContainer">
        {{ chapter.chapter_content }}
    </div>
</template>

<style scoped></style>