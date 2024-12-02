import type { AppResponse } from "@/model";
import type { Book, BookInfo } from "@/model/book";
import request from "@/util/request";

async function getMostCollectBooks() {
    const res: AppResponse<BookInfo[]> = await request.get(``);
    if (res.code === 200) {
        return res.data;
    }
}

export { getMostCollectBooks };