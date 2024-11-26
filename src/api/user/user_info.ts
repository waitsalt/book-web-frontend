import request from "@/util/request";
import type { AppResponse, UserInfo } from "@/util/types";

async function get_user_info() {
    let res: AppResponse<UserInfo> = await request.get("/user/user_info");
    return res;
}

export { get_user_info }