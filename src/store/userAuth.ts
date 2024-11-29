
import type { UserAuth } from "@/model/user";
import { defineStore } from "pinia";


type State = {
    userAuth: UserAuth,
}

const useUserAuthStore = defineStore("userAuth", {
    state: (): State => ({
        userAuth: {
            access_token: '',
            refresh_token: '',
        }
    }),
    actions: {
        updateUserAuth(userAuth: UserAuth) {
            this.userAuth = userAuth;
        }
    },
    persist: true,
})

export { useUserAuthStore };