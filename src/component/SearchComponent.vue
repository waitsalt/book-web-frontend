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
    <div class="searchContainer">
        <div class="searchBox">
            <input v-model="searchQuery" class="searchInput" type="text" placeholder="请输入关键字搜索..."
                @keyup.enter="handleSearch" />
            <div class="searchIcon" @click="handleSearch">
                <AiOutlineSearch />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 搜索框外层容器 */
.searchContainer {
    position: absolute;
    z-index: 1000;
}

/* 搜索框容器 */
.searchBox {
    top: 10px;
    height: 46px;
    display: flex;
    position: fixed;
    align-items: center;
    left: 35vw;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 30vw;
    transition: box-shadow 0.3s ease;
}

.searchBox:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.searchInput {
    flex: 1;
    border: none;
    outline: none;
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 16px;
    color: #333;
}

.searchInput::placeholder {
    color: #aaa;
    font-style: italic;
}

.searchIcon {
    position: relative;
    height: 35px;
    width: 35px;
    right: 5px;
    border-radius: 50%;
    color: #333;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.searchIcon:hover {
    background: #e2e2e6;
    transform: scale(1.1);
}
</style>
