import { defineStore } from "pinia";
import type { UserInfo } from "@/util/types";

type State = {
    userInfo: UserInfo,
}

const useUserInfoStore = defineStore('userInfo', {
    state: (): State => ({
        userInfo: {
            user_id: 0,
            user_name: '',
            user_email: '',
            avatar_url: '', // 头像 url
            level: 0,         // 0
            status: 0,        // 0. 正常 1. 被封禁 2. 删除
            identity: 0,      // 0. 普通 1. 管理员 2. 超级管理员
            create_time: '',
            update_time: '',
        },
    })
})

export { useUserInfoStore };