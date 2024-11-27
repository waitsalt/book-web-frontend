import HomeView from "@/view/HomeView.vue";
import SigninOrSignupView from "@/view/SigninOrSignupView.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: HomeView },
    { path: "/signin", component: SigninOrSignupView },
    { path: "/signup", component: SigninOrSignupView },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;