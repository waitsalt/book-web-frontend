import type { UserAuth } from "@/util/types";
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

    },
    persist: true,
})

export { useUserAuthStore };