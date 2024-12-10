import type { AppResponse } from "@/model";
import type { UserUpdatePasswordPayload } from "@/model/user";
import { request_auth } from "@/util/request";

async function postUpdatePassword(userUpdatePasswordPayload: UserUpdatePasswordPayload) {
    let res: AppResponse<null> = await request_auth.post(`/user/update_password`, userUpdatePasswordPayload);
    return res;
}

export { postUpdatePassword };