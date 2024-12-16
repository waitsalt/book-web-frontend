type Chapter = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    uploader_id: number,
    uploader_name: String,
    roll_id: number,
    roll_name: string,
    chapter_id: number,
    chapter_name: string,
    chapter_content: string,
    create_time: string,
    update_time: string,
};

type ChapterCreate = {
    chapter_name: string,
    chapter_content: string,
}

type ChapterCreatePayload = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    roll_id: number,
    roll_name: string,
    chapter_id: number,
    chapter_name: string,
    chapter_content: string,
}

export type {
    Chapter,
    ChapterCreate,
    ChapterCreatePayload,
};