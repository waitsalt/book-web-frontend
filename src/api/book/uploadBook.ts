import type { AppResponse } from "@/model";
import type { BookCreatePayload } from "@/model/book";
import { request_auth } from "@/util/request";


async function postUploadBook(bookCreatePayload: BookCreatePayload) {
    let res: AppResponse<null> = await request_auth.post('/book', bookCreatePayload);
    return res;
}

export {
    postUploadBook,
}