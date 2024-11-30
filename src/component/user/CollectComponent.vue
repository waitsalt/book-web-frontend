<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { ref } from 'vue';

// 使用用户状态
const user = useUserStore();
const collects = ref(user.collects); // 收藏列表
const selectedCollectIds = ref<number[]>([]); // 存储选中的收藏记录 ID

// 定义收藏类型
type Collect = {
    collect_id: number;
    user_id: number;
    user_name: string;
    book_id: number;
    book_name: string;
    chapter_id: number;
    chapter_name: string;
    create_time: string;
};

// 删除单条收藏记录
const removeCollect = (collectId: number) => {
    collects.value = collects.value.filter((collect) => collect.collect_id !== collectId);
    // 同步到用户状态
    user.collects = collects.value;
    // 移除选中记录
    selectedCollectIds.value = selectedCollectIds.value.filter((id) => id !== collectId);
};

// 批量删除选中的收藏记录
const removeSelectedCollects = () => {
    collects.value = collects.value.filter((collect) => !selectedCollectIds.value.includes(collect.collect_id));
    // 同步到用户状态
    user.collects = collects.value;
    // 清空选中状态
    selectedCollectIds.value = [];
};

// 是否全选
const toggleSelectAll = (e: Event) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    selectedCollectIds.value = isChecked ? collects.value.map((collect) => collect.collect_id) : [];
};

// 检查单条记录是否被选中
const isSelected = (collectId: number) => selectedCollectIds.value.includes(collectId);

// 切换单条记录选中状态
const toggleSelect = (collectId: number) => {
    if (isSelected(collectId)) {
        selectedCollectIds.value = selectedCollectIds.value.filter((id) => id !== collectId);
    } else {
        selectedCollectIds.value.push(collectId);
    }
};
</script>

<template>
    <div class="collectContainer">
        <h1>收藏记录管理</h1>
        <div class="actions">
            <label>
                <input type="checkbox" @change="toggleSelectAll"
                    :checked="selectedCollectIds.length === collects.length && collects.length > 0" />
                全选
            </label>
            <button @click="removeSelectedCollects" :disabled="selectedCollectIds.length === 0">批量删除</button>
        </div>
        <table class="collectTable">
            <thead>
                <tr>
                    <th>选择</th>
                    <th>用户名</th>
                    <th>书籍名称</th>
                    <th>章节名称</th>
                    <th>收藏时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="collect in collects" :key="collect.collect_id">
                    <td>
                        <input type="checkbox" :checked="isSelected(collect.collect_id)"
                            @change="toggleSelect(collect.collect_id)" />
                    </td>
                    <td>{{ collect.user_name }}</td>
                    <td>{{ collect.book_name }}</td>
                    <td>{{ collect.chapter_name }}</td>
                    <td>{{ collect.create_time }}</td>
                    <td>
                        <button @click="removeCollect(collect.collect_id)">删除</button>
                    </td>
                </tr>
                <tr v-if="collects.length === 0">
                    <td colspan="6" class="empty">暂无收藏记录</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.collectContainer {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.collectTable {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.collectTable th,
.collectTable td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

.collectTable th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.collectTable .empty {
    text-align: center;
    color: #999;
}

button {
    background-color: #ff4d4f;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #ff7875;
}

input[type="checkbox"] {
    width: 16px;
    height: 16px;
}
</style>
