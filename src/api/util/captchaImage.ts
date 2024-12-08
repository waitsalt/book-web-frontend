import { request } from "@/util/request";
import type { AppResponse } from "@/model";

async function getCaptchaImage(captchaImageKey: string) {
    const res: AppResponse<string> = await request.get(`/util/captcha_image/${captchaImageKey}`);
    if (res.code === 200) {
        return res.data;
    } else {
        console.log(res.message);
        alert(res.message);
    }
}

export { getCaptchaImage };