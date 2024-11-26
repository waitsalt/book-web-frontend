import request from "@/util/request";
import type { AppResponse } from "@/util/types";

async function captcha_email(user_email: String) {
    let data: AppResponse<null> = await request.get(`/util/captcha_email/${user_email}`);
    return data;
}

export { captcha_email };