<script lang="ts" setup>
import { addNotification } from "@/util/notify";
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { AiOutlineDelete } from "vue-icons-plus/ai";
import { BiEditAlt } from "vue-icons-plus/bi";
import { GrAdd } from "vue-icons-plus/gr";
import { MdOutlineDone, MdOutlineDragIndicator } from "vue-icons-plus/md";

type ChapterCreate = {
    title: string;
    content: string;
};

type RollCreate = {
    title: string;
    chapter_list: ChapterCreate[];
};

type BookContentCreate = {
    roll_list: RollCreate[];
};

const bookContent = ref<BookContentCreate>({
    roll_list: [
        { title: "正文", chapter_list: [{ title: "书籍说明1", content: "" }, { title: "书籍说明2", content: "" }] },
    ],
});

const bookContentInit = () => {
    bookContent.value = {
        roll_list: [
            { title: "正文", chapter_list: [{ title: "书籍说明", content: "" }] },
        ],
    };
};

const analyzeFile = (fileContent: string) => {
    let bookContent: BookContentCreate = { roll_list: [] };
    return bookContent;
};

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

const delRoll = (rollIndex: number) => {
    if (bookContent.value.roll_list.length === 1) {
        addNotification({
            title: '无法删除',
            content: '当前卷，无法删除',
        });
        return;
    }
    bookContent.value.roll_list.splice(rollIndex, 1);
}
const addRoll = (rollIndex: number) => {
    bookContent.value.roll_list.splice(rollIndex + 1, 0, { title: "新加卷", chapter_list: [] });
}
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
    bookContent.value.roll_list[rollIndex].chapter_list.splice(chapterIndex + 1, 0, { title: "新加章", content: "" });
}

const disableShow = ref(true);
const disableDrag = ref(false);
</script>

<template>
    <div class="container">
        <!-- 选择方式 -->
        <div class="chooseWay">
            <button @click="disableShow = false" class="btn">新建书籍</button>
            <button @click="disableShow = false" class="btn">上传文件</button>
        </div>

        <!-- 显示视图 -->
        <div class="showView" :class="{ hidden: disableShow }">
            <div class="bookMenu">
                <h3>目录</h3>
                <VueDraggable ref="book" v-model="bookContent.roll_list" handle=".handle" :disabled="disableDrag">
                    <div v-for="(roll, rollIndex) in bookContent.roll_list" class="roll">
                        <div class="rollInfo">
                            <div class="leftView">
                                <div class="handle">
                                    <MdOutlineDragIndicator />
                                </div>
                                <div v-if="rollIndex !== editRollIndex">
                                    <p>{{ roll.title }}</p>
                                </div>
                                <div v-else>
                                    <input type="text" v-model="editTitleText">
                                </div>
                            </div>
                            <div class="rightView">
                                <div v-if="rollIndex !== editRollIndex">
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
                        <VueDraggable group="chapterList" ref="roll" v-model="roll.chapter_list"
                            class="chapterDraggable" handle=".handle" :disabled="disableDrag">
                            <div v-for="(chapter, chapterIndex) in roll.chapter_list" class="chapterInfo">
                                <div class="leftView">
                                    <div class="handle">
                                        <MdOutlineDragIndicator />
                                    </div>
                                    <div
                                        v-if="rollIndex !== editChapterIndex[0] || chapterIndex !== editChapterIndex[1]">
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
                <h3>章节内容显示区</h3>
                <p>点击目录以显示章节内容</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.chooseWay {
    text-align: center;
    margin-bottom: 20px;
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

.rollInfo {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    padding: 10px;
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
    padding: 8px;
    margin-bottom: 5px;
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
