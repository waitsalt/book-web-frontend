import request from "@/util/request";

async function captcha_image(captcha_image_key: String) {
    let data = await request.get(`/util/captcha_image/${captcha_image_key}`);
    return data;
}

export { captcha_image };