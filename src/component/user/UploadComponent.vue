<script lang="ts" setup>
import { addNotification } from '@/util/notify';
import { ref } from 'vue';
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
const verifyBookEvent = () => {
    addNotification({
        type: 'success',
        title: '书籍不存在',
        content: ''
    })
}

import { VueDraggable } from 'vue-draggable-plus';
import { MdDragIndicator } from 'vue-icons-plus/md';
import { FaEdit, FaTrashAlt, FaPlus, FaCheck } from 'vue-icons-plus/fa';
import type { BookCreateInfo } from '@/model/book';
type Chapter = {
    id: number;
    title: string;
    content: string;
    isEditing: boolean;
}

type Roll = {
    id: number;
    title: string;
    chapters: Chapter[];
    fold: boolean;
    isEditing: boolean;
}

const rolls = ref<Roll[]>([]);
const rollRemove = (rollIndex: number) => {
    rolls.value.splice(rollIndex, 1);
    updateRoll();
};
const chapterRemove = (rollIndex: number, chapterIndex: number) => {
    rolls.value[rollIndex].chapters.splice(chapterIndex, 1);
    updateChapter();
};
const addNewRoll = () => {
    const newRoll: Roll = {
        id: rolls.value.length,
        title: '',
        chapters: [],
        fold: false,
        isEditing: false,
    };
    rolls.value.push(newRoll);
};
const addNewChapter = (rollIndex: number) => {
    const newChapter: Chapter = {
        id: 0,
        title: '',
        content: '',
        isEditing: false,
    };
    rolls.value[rollIndex].chapters.push(newChapter);
    updateChapter();
};
const changeFlod = (rollIndex: number) => {
    rolls.value[rollIndex].fold = !rolls.value[rollIndex].fold;
};
// 编辑卷标题
const editRollTitle = (rollIndex: number, newTitle: string) => {
    rolls.value[rollIndex].title = newTitle;
    rolls.value[rollIndex].isEditing = false;
};
// 编辑章节标题
const editChapterTitle = (rollIndex: number, chapterIndex: number, newTitle: string) => {
    rolls.value[rollIndex].chapters[chapterIndex].title = newTitle;
    rolls.value[rollIndex].chapters[chapterIndex].isEditing = false;
};
const updateRoll = () => {
    for (let index = 0; index < rolls.value.length; index++) {
        const roll = rolls.value[index];
        roll.id = index;
    }
    updateChapter()
}

const updateChapter = () => {
    let num = 0;
    for (let rollIndex = 0; rollIndex < rolls.value.length; rollIndex++) {
        for (let chapterIndex = 0; chapterIndex < rolls.value[rollIndex].chapters.length; chapterIndex++) {
            const chapter = rolls.value[rollIndex].chapters[chapterIndex];
            chapter.id = num;
            num++;
        }
    }
}

const chapterShow = ref({
    rollId: 0,
    chapterId: 0,
    title: '',
    content: ''
})

const chooseChapter = (rollId: number, chapterId: number) => {
    for (let index = 0; index < rolls.value[rollId].chapters.length; index++) {
        const element = rolls.value[rollId].chapters[index];
        if (element.id === chapterId) {
            chapterShow.value = {
                rollId: rollId,
                chapterId: chapterId,
                content: element.content,
                title: `第${chapterId + 1}章 ${element.title}`,
            }
        }
    }
}

const saveChapterShow = () => {
    let rollId = chapterShow.value.rollId;
    let chapterId = chapterShow.value.chapterId;
    for (let index = 0; index < rolls.value[rollId].chapters.length; index++) {
        const element = rolls.value[rollId].chapters[index];
        if (element.id === chapterId) {
            element.content = chapterShow.value.content;
        }
    }
}

</script>

<template>
    <div class="uploadContainer">
        <!-- 上传书籍 -->
        <div class="CreateBookInfo">
            <section class="uploadSection">
                <h3>书籍信息</h3>
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
                <button @click="verifyBookEvent" class="submitBtn">验证书籍</button>
            </section>

            <section class="uploadSection">
                <h3>其他信息</h3>
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
                <button @click="" class="submitBtn">创建书籍</button>
            </section>
        </div>

        <div class="createBookContent">
            <div class="bookMenu">
                <button class="addRoll" @click="addNewRoll">新增卷</button>
                <VueDraggable v-model="rolls" handle=".handle" class="menu" @update="updateRoll">
                    <div class="roll" v-for="(roll, rollIndex) in rolls" :key="roll.id">
                        <div class="rollInfo" @click="changeFlod(rollIndex)">
                            <div class="icon handle">
                                <MdDragIndicator />
                            </div>
                            <div class="rollTitle">
                                <span>{{ `第${roll.id + 1}卷 ` }}</span>
                                <input v-if="roll.isEditing" v-model="roll.title"
                                    @blur="editRollTitle(rollIndex, roll.title)" class="editInput" autofocus />
                                <span v-else @dblclick="roll.isEditing = true">{{ roll.title }}</span>
                            </div>
                            <div class="actions">
                                <FaEdit v-if="!roll.isEditing" @click.stop="roll.isEditing = true" />
                                <FaCheck v-if="roll.isEditing" @click.stop="editRollTitle(rollIndex, roll.title)" />
                                <FaTrashAlt @click.stop="rollRemove(rollIndex)" />
                                <FaPlus @click.stop="addNewChapter(rollIndex)" />
                            </div>
                        </div>
                        <div class="chapters" :class="{ hidden: roll.fold }">
                            <VueDraggable handle=".handle" v-model="roll.chapters" group="chapter" ghost-class="ghost"
                                @update="updateChapter">
                                <div v-for="(chapter, chapterIndex) in roll.chapters" class="chapter" :key="chapter.id">
                                    <div class="chapterInfo" @click="chooseChapter(roll.id, chapter.id)">
                                        <div class="icon handle">
                                            <MdDragIndicator />
                                        </div>
                                        <div class="chapterTitle">
                                            <span>{{ `第${chapter.id + 1}章 ` }}</span>
                                            <input v-if="chapter.isEditing" v-model="chapter.title"
                                                @blur="editChapterTitle(rollIndex, chapterIndex, chapter.title)"
                                                class="editInput" autofocus />

                                            <span v-else @dblclick="chapter.isEditing = true">{{ chapter.title
                                                }}</span>
                                        </div>
                                        <div class="actions">
                                            <FaEdit v-if="!chapter.isEditing" @click.stop="chapter.isEditing = true" />
                                            <FaCheck v-if="chapter.isEditing"
                                                @click.stop="editChapterTitle(rollIndex, chapterIndex, chapter.title)" />
                                            <FaTrashAlt @click.stop="chapterRemove(rollIndex, chapterIndex)" />
                                        </div>
                                    </div>
                                </div>
                            </VueDraggable>
                        </div>
                    </div>
                </VueDraggable>
            </div>
            <div class="chaterContent">
                <h3>{{ chapterShow.title }}</h3>
                <textarea v-model="chapterShow.content"></textarea>
                <div class="action">
                    <button class="save" @click="saveChapterShow">保存</button>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.uploadContainer {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.CreateBookInfo,
.createBookContent {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
}

.CreateBookInfo {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.CreateBookInfo .uploadSection {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.CreateBookInfo .formGroup {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.CreateBookInfo input,
.CreateBookInfo textarea {
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border 0.3s ease-in-out;
}

.CreateBookInfo input:focus,
.CreateBookInfo textarea:focus {
    border-color: #007bff;
}

.CreateBookInfo .submitBtn {
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.CreateBookInfo .submitBtn:hover {
    background-color: #0056b3;
}

.createBookContent {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #fafafa;
}

/*  ----------- */

.menu {
    display: flex;
    flex-direction: column;
}

.roll {
    border: 1px solid #ddd;
    border-radius: 12px;
    margin-bottom: 0px;
    padding: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.roll:hover {
    background-color: #f1f1f1;
    transform: translateY(-1px);
}

.rollInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.rollInfo .icon {
    margin-right: 10px;
    width: 18px;
    cursor: move;
}

.editInput {
    border: 1px solid #ccc;
    padding: 6px 12px;
    font-size: 16px;
    border-radius: 8px;
    width: 70%;
}

.actions {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
}

.actions svg {
    width: 18px;
    height: 18px;
    fill: #555;
}

.actions svg:hover {
    fill: #4c9f70;
}

.chapters {
    margin-top: 5px;
    padding-left: 5px;
}

.chapter {
    border: 1px solid #ddd;
    border-radius: 12px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #fff;
    cursor: default;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.chapter:hover {
    background-color: #f1f1f1;
    transform: translateX(1px);
}

.chapterInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.chapterInfo .icon {
    margin-right: 12px;
    width: 18px;
    cursor: move;
}

/*---------- */
button.addRoll {
    padding: 5px 10px;
    margin-bottom: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.addRoll:hover {
    background-color: #0056b3;
}

.chaterContent {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.chaterContent h3 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.chaterContent textarea {
    padding: 15px;
    font-size: 14px;
    line-height: 1.6;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
    min-height: 200px;
}

.chaterContent .action {
    display: flex;
    justify-content: flex-end;
}

.chaterContent .action .save {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.chaterContent .action .save:hover {
    background-color: #0056b3;
}

.bookList {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.bookItem {
    width: calc(33% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.bookCover img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.bookDetails {
    margin-top: 15px;
}

.bookDetails h3 {
    font-size: 16px;
    font-weight: bold;
}

.bookDetails p {
    font-size: 14px;
    color: #666;
}

@media (min-width: 768px) {
    .CreateBookInfo {
        flex-direction: row;
        gap: 40px;
    }

    .CreateBookInfo .uploadSection {
        width: 48%;
    }

    .createBookContent {
        flex-direction: row;
    }

    .bookMenu {
        flex: 1;
    }

    .chaterContent {
        flex: 2;
    }
}
</style>
