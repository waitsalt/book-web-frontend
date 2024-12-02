import type { AppResponse } from "@/model";
import type { BookInfo } from "@/model/book";
import request from "@/util/request";

async function getLatestUpdataBooks() {
    const res: AppResponse<BookInfo[]> = await request.get(``);
    if (res.code === 200) {
        return res.data;
    }
}

export { getLatestUpdataBooks };