<script lang="ts" setup>
import { ref } from 'vue';

const book_name = ref<string>('')
const book_author = ref<string>('')
const book_status = ref<string>('')
const book_tag = ref<string>('')
const book_desc = ref<string>('')

// Array to store chapters (each chapter is an object with name and content)
const chapters = ref<[string, string][]>([]);

// Method to add a new chapter
const addChapter = () => {
    chapters.value.push(["", ""]);
};

// Method to remove a chapter
const removeChapter = (index: number) => {
    chapters.value.splice(index, 1);
};

// Method to send data to the server
const uploadBook = async () => {
    const bookData = {
        name: book_name.value,
        author: book_author.value,
        status: book_status.value,
        tag: book_tag.value,
        desc: book_desc.value,
        chapter: chapters.value
    };

    // Convert the book data to JSON format
    const jsonData = JSON.stringify(bookData, null, 2); // pretty-print with 2 spaces indentation

    // Create a Blob object to hold the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a download link for the Blob object
    const link = document.createElement('a');
    const fileName = `[${bookData.author}]${bookData.name}.json`;  // You can modify the filename as needed

    // Create an object URL for the Blob and set it as the href of the link
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Programmatically trigger a click on the link to start the download
    link.click();

    // Optionally, revoke the object URL after a short delay to free memory
    setTimeout(() => URL.revokeObjectURL(link.href), 0);

    alert('Book data saved as JSON file.');
};

</script>

<template>
    <h1>Upload Book</h1>

    <label>书名: </label>
    <input type="text" placeholder="请输入书名" v-model="book_name">
    <br>

    <label>作者: </label>
    <input type="text" placeholder="请输入作者" v-model="book_author">
    <br>

    <label>状态: </label>
    <input type="text" placeholder="请输入状态" v-model="book_status">
    <br>

    <label>标签: </label>
    <input type="text" placeholder="请输入标签" v-model="book_tag">
    <br>

    <label>简介: </label>
    <textarea placeholder="请输入简介" v-model="book_desc"></textarea>
    <br>

    <div v-for="(chapter, index) in chapters" :key="index">
        <h3>Chapter {{ index + 1 }}</h3>
        <label>章名: </label>
        <input type="text" v-model="chapter[0]" placeholder="请输入章节名">
        <br>
        <label>内容: </label>
        <textarea v-model="chapter[1]" placeholder="请输入章节内容"></textarea>
        <br>
        <button @click="removeChapter(index)">删除章节</button>
        <hr>
    </div>

    <button @click="addChapter">添加章节</button>
    <br><br>

    <button @click="uploadBook">下载Json</button>
    <form action="https://axum.169564.xyz/book/upload" method="post" enctype="multipart/form-data">
        <label>
            上传文件(仅支持Json)
            <input type="file" name="file">
        </label>
        <button type="submit">上传文件</button>
    </form>
</template>
