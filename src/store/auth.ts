import { defineStore } from "pinia";


const useUserAuthStore = defineStore("userAuth", {
    state: () => ({
        userAuth: {
            token: String,
        }
    })
})