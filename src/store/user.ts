import type { Collect } from "@/model/collect";
import type { History } from "@/model/history";
import type { UserAuth, UserPublic } from "@/model/user";
import { defineStore } from "pinia";

type State = {
    userPublic: UserPublic,
    userAuth: UserAuth,
    collects: Collect[],
    historys: History[],
}

const useUserStore = defineStore('user', {
    state: (): State => ({
        userPublic: {
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
        userAuth: {
            access_token: '',
            refresh_token: '',
        },
        collects: [],
        historys: [],
    }),
    actions: {
        updateUserPublic(userPublic: UserPublic) {
            this.userPublic = userPublic;
        },
        updateUserAuth(userAuth: UserAuth) {
            this.userAuth = userAuth;
        },
        addCollect(collect: Collect) {
            this.collects.push(collect);
        },
        addHistory(history: History) {
            this.historys.push(history);
        }
    },
    persist: true,
})

export { useUserStore };