import type { AppResponse } from "@/model";
import type { UserSigninPayload, UserAuth } from "@/model/user";
import request from "@/util/request";



async function postSignin(signinUserPayload: UserSigninPayload) {
    const res: AppResponse<UserAuth> = await request.post('/user/signin', signinUserPayload);
    return res.data;
}

export { postSignin };