<script lang="ts" setup>
import { uuid } from "@/api/util/uuid";
import { addNotification } from "@/util/notify";
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { AiOutlineDelete } from "vue-icons-plus/ai";
import { BiChevronRight, BiEditAlt } from "vue-icons-plus/bi";
import { GrAdd } from "vue-icons-plus/gr";
import { Io5CloudUploadOutline } from "vue-icons-plus/io5";
import { IpHourglassNull } from "vue-icons-plus/ip";
import { MdExpandMore, MdOutlineDone, MdOutlineDragIndicator } from "vue-icons-plus/md";

type ChapterCreate = {
    id: string;
    title: string;
    content: string;
};

type RollCreate = {
    id: string;
    title: string;
    chapter_list: ChapterCreate[];
    fold: boolean;
};

type BookContentCreate = {
    roll_list: RollCreate[];
};

type Chapter = {
    title: string;
    content: string;
}

type Roll = {
    title: string;
    chapter_list: Chapter[];
}

type FileRoll = {
    roll_list: Roll[],
}

const bookContent = ref<BookContentCreate>({ roll_list: [] });

const bookContentInit = () => {
    bookContent.value = {
        roll_list: [
            { title: "正文", chapter_list: [{ title: "书籍说明", content: "", id: uuid() }], fold: true, id: uuid() },
        ],
    };
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
    let bookContent: BookContentCreate = { roll_list: [] };
    return bookContent;
};

const analyzeJsonFile = (fileContent: string) => {
    try {
        // 解析 JSON 文件内容
        let fileRoll: FileRoll = JSON.parse(fileContent);
        let bookContentCreate: BookContentCreate = { roll_list: [] };

        // 遍历卷信息
        for (let rollIndex = 0; rollIndex < fileRoll.roll_list.length; rollIndex++) {
            const rollTemp = fileRoll.roll_list[rollIndex];

            // 创建新的 RollCreate 对象
            const rollCreate: RollCreate = {
                id: uuid(), // 生成新的唯一 ID
                title: rollTemp.title,
                fold: true, // 默认折叠状态
                chapter_list: [],
            };

            // 遍历章节信息
            for (let chapterIndex = 0; chapterIndex < rollTemp.chapter_list.length; chapterIndex++) {
                const chapterTemp = rollTemp.chapter_list[chapterIndex];

                // 创建新的 ChapterCreate 对象
                const chapterCreate: ChapterCreate = {
                    id: uuid(), // 生成新的唯一 ID
                    title: chapterTemp.title,
                    content: chapterTemp.content,
                };

                // 添加章节到卷的章节列表
                rollCreate.chapter_list.push(chapterCreate);
            }

            // 添加卷到书的卷列表
            bookContentCreate.roll_list.push(rollCreate);
        }

        // 将解析后的数据赋值给 bookContent
        bookContent.value = bookContentCreate;

        addNotification({
            type: "success",
            title: "上传文件",
            content: "JSON 解析完成",
        });
    } catch (error) {
        console.error("JSON 解析失败", error);

        // 显示通知
        addNotification({
            type: "warning",
            title: "上传文件",
            content: "JSON 解析失败",
        });
    }
};


const changeChapterListShow = (rollIndex: number) => {
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
    bookContent.value.roll_list[rollIndex].chapter_list.splice(chapterIndex, 1);

}
const addChapter = (rollIndex: number, chapterIndex: number) => {
    bookContent.value.roll_list[rollIndex].chapter_list.splice(chapterIndex + 1, 0, { title: "新加章", content: "", id: uuid() });
}

const editChapterContent = (rollIndex: number, chapterIndex: number) => {

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
</script>

<template>
    <div class="container">
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
                                    <div class="action fold" @click="changeChapterListShow(rollIndex)">
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
                                        <div class="action doneEdit" @click="doneChapterTitle(rollIndex, chapterIndex)">
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
                <div class="noChapterChoose">
                    <h3>章节内容显示区</h3>
                    <p>点击目录以显示章节内容</p>
                </div>
                <div class="chapterEdit">
                    <textarea class="chapterEditArea"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1200px;
    /* margin: 0 auto; */
}

.chooseWay {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    gap: 20px;
}

/* From Uiverse.io by Cksunandh */
.fileUploadContainer {
    width: 50%;
    max-width: 500px;
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
    background-color: #f9f9f9;
    height: 80vh;
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
    align-items: center;
    /* 确保拖拽图标居中对齐 */
    justify-content: center;
}

.handle:active {
    cursor: grabbing;
}

.action {
    cursor: pointer;
    display: inline-flex;
    /* 确保每个操作图标是内联排列 */
    align-items: center;
    justify-content: center;
}

.fold:hover,
.edit:hover,
.delete:hover,
.add:hover,
.doneEdit:hover {
    color: #007bff;
}

.rollInfo {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2px;
    padding: 2px;
    background-color: #e3f2fd;
    border: 1px solid #bbdefb;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.rollInfo:hover {
    background-color: #bbdefb;
}

.chapterInfo {
    padding: 2px;
    margin-bottom: 2px;
    background-color: #fff3e0;
    border: 1px solid #ffe0b2;
    border-radius: 5px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.chapterInfo:hover {
    background-color: #ffe0b2;
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
</style>
