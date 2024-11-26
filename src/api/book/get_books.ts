import request from "@/util/request";
import type { AppResponse } from "@/util/types";

async function get_books() {
    let res: AppResponse<string> = await request.get("");
    if (res.code != 200) {

    }
}