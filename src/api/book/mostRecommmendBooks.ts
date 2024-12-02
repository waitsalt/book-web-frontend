import request from "@/util/request";
import type { AppResponse } from "@/model";
import type { BookInfo } from "@/model/book";

async function getMostRecommmendBooks() {
    const res: AppResponse<BookInfo[]> = await request.get(``);
    if (res.code === 200) {
        return res.data;
    }
}

export { getMostRecommmendBooks };