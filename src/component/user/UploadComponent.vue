<script lang="ts" setup>
import { postVerifyBook } from '@/api/book/verify_book';
import type { BookCreateInfoPayload, BookCreatePayload } from '@/model/book';
import { useUserStore } from '@/store/user';
import { addNotification } from '@/util/notify';
import { ref } from 'vue';

const userStore = useUserStore()
const bookCreateInfoPayload = ref<BookCreateInfoPayload>({
    book_name: '',
    author_name: '',
    platform: '',
    uploader_id: userStore.userPublic.user_id,
    uploader_name: userStore.userPublic.user_name,
    cover_url: '',
    source_url: '',
    book_tags: '',
    book_desc: '',
    book_class: '',
    book_status: '',
});

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

const disabledNext = ref(true);
const verifyBookEvent = async () => {
    try {
        let res = await postVerifyBook({
            author_name: bookCreateInfoPayload.value.author_name,
            book_name: bookCreateInfoPayload.value.book_name,
            platform: bookCreateInfoPayload.value.platform,
        });
        switch (res.code) {
            case 200:
                addNotification({
                    type: "success",
                    title: "验证成功",
                    content: "书籍不存在，可以创建"
                })
                disabledNext.value = false;
                break;

            case 1201:
                addNotification({
                    type: "error",
                    title: "验证失败",
                    content: "书籍已存在，无法创建"
                })

            default:
                break;
        }
    } catch {
        addNotification({
            type: "error",
            title: "验证失败",
            content: "没有与服务器连接"
        })
    }
}

import { uuid } from "@/api/util/uuid";
import { VueDraggable } from "vue-draggable-plus";
import { AiOutlineDelete } from "vue-icons-plus/ai";
import { BiChevronRight, BiEditAlt } from "vue-icons-plus/bi";
import { GrAdd } from "vue-icons-plus/gr";
import { Io5CloudUploadOutline } from "vue-icons-plus/io5";
import { IpHourglassNull } from "vue-icons-plus/ip";
import { MdExpandMore, MdOutlineDone, MdOutlineDragIndicator } from "vue-icons-plus/md";
import type { RollCreate } from '@/model/roll';
import type { ChapterCreate } from '@/model/chapter';
import { postUploadBook } from '@/api/book/uploadBook';

type ChapterCreateTemp = {
    id: string;
    title: string;
    content: string;
};

type RollCreateTemp = {
    id: string;
    title: string;
    chapter_list: ChapterCreateTemp[];
    fold: boolean;
};

type BookContentCreateTemp = {
    roll_list: RollCreateTemp[];
};

type BookCreateTemp = {
    book_info: BookCreateInfoPayload;
    book_content: BookContentCreateTemp;
}

const bookContent = ref<BookContentCreateTemp>({
    roll_list: [
        { title: "正文", chapter_list: [{ title: "书籍说明", content: "", id: uuid() }], fold: true, id: uuid() },
    ]
});

const bookContentInit = () => {
    bookContent.value = {
        roll_list: [
            { title: "正文", chapter_list: [{ title: "书籍说明", content: "", id: uuid() }], fold: true, id: uuid() },
        ],
    };
    disableShow.value = true;
};

// 上传的文件
const file = ref<File | null>(null);

// 处理文件选择
const handleFileSelect = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        file.value = target.files[0];
    };
    switch (file.value?.name.split('.').pop()) {
        case 'json':
            analyzeJsonFile(await file.value.text());
            disableShow.value = false;
            break;

        case 'txt':
            analyzeTxtFile(await file.value.text());
            disableShow.value = false;
            break;

        default:
            break;
    }
};

const analyzeTxtFile = (fileContent: string) => {
    let bookContent: BookContentCreateTemp = { roll_list: [] };
    return bookContent;
};

const analyzeJsonFile = (fileContent: string) => {
    try {
        let fileRoll: BookCreateTemp = JSON.parse(fileContent);
        let bookContentCreate: BookContentCreateTemp = { roll_list: [] };

        for (let rollIndex = 0; rollIndex < fileRoll.book_content.roll_list.length; rollIndex++) {
            const rollTemp = fileRoll.book_content.roll_list[rollIndex];
            const rollCreate: RollCreateTemp = {
                id: uuid(),
                title: rollTemp.title,
                fold: true,
                chapter_list: [],
            };
            for (let chapterIndex = 0; chapterIndex < rollTemp.chapter_list.length; chapterIndex++) {
                const chapterTemp = rollTemp.chapter_list[chapterIndex];
                const chapterCreate: ChapterCreateTemp = {
                    id: uuid(),
                    title: chapterTemp.title,
                    content: chapterTemp.content,
                };
                rollCreate.chapter_list.push(chapterCreate);
            }
            bookContentCreate.roll_list.push(rollCreate);
        }
        bookContent.value = bookContentCreate;

        addNotification({
            type: "success",
            title: "上传文件",
            content: "JSON 解析完成",
        });
    } catch (error) {
        console.error("JSON 解析失败", error);

        addNotification({
            type: "warning",
            title: "上传文件",
            content: "JSON 解析失败",
        });
    }
};


const changeRollFold = (rollIndex: number) => {
    bookContent.value.roll_list[rollIndex].fold = !bookContent.value.roll_list[rollIndex].fold;
}

const editEnable = ref(true);
const editTitleText = ref('');
const editType = ref('')
const editRollIndex = ref(-1);
const editChapterIndex = ref([-1, -1]);

const editRollTitle = (rollIndex: number) => {
    if (editEnable.value === false) {
        switch (editType.value) {
            case 'roll':
                doneRollTitle(editRollIndex.value);
                break;

            case 'chapter':
                doneChapterTitle(editChapterIndex.value[0], editChapterIndex.value[1])
                break;
        }
    }
    editEnable.value = false;
    disableDrag.value = true;
    editType.value = 'roll';
    editRollIndex.value = rollIndex;
    editTitleText.value = bookContent.value.roll_list[rollIndex].title;
}

const doneRollTitle = (rollIndex: number) => {
    bookContent.value.roll_list[rollIndex].title = editTitleText.value;
    editEnable.value = true;
    disableDrag.value = false;
    editRollIndex.value = -1;
}

const editChapterTitle = (rollIndex: number, chapterIndex: number) => {
    if (editEnable.value === false) {
        switch (editType.value) {
            case 'roll':
                doneRollTitle(editRollIndex.value);
                break;

            case 'chapter':
                doneChapterTitle(editChapterIndex.value[0], editChapterIndex.value[1])
                break;
        }
    }
    editEnable.value = false;
    disableDrag.value = true;
    editType.value = 'chapter';
    editChapterIndex.value = [rollIndex, chapterIndex];
    editTitleText.value = bookContent.value.roll_list[rollIndex].chapter_list[chapterIndex].title;
}

const doneChapterTitle = (rollIndex: number, chapterIndex: number) => {
    bookContent.value.roll_list[rollIndex].chapter_list[chapterIndex].title = editTitleText.value;
    editEnable.value = true;
    disableDrag.value = false;
    editChapterIndex.value = [-1, -1];
}

const addRoll = (rollIndex: number) => {
    bookContent.value.roll_list.splice(rollIndex + 1, 0, { title: "新加卷", chapter_list: [{ title: "新加章", content: "", id: uuid() }], id: uuid(), fold: true });
};

const delRoll = (rollIndex: number) => {
    if (rollIndex === 0) {
        addNotification({
            title: '无法删除',
            content: '当前卷，无法删除',
        });
        return;
    }
    if (rollIndex === editingChapterIndex.value[0]) {
        editingChapterIndex.value = [0, 0]
    }
    bookContent.value.roll_list.splice(rollIndex, 1);
};

const delChapter = (rollIndex: number, chapterIndex: number) => {
    if (rollIndex === 0 && chapterIndex === 0) {
        addNotification({
            title: '无法删除',
            content: '当前章，无法删除',
        });
        return;
    }
    if (rollIndex === editingChapterIndex.value[0] && chapterIndex === editingChapterIndex.value[1]) {
        editingChapterIndex.value = [0, 0]
    }
    bookContent.value.roll_list[rollIndex].chapter_list.splice(chapterIndex, 1);

}
const addChapter = (rollIndex: number, chapterIndex: number) => {
    bookContent.value.roll_list[rollIndex].chapter_list.splice(chapterIndex + 1, 0, { title: "新加章", content: "", id: uuid() });
}

const editingChapterContent = ref('')
const editingChapterIndex = ref([0, 0]);
const editChapterContent = (rollIndex: number, chapterIndex: number) => {
    enableShowContentTip.value = false;
    editingChapterIndex.value = [rollIndex, chapterIndex];
    editingChapterContent.value = bookContent.value.roll_list[rollIndex].chapter_list[chapterIndex].content
}

const disableShow = ref(true);
const disableDrag = ref(false);

const createFromNew = () => {
    bookContent.value = {
        roll_list: [
            { title: "正文", chapter_list: [{ title: "第一章", content: "", id: uuid() }], fold: true, id: uuid() },
        ],
    };
    disableShow.value = false;
}

const enableShowContentTip = ref(true);

const saveBookContent = () => {
    const str = JSON.stringify({
        book_create_info_payload: bookCreateInfoPayload.value,
        book_content: bookContent.value,
    });
    const url = `data:,${str}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `[${bookCreateInfoPayload.value.author_name}]${bookCreateInfoPayload.value.book_name}.json`;
    a.click();
}

const uploadBook = async () => {
    let bookCreatePayload: BookCreatePayload = {
        book_create_info_payload: bookCreateInfoPayload.value,
        roll_create_list: [],
    };
    for (let rollIndex = 0; rollIndex < bookContent.value.roll_list.length; rollIndex++) {
        const rollTemp = bookContent.value.roll_list[rollIndex];
        let rollCreate: RollCreate = {
            roll_name: rollTemp.title,
            chapter_create_list: [],
        }
        for (let chapterIndex = 0; chapterIndex < bookContent.value.roll_list[rollIndex].chapter_list.length; chapterIndex++) {
            const chapterTemp = bookContent.value.roll_list[rollIndex].chapter_list[chapterIndex];
            let chapterCreate: ChapterCreate = {
                chapter_name: chapterTemp.title,
                chapter_content: chapterTemp.content,
            }
            rollCreate.chapter_create_list.push(chapterCreate);
        }
        bookCreatePayload.roll_create_list.push(rollCreate);
    }
    try {
        let res = await postUploadBook(bookCreatePayload);
        switch (res.code) {
            case 200:
                addNotification({
                    type: "success",
                    title: "书籍上传",
                    content: "成功",
                })
                break;

            default:
                addNotification({
                    type: "warning",
                    title: "书籍上传",
                    content: "未知的错误",
                })
                break;
        }

    } catch {
        addNotification({
            type: "error",
            title: "书籍上传",
            content: "错误",
        })
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
                <input v-model="bookCreateInfoPayload.book_name" id="bookName" type="text" placeholder="输入书名" />
            </div>
            <div class="formGroup">
                <label for="authorName">作者:</label>
                <input v-model="bookCreateInfoPayload.author_name" id="authorName" type="text" placeholder="输入作者名" />
            </div>
            <div class="formGroup">
                <label for="platform">平台:</label>
                <input v-model="bookCreateInfoPayload.platform" id="platform" type="text" placeholder="输入平台" />
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
                    <img :src="bookCreateInfoPayload.cover_url" alt="Book Cover">
                </div>
                <div class="inputGroup">
                    <label for="sourceUrl">来源链接:</label>
                    <input v-model="bookCreateInfoPayload.source_url" id="sourceUrl" type="url" placeholder="输入来源链接" />
                    <label for="coverUrl">封面链接:</label>
                    <input v-model="bookCreateInfoPayload.cover_url" id="coverUrl" type="url" placeholder="输入封面链接" />
                </div>
            </div>
            <div class="formGroup">
                <label for="tags">标签:</label>
                <input v-model="bookCreateInfoPayload.book_tags" id="tags" type="text"
                    placeholder="请以#开始,空格分隔 如:#tag1 #tag2" />
            </div>
            <div class="formGroup">
                <label for="bookDesc">简介:</label>
                <textarea v-model="bookCreateInfoPayload.book_desc" id="bookDesc" placeholder="输入书籍简介"></textarea>
            </div>
            <div class="formGroup">
                <label for="bookClass">类别:</label>
                <input v-model="bookCreateInfoPayload.book_class" id="bookClass" type="text" placeholder="输入书籍类别" />
            </div>
            <div class="formGroup">
                <label for="bookStatus">状态:</label>
                <input v-model="bookCreateInfoPayload.book_status" id="bookStatus" type="text" placeholder="输入书籍状态" />
            </div>
            <div class="buttonGroup">
                <button class="submitBtn" :disabled="disabledNext" @click="tabNext">下一步</button>
            </div>
        </div>

        <!-- 上传书籍 - 补充内容 -->
        <div v-if="activeNav === 'bookAddContent'" class="bookAddContent">
            <h3>补充内容</h3>
            <div class="chooseWay" :class="{ hidden: !disableShow }">
                <div class="fileUploadContainer">
                    <div class="fileUpload">
                        <input class="fileInput" id="fileInput" type="file" accept=".txt,.json"
                            @change="handleFileSelect" />
                        <label class="fileLabel" for="fileInput">
                            <i class="uploadIcon">
                                <Io5CloudUploadOutline size="50px" />
                            </i>
                            <p>选择上传的文件</p>
                        </label>
                    </div>
                </div>
                <div class="fileUploadContainer">
                    <div class="fileUpload">
                        <button class="fileInput" id="fromNewBtn" @click="createFromNew"></button>
                        <label class="fileLabel" for="fromNewBtn">
                            <i class="uploadIcon">
                                <IpHourglassNull size="50px" />
                            </i>
                            <p>从一个空项目开始</p>
                        </label>
                    </div>
                </div>
            </div>


            <!-- 显示视图 -->
            <div class="showView" :class="{ hidden: disableShow }">
                <div class="bookMenu">
                    <h3>目录</h3>
                    <VueDraggable ref="book" v-model="bookContent.roll_list" handle=".handle" :disabled="disableDrag">
                        <div v-for="(roll, rollIndex) in bookContent.roll_list" :key="roll.id" class="roll">
                            <div class="rollInfo">
                                <div class="leftView">
                                    <div class="handle">
                                        <MdOutlineDragIndicator />
                                    </div>
                                    <div class="foldPart" v-if="rollIndex !== editRollIndex">
                                        <p>{{ roll.title }}</p>
                                    </div>
                                    <div v-else>
                                        <input type="text" v-model="editTitleText">
                                    </div>
                                </div>
                                <div class="rightView">
                                    <div v-if="rollIndex !== editRollIndex">
                                        <div class="action fold" @click="changeRollFold(rollIndex)">
                                            <BiChevronRight :class="{ hidden: !roll.fold }" />
                                            <MdExpandMore :class="{ hidden: roll.fold }" />
                                        </div>
                                        <div class="action edit" @click="editRollTitle(rollIndex)">
                                            <BiEditAlt />
                                        </div>
                                        <div class="action delete" @click="delRoll(rollIndex)">
                                            <AiOutlineDelete />
                                        </div>
                                        <div class="action add" @click="addRoll(rollIndex)">
                                            <GrAdd />
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="action doneEdit" @click="doneRollTitle(rollIndex)">
                                            <MdOutlineDone />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <VueDraggable :class="{ hidden: roll.fold }" group="chapterList" ref="roll"
                                v-model="roll.chapter_list" class="chapterDraggable" handle=".handle"
                                :disabled="disableDrag">
                                <div v-for="(chapter, chapterIndex) in roll.chapter_list" :key="chapter.id"
                                    class="chapterInfo">
                                    <div class="leftView">
                                        <div class="handle">
                                            <MdOutlineDragIndicator />
                                        </div>
                                        <div v-if="rollIndex !== editChapterIndex[0] || chapterIndex !== editChapterIndex[1]"
                                            @click="editChapterContent(rollIndex, chapterIndex)">
                                            <p>{{ chapter.title }}</p>
                                        </div>
                                        <div v-else>
                                            <input type="text" v-model="editTitleText">
                                        </div>
                                    </div>
                                    <div class="rightView">
                                        <div
                                            v-if="rollIndex !== editChapterIndex[0] || chapterIndex !== editChapterIndex[1]">
                                            <div class="action edit" @click="editChapterTitle(rollIndex, chapterIndex)">
                                                <BiEditAlt />
                                            </div>
                                            <div class="action delete" @click="delChapter(rollIndex, chapterIndex)">
                                                <AiOutlineDelete />
                                            </div>
                                            <div class="action add" @click="addChapter(rollIndex, chapterIndex)">
                                                <GrAdd />
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="action doneEdit"
                                                @click="doneChapterTitle(rollIndex, chapterIndex)">
                                                <MdOutlineDone />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </VueDraggable>
                        </div>
                    </VueDraggable>
                </div>
                <div class="chapterContentShow">
                    <div class="noChapterChoose" :class="{ hidden: !enableShowContentTip }">
                        <h3>章节内容显示区</h3>
                        <p>点击目录以显示章节内容</p>
                    </div>
                    <div class="chapterEdit" :class="{ hidden: enableShowContentTip }">
                        <h3>{{ bookContent.roll_list[editingChapterIndex[0]].chapter_list[editingChapterIndex[1]].title
                            }}
                        </h3>
                        <textarea class="chapterEditArea"
                            v-model="bookContent.roll_list[editingChapterIndex[0]].chapter_list[editingChapterIndex[1]].content"></textarea>
                    </div>
                </div>
            </div>
            <div class="bookAction" :class="{ hidden: disableShow }">
                <button @click="bookContentInit">清空</button>
                <button @click="saveBookContent">保存</button>
                <button @click="uploadBook">上传</button>
            </div>
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
    top: 70px;
    z-index: 100;
    background-color: #ffffff;
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

.bookAddContent {
    max-width: 1000px;
    margin: 0 auto;
}

.chooseWay {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.fileUploadContainer {
    width: 50%;
    max-width: 400px;
}

.fileUpload {
    position: relative;
    border: 2px dashed #b8bcbf;
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    transition: background-color 0.3s ease-in-out;
}

.fileUpload:hover {
    background-color: #e2e6ea;
}

.fileInput {
    display: none;
}

.fileLabel {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.uploadIcon {
    color: #007bff;
    margin-bottom: 10px;
}

.fileUpload p {
    margin: 0;
    font-size: 16px;
    color: #6c757d;
}

.fileUpload.dragover {
    background-color: #007bff;
    color: white;
}



.btn {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #0056b3;
}

.showView {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.hidden {
    display: none;
}

.foldRoll {
    cursor: pointer;
}

.bookMenu {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    /* background-color: #f9f9f9; */
    height: 75vh;
    overflow: hidden;
    overflow-y: scroll;
}

.bookMenu h3 {
    margin-bottom: 15px;
    text-align: center;
}

.roll {
    margin-bottom: 10px;
}

.handle {
    cursor: grab;
    display: flex;
}

.handle:active {
    cursor: grabbing;
}

.action {
    cursor: pointer;
    display: inline-flex;
}

.fold:hover,
.edit:hover,
.delete:hover,
.add:hover,
.doneEdit:hover {
    color: #007bff;
}

.rollInfo,
.chapterInfo {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2px;
    padding: 2px;
    background-color: #f2f2f8;
    border: 1px solid #e5e5ec;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.rollInfo:hover,
.chapterInfo:hover {
    background-color: #e5e5ec;
}

.leftView {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: row;
}

.rightView {
    display: flex;
    align-items: center;
    gap: 5px;
}

.chapterDraggable {
    padding-left: 10px;
}

.chapterContentShow {
    flex: 2;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #ffffff;
}

.chapterContentShow h3 {
    margin-bottom: 10px;
    text-align: center;
}

.chapterContentShow p {
    color: #666;
    text-align: center;
}

.bookAction {
    direction: rtl;
    padding-top: 10px;
}

.bookAction button {
    margin-left: 10px;
    padding: 10px;
    width: 80px;
    background-color: #bbdefb;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.bookAction button:hover {
    background-color: #9ad0fc;
}

.chapterEdit textarea {
    width: 100%;
    height: 70vh;
    font-size: 20px;
}
</style>
