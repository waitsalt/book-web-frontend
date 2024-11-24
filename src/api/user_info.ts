import request from "@/util/request";

async function get_user_info() {
    let res = await request.get("/user/user_info");
    return res;
}

export { get_user_info }