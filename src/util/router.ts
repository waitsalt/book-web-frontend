import TempComponent from "@/component/user/TempComponent.vue";
import HomeView from "@/view/HomeView.vue";
import SigninOrSignupView from "@/view/SigninOrSignupView.vue";
import UserView from "@/view/UserView.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: HomeView },
    { path: "/signin", component: SigninOrSignupView },
    { path: "/signup", component: SigninOrSignupView },
    { path: '/user', component: UserView },
    { path: '/user/setting', component: UserView },
    { path: '/user/collect', component: UserView },
    { path: '/user/history', component: UserView },
    { path: '/user/manage', component: UserView },
    { path: '/user/upload', component: UserView },
    { path: '/temp', component: TempComponent }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;