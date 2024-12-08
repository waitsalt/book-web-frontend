import type { AppResponse } from "@/model";
import type { BookInfo } from "@/model/book";
import { request } from "@/util/request";

async function getBookInfo(bookId: number) {
    let res: AppResponse<BookInfo> = await request.get(`/api/book/${bookId}`);
    return res.data;
}

export { getBookInfo }