<script lang="ts" setup>
import { ref } from 'vue';

interface BookCreateInfo {
    book_name: string;
    author_name: string;
    platform: string;
    user_id: number;
    user_name: string;
    cover_url: string;
    source_url: string;
    book_tags: string;
    book_desc: string;
    book_class: string;
    book_status: string;
}

interface ChapterCreate {
    chapter_id: number;
    chapter_name: string;
    chapter_content: string;
}

interface RollCreate {
    roll_id: number;
    roll_name: string;
    chapter_list: ChapterCreate[];
}

const uploadedBooks = ref<BookCreateInfo[]>([]); // 存储上传的书籍
const newBook = ref<BookCreateInfo>({
    book_name: '',
    author_name: '',
    platform: '',
    user_id: 1,
    user_name: 'admin',
    cover_url: '',
    source_url: '',
    book_tags: '',
    book_desc: '',
    book_class: '',
    book_status: '',
});
const rolls = ref<RollCreate[]>([]);
const newRoll = ref<RollCreate>({
    roll_id: 1,
    roll_name: '',
    chapter_list: [],
});
const newChapter = ref<ChapterCreate>({
    chapter_id: 1,
    chapter_name: '',
    chapter_content: '',
});

// 添加书籍
const handleCreateBook = () => {
    uploadedBooks.value.push({ ...newBook.value });
    resetNewBook();
};

// 添加章节
const handleAddChapter = () => {
    newRoll.value.chapter_list.push({ ...newChapter.value });
    resetNewChapter();
};

// 添加卷
const handleAddRoll = () => {
    rolls.value.push({ ...newRoll.value });
    resetNewRoll();
};

// 重置书籍信息
const resetNewBook = () => {
    newBook.value = {
        book_name: '',
        author_name: '',
        platform: '',
        user_id: 1,
        user_name: 'admin',
        cover_url: '',
        source_url: '',
        book_tags: '',
        book_desc: '',
        book_class: '',
        book_status: '',
    };
};

// 重置章节信息
const resetNewChapter = () => {
    newChapter.value = {
        chapter_id: newChapter.value.chapter_id + 1,
        chapter_name: '',
        chapter_content: '',
    };
};

// 重置卷信息
const resetNewRoll = () => {
    newRoll.value = {
        roll_id: newRoll.value.roll_id + 1,
        roll_name: '',
        chapter_list: [],
    };
};
</script>

<template>
    <div class="uploadContainer">
        <!-- 我的已上传书籍 -->
        <div class="myUploadBooks">
            <h2>已上传书籍</h2>
            <div class="bookList">
                <div class="bookItem" v-for="(book, index) in uploadedBooks" :key="index">
                    <div class="bookCover">
                        <img :src="book.cover_url" alt="书籍封面" />
                    </div>
                    <div class="bookDetails">
                        <h3>{{ book.book_name }}</h3>
                        <p>{{ book.author_name }} - {{ book.book_status }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 上传书籍 -->
        <div class="uploadBook">
            <h2>上传书籍</h2>
            <div class="CreateBookInfo">
                <h3>创建书籍信息</h3>
                <div class="formGroup">
                    <label for="bookName">书名:</label>
                    <input v-model="newBook.book_name" id="bookName" type="text" placeholder="输入书名" />
                </div>
                <div class="formGroup">
                    <label for="authorName">作者:</label>
                    <input v-model="newBook.author_name" id="authorName" type="text" placeholder="输入作者名" />
                </div>
                <div class="formGroup">
                    <label for="platform">平台:</label>
                    <input v-model="newBook.platform" id="platform" type="text" placeholder="输入平台" />
                </div>
                <div class="formGroup">
                    <label for="coverUrl">封面链接:</label>
                    <input v-model="newBook.cover_url" id="coverUrl" type="url" placeholder="输入封面链接" />
                </div>
                <div class="formGroup">
                    <label for="sourceUrl">来源链接:</label>
                    <input v-model="newBook.source_url" id="sourceUrl" type="url" placeholder="输入来源链接" />
                </div>
                <div class="formGroup">
                    <label for="tags">标签:</label>
                    <input v-model="newBook.book_tags" id="tags" type="text" placeholder="输入书籍标签" />
                </div>
                <div class="formGroup">
                    <label for="bookDesc">简介:</label>
                    <textarea v-model="newBook.book_desc" id="bookDesc" placeholder="输入书籍简介"></textarea>
                </div>
                <div class="formGroup">
                    <label for="bookClass">类别:</label>
                    <input v-model="newBook.book_class" id="bookClass" type="text" placeholder="输入书籍类别" />
                </div>
                <div class="formGroup">
                    <label for="bookStatus">状态:</label>
                    <input v-model="newBook.book_status" id="bookStatus" type="text" placeholder="输入书籍状态" />
                </div>
                <button @click="handleCreateBook" class="submitBtn">创建书籍</button>
            </div>

            <!-- 创建章节 -->
            <div class="CreateBookContent">
            </div>
        </div>
    </div>
</template>

<style scoped>
.uploadContainer {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f4f7fb;
    border-radius: 10px;
}

.myUploadBooks {
    margin-bottom: 40px;
}

.bookList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.bookItem {
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bookCover img {
    width: 100%;
    border-radius: 5px;
}

.bookDetails {
    margin-top: 10px;
}

.uploadBook {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

h4 {
    font-size: 18px;
    margin-top: 10px;
}

.formGroup {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

textarea {
    resize: vertical;
}

.submitBtn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.submitBtn:hover {
    background-color: #45a049;
}
</style>
