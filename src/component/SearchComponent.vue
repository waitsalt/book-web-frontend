<template>
    <div class="input-container">
        <input type="text" v-model="searchQuery" class="input" @keyup.enter="handleSearch" placeholder="请输入关键词" />
        <span class="icon">
            <button @click="handleSearch">
                <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                        stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>
            </button>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const handleSearch = () => {
    if (searchQuery.value.trim() === '') {
        alert('请输入搜索内容！');
        return;
    }
    alert(`搜索内容: ${searchQuery.value}`);
};
</script>

<style scoped>
/* 美化按钮样式 */
button {
    border: none;
    background: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 输入框容器样式 */
.input-container {
    position: fixed;
    top: 5px;
    left: 25vw;
    display: flex;
    align-items: center;
    width: 50vw;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 30px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}

.input-container:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 输入框样式 */
.input {
    flex-grow: 1;
    border: none;
    padding: 0 20px;
    width: 100%;
    height: 100%;
    font-size: 16px;
    outline: none;
    background: transparent;
    border-radius: 30px 0 0 30px;
    color: #333;
    font-family: Arial, sans-serif;
}

.input::placeholder {
    color: #aaa;
    font-style: italic;
}

/* 图标按钮样式 */
.icon {
    position: relative;
    display: flex;
    height: 0%;
    right: 5%;
    cursor: pointer;
}

.icon button:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
}
</style>
