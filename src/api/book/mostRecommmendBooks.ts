import request from "@/util/request";
import type { AppResponse, Book } from "@/util/types";

async function getMostRecommmendBooks() {
    const res: AppResponse<Book[]> = await request.get(``);
    if (res.code === 200) {
        return res.data;
    }
}

export { getMostRecommmendBooks };