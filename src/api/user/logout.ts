import { useUserStore } from "@/store/user";
import { request_refresh_auth } from "@/util/request";

async function getLogout() {
    const userStore = useUserStore();
    const res = await request_refresh_auth.get(`/user/logout`);
    userStore.$reset();
}

export { getLogout };