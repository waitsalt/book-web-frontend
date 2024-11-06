<script lang="ts" setup>
import { search_book } from '@/lib/Api';
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const name = ref<string>(`${route.query.name}`);
const author = ref<string>(`${route.query.author}`);
const book_list = ref<any[]>([]);  // 使用 ref 包裹数组，以便 Vue 可以响应式更新

async function btn_search_book() {
    const res = await search_book(name.value, author.value);
    book_list.value = res;
}
</script>

<template>
    <h1>Search</h1>
    <form>
        <label>书名: </label>
        <input type="text" v-model="name">
        <br>
        <label>作者: </label>
        <input type="text" v-model="author">
    </form>
    <button @click="btn_search_book">搜索</button>

    <!-- 根据 book_list 是否为空显示不同的内容 -->
    <div v-if="book_list.length === 0">
        <p>没有找到任何书籍，试着更换搜索条件。</p>
    </div>

    <div v-else>
        <h2>搜索结果:</h2>
        <table border="1" cellspacing="0" cellpadding="10">
            <thead>
                <tr>
                    <th>书名</th>
                    <th>作者</th>
                    <th>状态</th>
                    <th>标签</th>
                    <th>描述</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in book_list" :key="index">
                    <td><a :href="`/${book.id}`">{{ book.name }}</a></td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.status }}</td>
                    <td>{{ book.tag }}</td>
                    <td>{{ book.desc }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>
