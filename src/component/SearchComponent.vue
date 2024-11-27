<script lang="ts" setup>
import { ref } from 'vue';
import { AiOutlineSearch } from 'vue-icons-plus/ai';

// 绑定搜索框的输入内容
const searchQuery = ref('');

// 触发搜索的处理函数
const handleSearch = () => {
    if (searchQuery.value.trim()) {
        console.log(`搜索: ${searchQuery.value}`);
        // 可以在这里添加搜索逻辑
    }
};
</script>

<template>
    <div class="container">
        <div class="search-box">
            <input v-model="searchQuery" class="search-input" type="text" placeholder="请输入关键字搜索..."
                @keyup.enter="handleSearch" />
            <div class="search-icon" @click="handleSearch">
                <AiOutlineSearch />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 搜索框外层容器 */
.container {
    position: relative;
}

/* 搜索框容器 */
.search-box {
    top: 10px;
    height: 60px;
    display: flex;
    position: fixed;
    align-items: center;
    left: 30vw;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    overflow: hidden;
    width: 50vw;
    max-width: 600px;
    /* 最大宽度 */
    transition: box-shadow 0.3s ease;
}

.search-box:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    /* 鼠标悬停时的阴影效果 */
}

/* 搜索框输入 */
.search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px 20px;
    font-size: 16px;
    color: #333;
}

.search-input::placeholder {
    color: #aaa;
    /* 占位符颜色 */
    font-style: italic;
}

/* 搜索按钮 */
.search-icon {
    position: relative;
    height: 50px;
    width: 50px;
    right: 5px;
    border-radius: 50%;
    background-color: #c2c2b2;
    /* 绿色背景 */
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-icon:hover {
    background: #B4B8AB;
    /* 鼠标悬停时更深的绿色 */
}
</style>
