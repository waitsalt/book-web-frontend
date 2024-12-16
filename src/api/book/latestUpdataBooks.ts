import type { AppResponse } from "@/model";
import type { BookInfo } from "@/model/book";
import { request } from "@/util/request";

async function getLatestUpdataBooks() {
    const res: AppResponse<BookInfo[]> = await request.get(`/book/latest_update`);
    return res;
}

export { getLatestUpdataBooks };