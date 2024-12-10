import type { AppResponse } from "@/model";
import type { UserUpdateEmailPayload } from "@/model/user";
import { request_auth } from "@/util/request";

async function postUpdateEmail(userUpdateEmailPayload: UserUpdateEmailPayload) {
    let res: AppResponse<null> = await request_auth.post(`/user/update_email`, userUpdateEmailPayload);
    return res;
}

export { postUpdateEmail };