import type { AppResponse } from "@/model";
import type { UserUpdateAvatarUrlPayload } from "@/model/user";
import { request_auth } from "@/util/request";

async function postUpdateAvatarUrl(userUpdateAvatarUrlPayload: UserUpdateAvatarUrlPayload) {
    let res = await request_auth.post(`/user/update_avatar_url`, userUpdateAvatarUrlPayload);
    return res.data;
}

export { postUpdateAvatarUrl };