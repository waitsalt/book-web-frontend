import type { BookSearchPayload } from "@/model/book";
import { request_util } from "@/util/request";


async function postSearchBook(bookSearchPayload: BookSearchPayload) {
    let res = await request_util.get(`https://www.qidian.com/so/${bookSearchPayload.book_name}.html`);
    console.log(res);
}

export { postSearchBook };