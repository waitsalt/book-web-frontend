type BookInfo = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    user_id: number,
    user_name: string,
    manager_id: number,
    manager_name: string,
    cover_url: string,
    source_url: string,
    book_tags: string,
    book_desc: string,
    book_class: string,
    book_status: string,
    latest_chapter_id: number,
    latest_chapter_name: string,
    create_time: string,
    update_time: string,
}

type Chapter = {
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
    create_time: string,
    update_time: string,
};

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
}

type BookSearchPayload = {
    book_name: string,
    author_name: string,
    platform: string,
};

type Book = {
    book_info: BookInfo,
    rolls: Roll[]
}

type ChapterCreate = {
    chapter_id: number,
    chapter_name: string,
    chapter_content: string,
}

type RollCreate = {
    roll_id: number,
    roll_name: string,
    chapter_list: ChapterCreate[],
}

type BookCreateInfo = {
    book_name: string,
    author_name: string,
    platform: string,
    user_id: number,
    user_name: string,
    cover_url: string,
    source_url: string,
    book_tags: string,
    book_desc: string,
    book_class: string,
    book_status: string,
}

type BookCreate = {
    book_create_info: BookCreateInfo,
    rolls_create: RollCreate[],
}

export type {
    BookInfo,
    BookSearchPayload,
    Chapter,
    Roll,
    Book,
    ChapterCreate,
    RollCreate,
    BookCreateInfo,
    BookCreate,
}