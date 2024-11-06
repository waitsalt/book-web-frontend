<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref<string>('');
const author = ref<string>('');

const router = useRouter();

function to_search_view() {
    router.push({ path: `/search`, query: { name: name.value, author: author.value } })
}

</script>

<template>
    <h1>Home</h1>
    <form>
        <label>书名: </label>
        <input type="text" v-model="name">
        <br>
        <label>作者: </label>
        <input type="text" v-model="author">
    </form>
    <button @click="to_search_view">搜索</button>
</template>
