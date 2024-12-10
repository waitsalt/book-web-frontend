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

type ChapterInfo = {
    chapter_id: number,
    chapter_name: string,
}

type ChapterCreate = {
    chapter_id: number,
    chapter_name: string,
    chapter_content: string,
}

export type {
    Chapter,
    ChapterInfo,
    ChapterCreate
};