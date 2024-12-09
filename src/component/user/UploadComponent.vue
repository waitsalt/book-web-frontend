<script lang="ts" setup>
import { postVerifyBook } from '@/api/book/verify_book';
import type { BookCreateInfo } from '@/model/book';
import { addNotification } from '@/util/notify';
import { ref } from 'vue';
const uploadedBooks = ref<BookCreateInfo[]>([]); // 存储上传的书籍
const bookCreateInfo = ref<BookCreateInfo>({
    book_name: '',
    author_name: '',
    platform: '',
    user_id: 1,
    user_name: 'root',
    cover_url: '',
    source_url: '',
    book_tags: '',
    book_desc: '',
    book_class: '',
    book_status: '',
});
const verifyBookEvent = async () => {
    let res = await postVerifyBook({
        author_name: bookCreateInfo.value.author_name,
        book_name: bookCreateInfo.value.book_name,
        platform: bookCreateInfo.value.platform,
    });
    if (res === 200) {
        disabledNext.value = false;
    }
}
const disabledNext = ref(true);

const tabList = ref(['bookVerify', 'bookAddInfo', 'bookAddContent']);
const activeNav = ref('bookVerify');
const selectNav = (tab: string) => {
    activeNav.value = tab;
};
const tabText = (tab: string) => {
    switch (tab) {
        case 'bookVerify': return '书籍验证';
        case 'bookAddInfo': return '补充信息';
        case 'bookAddContent': return '补充内容';
    }
}
const tabNext = () => {
    if (activeNav.value === 'bookVerify') {
        activeNav.value = 'bookAddInfo';
    } else if (activeNav.value === 'bookAddInfo') {
        activeNav.value = 'bookAddContent';
    }
}

</script>

<template>
    <div class="uploadContainer">
        <div class="uploadNav">
            <button v-for="tab in tabList" href="#" :class="{ active: activeNav === tab }"
                @click.prevent="selectNav(tab)" :disabled="disabledNext">
                {{ tabText(tab) }}
            </button>
        </div>

        <!-- 上传书籍 - 书籍验证 -->
        <div v-if="activeNav === 'bookVerify'" class="bookVerify">
            <h3>书籍信息</h3>
            <div class="formGroup">
                <label for="bookName">书名:</label>
                <input v-model="bookCreateInfo.book_name" id="bookName" type="text" placeholder="输入书名" />
            </div>
            <div class="formGroup">
                <label for="authorName">作者:</label>
                <input v-model="bookCreateInfo.author_name" id="authorName" type="text" placeholder="输入作者名" />
            </div>
            <div class="formGroup">
                <label for="platform">平台:</label>
                <input v-model="bookCreateInfo.platform" id="platform" type="text" placeholder="输入平台" />
            </div>
            <div class="buttonGroup">
                <button @click="verifyBookEvent" class="submitBtn">验证书籍</button>
                <button class="submitBtn" :disabled="disabledNext" @click="tabNext">下一步</button>
            </div>
        </div>

        <!-- 上传书籍 - 其他信息 -->
        <div v-if="activeNav === 'bookAddInfo'" class="bookAddInfo">
            <h3>其他信息</h3>
            <div class="formGroup row">
                <div class="cover">
                    <img :src="bookCreateInfo.cover_url" alt="Book Cover">
                </div>
                <div class="inputGroup">
                    <label for="coverUrl">封面链接:</label>
                    <input v-model="bookCreateInfo.cover_url" id="coverUrl" type="url" placeholder="输入封面链接" />
                    <label for="sourceUrl">来源链接:</label>
                    <input v-model="bookCreateInfo.source_url" id="sourceUrl" type="url" placeholder="输入来源链接" />
                </div>
            </div>
            <div class="formGroup">
                <label for="tags">标签:</label>
                <input v-model="bookCreateInfo.book_tags" id="tags" type="text"
                    placeholder="请以#开始,空格分隔 如:#tag1 #tag2" />
            </div>
            <div class="formGroup">
                <label for="bookDesc">简介:</label>
                <textarea v-model="bookCreateInfo.book_desc" id="bookDesc" placeholder="输入书籍简介"></textarea>
            </div>
            <div class="formGroup">
                <label for="bookClass">类别:</label>
                <input v-model="bookCreateInfo.book_class" id="bookClass" type="text" placeholder="输入书籍类别" />
            </div>
            <div class="formGroup">
                <label for="bookStatus">状态:</label>
                <input v-model="bookCreateInfo.book_status" id="bookStatus" type="text" placeholder="输入书籍状态" />
            </div>
            <div class="buttonGroup">
                <button class="submitBtn" :disabled="disabledNext" @click="tabNext">下一步</button>
            </div>
        </div>

        <!-- 上传书籍 - 补充内容 -->
        <div v-if="activeNav === 'bookAddContent'" class="bookAddContent">
            <h3>补充内容</h3>
            <!-- 可以根据需要添加具体内容 -->
        </div>
    </div>
</template>

<style scoped>
.uploadContainer {
    background-color: #f2f2f8;
}

.uploadNav {
    position: fixed;
    right: 20px;
    top: 80px;
    z-index: 100;
    background-color: #ffffff;
    list-style: none;
    display: flex;
    justify-content: space-around;
    border-radius: 50px;
    padding: 6px 6px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.uploadNav button {
    text-decoration: none;
    color: black;
    font-size: 16px;
    padding: 3px 15px;
    cursor: pointer;
    border-radius: 50px;
    border: none;
    background-color: transparent;
    transition: background-color 0.3s, transform 0.2s;
}

.uploadNav button:hover {
    background-color: #cacaca;
    transition: background-color 0.3s, transform 0.2s;
}

.uploadNav button.active {
    color: white;
    background-color: #00a1d6;
}

.uploadNav button:disabled {
    cursor: not-allowed;
}

.bookVerify,
.bookAddInfo,
.bookAddContent {
    padding: 20px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    margin-top: 60px;
    transition: opacity 0.3s ease-in-out;
}

.bookVerify,
.bookAddInfo {
    max-width: 500px;
}

.bookVerify h3,
.bookAddInfo h3,
.bookAddContent h3 {
    color: #333;
    font-size: 24px;
    margin-bottom: 15px;
    text-align: center;
}

.cover {
    width: 140px;
    height: 210px;
    margin-right: 16px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.formGroup {
    margin-bottom: 15px;
}

.formGroup label {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    display: block;
}

input[type="text"],
input[type="url"],
textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 5px;
    box-sizing: border-box;
}

input[type="text"]:focus,
input[type="url"]:focus,
textarea:focus {
    outline: none;
    border-color: #00a1d6;
}

textarea {
    resize: vertical;
    height: 120px;
}

.buttonGroup {
    display: flex;
    gap: 10px;
}

.submitBtn {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #00a1d6;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
}

.submitBtn:hover {
    background-color: #008bb3;
}

.submitBtn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

/* New styles for row layout */
.formGroup.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.inputGroup {
    flex-grow: 1;
}

.inputGroup input {
    margin-bottom: 10px;
}
</style>
