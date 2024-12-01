<script lang="ts" setup>
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { MdDragIndicator } from 'vue-icons-plus/md';
import { FaEdit, FaTrashAlt, FaPlus, FaCheck } from 'vue-icons-plus/fa';

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
};

const chapterRemove = (rollIndex: number, chapterIndex: number) => {
    rolls.value[rollIndex].chapters.splice(chapterIndex, 1);
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
</script>

<template>
    <div class="bookContent">
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
                                <div class="chapterInfo">
                                    <div class="icon handle">
                                        <MdDragIndicator />
                                    </div>
                                    <div class="chapterTitle">
                                        <span>{{ `第${chapter.id + 1}章 ` }}</span>
                                        <input v-if="chapter.isEditing" v-model="chapter.title"
                                            @blur="editChapterTitle(rollIndex, chapterIndex, chapter.title)"
                                            class="editInput" autofocus />

                                        <span v-else @dblclick="chapter.isEditing = true">{{ chapter.title }}</span>
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
        <div class="chapterContent">
            <div class="chapterContainShow">

            </div>
            <div class="action">
                <button class="save"></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bookMenu {
    padding: 24px;
    background-color: #f8f9fc;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    max-width: 850px;
    margin: 30px auto;
}

button.addRoll {
    padding: 10px 20px;
    margin-bottom: 25px;
    background-color: #4c9f70;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.addRoll:hover {
    background-color: #388e56;
}

.menu {
    display: flex;
    flex-direction: column;
}

.roll {
    border: 1px solid #ddd;
    border-radius: 12px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.roll:hover {
    background-color: #f1f1f1;
    transform: translateY(-8px);
}

.rollInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.rollInfo .icon {
    margin-right: 12px;
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
    gap: 12px;
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
    margin-top: 15px;
    padding-left: 24px;
}

.chapter {
    border: 1px solid #ddd;
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 10px;
    background-color: #fff;
    cursor: default;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.chapter:hover {
    background-color: #f1f1f1;
    transform: translateX(5px);
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

.hidden {
    display: none;
}
</style>
