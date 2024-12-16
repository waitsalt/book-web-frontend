import type { Chapter, ChapterCreate } from "./chapter";

type Roll = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    roll_id: number,
    roll_name: string,
    chapter_list: Chapter[],
    create_time: string,
    update_time: string,
};

type RollCreate = {
    roll_name: string,
    chapter_create_list: ChapterCreate[],
}

type RollCreatePayload = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    roll_id: number,
    roll_name: string,
    chapters_create: ChapterCreate[],
}

export type {
    Roll,
    RollCreate,
    RollCreatePayload,
};