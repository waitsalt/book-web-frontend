import type { BookInfo } from "@/model/book";
import type { Roll } from "@/model/roll";
import { defineStore } from "pinia";

type State = {
    book_info: BookInfo,
    rolls: Roll[],
}

const useBookStore = defineStore('book', {
    state: (): State => ({
        book_info: {
            book_id: 0,
            book_name: '',
            author_id: 0,
            author_name: '',
            platform: '',
            user_id: 0,
            user_name: '',
            manager_id: 0,
            manager_name: '',
            cover_url: '',
            source_url: '',
            book_tags: '',
            book_desc: '',
            book_class: '',
            book_status: '',
            latest_chapter_id: 0,
            latest_chapter_name: '',
            collect: 0,
            recommend: 0,
            create_time: '',
            update_time: '',
        },
        rolls: [],
    })
})