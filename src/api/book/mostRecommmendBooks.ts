import { request } from "@/util/request";
import type { AppResponse } from "@/model";
import type { BookInfo } from "@/model/book";

async function getMostRecommmendBooks() {
    const res: AppResponse<BookInfo[]> = await request.get(``);
    if (res.code === 200) {
        return res.data;
    }
    let bookInfos: BookInfo[] = [
        {
            book_id: 1,
            book_name: 'book1',
            author_id: 1,
            author_name: 'book1',
            platform: 'book1',
            uploader_id: 1,
            uploader_name: 'book1',
            manager_id: 1,
            manager_name: 'book1',
            cover_url: 'book1',
            source_url: 'book1',
            book_tags: 'book1',
            book_desc: 'book1',
            book_class: 'book1',
            book_status: 'book1',
            latest_chapter_id: 1,
            latest_chapter_name: 'book1',
            collect: 0,
            recommend: 0,
            read_time: 0,
            create_time: 'book1',
            update_time: 'book1',
        }
    ];
    return bookInfos;
}

export { getMostRecommmendBooks };