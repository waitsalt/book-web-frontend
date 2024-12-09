import type { AppResponse } from "@/model";
import { request } from "@/util/request";

async function getCaptchaEmail(userEmail: string) {
    let res: AppResponse<null> = await request.get(`/util/captcha_email/${userEmail}`);
    return res.data;
}

export { getCaptchaEmail };