import type { AppResponse } from "@/model";
import type { UserSigninPayload, UserAuth, UserClaims } from "@/model/user";
import { useUserStore } from "@/store/user";
import { request } from "@/util/request";
import { jwtDecode } from "jwt-decode";



async function postSignin(signinUserPayload: UserSigninPayload) {
    const res: AppResponse<UserAuth> = await request.post('/user/signin', signinUserPayload);
    const userStore = useUserStore();
    userStore.userAuth = res.data;
    const userClaims: UserClaims = jwtDecode(res.data.access_token);
    userStore.userPublic = userClaims.user_public;
    return res.data;
}

export { postSignin };