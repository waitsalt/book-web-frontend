import type { AppResponse } from "@/model";
import type { ChapterInfo } from "@/model/chapter";
import { request } from "@/util/request";

async function getBookChapterList(bookId: number) {
    let res: AppResponse<[number, string][]> = await request.get(`/book/${bookId}/chapter_list`);
    return res;
}

export { getBookChapterList }