import type { AppResponse } from "@/model";
import type { BookVerifyPayload } from "@/model/book";
import { request } from "@/util/request";

async function postVerifyBook(BookVerifyPayload: BookVerifyPayload) {
    let res: AppResponse<null> = await request.post(`/book/verify_book`, BookVerifyPayload);
    return res;
}

export { postVerifyBook };