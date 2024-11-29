type Book = {
    book_id: number,
    book_name: string,
    author_id: number,
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
    latest_chapter_id: number,
    latest_chapter_name: string,
    create_time: string,
    update_time: string,
}

type BookSearchPayload = {
    book_name: string,
    author_name: string,
    platform: string,
};

export {
    type Book,
    type BookSearchPayload,
}