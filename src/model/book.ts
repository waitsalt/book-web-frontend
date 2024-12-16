import type { Roll, RollCreate } from "./roll";

type Book = {
    book_info: BookInfo,
    rolls: Roll[]
}

type BookInfo = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    uploader_id: number,
    uploader_name: string,
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
    collect: number,
    recommend: number,
    read_time: number,
    create_time: string,
    update_time: string,
}

type BookSearchPayload = {
    book_name: string,
    author_name: string,
    platform: string,
};

type BookVerifyPayload = {
    book_name: string,
    author_name: string,
    platform: string,
};

type BookCreateInfoPayload = {
    book_name: string,
    author_name: string,
    platform: string,
    uploader_id: number,
    uploader_name: string,
    cover_url: string,
    source_url: string,
    book_tags: string,
    book_desc: string,
    book_class: string,
    book_status: string,
}

type BookCreatePayload = {
    book_create_info_payload: BookCreateInfoPayload,
    roll_create_list: RollCreate[],
}

export type {
    Book,
    BookInfo,
    BookCreatePayload,
    BookCreateInfoPayload,
    BookSearchPayload,
    BookVerifyPayload,
}