import type { AppResponse } from "@/model";
import type { UserVerifyEmailPayload } from "@/model/user";
import { request_auth } from "@/util/request";

async function postVerifyEmail(userVerifyEmailPayload: UserVerifyEmailPayload) {
    let res: AppResponse<null> = await request_auth.post(`/user/verify_email`, userVerifyEmailPayload);
    return res;
}

export { postVerifyEmail };