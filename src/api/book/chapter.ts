import type { AppResponse } from "@/model";
import type { Chapter } from "@/model/chapter";
import { request } from "@/util/request";


async function getChapter(book_id: number, chapter_id: number) {
    let res: AppResponse<Chapter> = await request.get(`/book/${book_id}/${chapter_id}`);
    return res;
}

export {
    getChapter,
}