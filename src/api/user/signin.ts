import request from "@/util/request";
import type { AppResponse } from "@/util/types";

async function signin(user_name: String, user_password: String, captcha_image: String, captcha_image_key: String) {
    let res: AppResponse<String> = await request.post("/user/signin", {
        "user_name": user_name,
        "user_password": user_password,
        "captcha_image": captcha_image,
        "captcha_image_key": captcha_image_key
    });
    let token = `Bearer ${res.data}`;
    request.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
    return res;
}

export { signin };