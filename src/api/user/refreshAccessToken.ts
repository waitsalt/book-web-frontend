import type { AppResponse } from "@/model";
import { useUserStore } from "@/store/user";
import { request_refresh_auth } from "@/util/request";

async function getRefreshAccessToken() {
    let res: AppResponse<string> = await request_refresh_auth.get(`/user/refresh_access_token`);
    const userStore = useUserStore();
    userStore.userAuth.access_token = res.data;
    return res.data;
}

export { getRefreshAccessToken };