import request from "@/util/request";
import type { AppResponse } from "@/util/types";

async function captcha_image(captcha_image_key: String) {
    let data: AppResponse<string> = await request.get(`/util/captcha_image/${captcha_image_key}`);
    return data;
}

export { captcha_image };