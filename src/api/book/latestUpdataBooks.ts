import request from "@/util/request";
import type { AppResponse, Book } from "@/util/types";

async function getLatestUpdataBooks() {
    const res: AppResponse<Book[]> = await request.get(``);
    if (res.code === 200) {
        return res.data;
    }
}

export { getLatestUpdataBooks };