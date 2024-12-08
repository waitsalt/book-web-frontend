import type { AppResponse } from "@/model";
import { request_refresh_auth } from "@/util/request";

async function getRefreshAccessToken() {
    let res: AppResponse<string> = await request_refresh_auth.get(`/user/refresh_access_token`);
    console.log("refresh access token");
    return res.data;
}

export { getRefreshAccessToken };