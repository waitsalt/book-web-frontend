import { defineStore } from "pinia";


const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        userInfo: {
            user_id: Number,
            user_name: String,
            user_email: String,
            avatar_url: String, // 头像 url
            level: Number,         // 0
            status: Number,        // 0. 正常 1. 被封禁 2. 删除
            identity: Number,      // 0. 普通 1. 管理员 2. 超级管理员
            create_time: String,
            update_time: String,
        }
    })
})