import type { UserAuth } from "@/util/types";
import { defineStore } from "pinia";


type State = {
    userAuth: UserAuth,
}

const useUserAuthStore = defineStore("userAuth", {
    state: () => ({
        userAuth: {
            token: '',
        }
    }),
    actions: {

    },
    persist: true,
})

export { useUserAuthStore };