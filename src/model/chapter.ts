type Chapter = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    uploader_id: number,
    uploader_name: string,
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


function ChapterNew(): Chapter {
    return {
        book_id: -1,
        book_name: '',
        author_id: -1,
        author_name: '',
        platform: '',
        uploader_id: -1,
        uploader_name: '',
        roll_id: -1,
        roll_name: '',
        chapter_id: -1,
        chapter_name: '',
        chapter_content: '',
        create_time: '',
        update_time: '',
    }
}

export type {
    Chapter,
    ChapterInfo,
    ChapterCreate,
    ChapterCreatePayload,
};

export {
    ChapterNew,
}