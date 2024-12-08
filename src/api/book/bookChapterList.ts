import type { AppResponse } from "@/model";
import type { ChapterInfo } from "@/model/chapter";
import { request } from "@/util/request";

async function getBookChapterList(bookId: number) {
    let res: AppResponse<ChapterInfo[]> = await request.get(`/api/book/${bookId}/chapter_list`);
    return res.data;
}

export { getBookChapterList }