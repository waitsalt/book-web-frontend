<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { ref } from 'vue';

// 使用用户状态
const user = useUserStore();
const historys = ref(user.historys); // 历史记录列表
const selectedHistoryIds = ref<number[]>([]); // 选中的历史记录 ID

// 删除单条历史记录
const removeHistory = (historyId: number) => {
    historys.value = historys.value.filter((history) => history.history_id !== historyId);
    // 同步到用户状态
    user.historys = historys.value;
    // 更新选中状态
    selectedHistoryIds.value = selectedHistoryIds.value.filter((id) => id !== historyId);
};

// 批量删除选中的历史记录
const removeSelectedHistories = () => {
    historys.value = historys.value.filter((history) => !selectedHistoryIds.value.includes(history.history_id));
    // 同步到用户状态
    user.historys = historys.value;
    // 清空选中状态
    selectedHistoryIds.value = [];
};

// 全选和取消全选
const toggleSelectAll = (e: Event) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    selectedHistoryIds.value = isChecked ? historys.value.map((history) => history.history_id) : [];
};

// 检查单条记录是否被选中
const isSelected = (historyId: number) => selectedHistoryIds.value.includes(historyId);

// 切换单条记录选中状态
const toggleSelect = (historyId: number) => {
    if (isSelected(historyId)) {
        selectedHistoryIds.value = selectedHistoryIds.value.filter((id) => id !== historyId);
    } else {
        selectedHistoryIds.value.push(historyId);
    }
};
</script>

<template>
    <div class="historyContainer">
        <h1>历史记录管理</h1>
        <div class="actions">
            <label>
                <input type="checkbox" @change="toggleSelectAll"
                    :checked="selectedHistoryIds.length === historys.length && historys.length > 0" />
                全选
            </label>
            <button @click="removeSelectedHistories" :disabled="selectedHistoryIds.length === 0">批量删除</button>
        </div>
        <table class="historyTable">
            <thead>
                <tr>
                    <th>选择</th>
                    <th>用户名</th>
                    <th>书籍名称</th>
                    <th>章节名称</th>
                    <th>浏览时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="history in historys" :key="history.history_id">
                    <td>
                        <input type="checkbox" :checked="isSelected(history.history_id)"
                            @change="toggleSelect(history.history_id)" />
                    </td>
                    <td>{{ history.user_name }}</td>
                    <td>{{ history.book_name }}</td>
                    <td>{{ history.chapter_name }}</td>
                    <td>{{ history.create_time }}</td>
                    <td>
                        <button @click="removeHistory(history.history_id)">删除</button>
                    </td>
                </tr>
                <tr v-if="historys.length === 0">
                    <td colspan="6" class="empty">暂无历史记录</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.historyContainer {
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

.historyTable {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.historyTable th,
.historyTable td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

.historyTable th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.historyTable .empty {
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
