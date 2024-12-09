import type { AppResponse } from "@/model";
import type { UserSignupPayload } from "@/model/user";
import { request } from "@/util/request";

async function postSignup(userSignupPayload: UserSignupPayload) {
    let res: AppResponse<null> = await request.post(`/user/signup`, userSignupPayload);
    return res.data;
}

export { postSignup };