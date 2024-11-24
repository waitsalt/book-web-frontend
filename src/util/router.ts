import AboutView from "@/view/AboutView.vue";
import HomeView from "@/view/HomeView.vue";
import SearchView from "@/view/SearchView.vue";
import SiginOrSignupView from "@/view/SiginOrSignupView.vue";
import UserView from "@/view/UserView.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/search', component: SearchView },
    { path: "/signin", component: SiginOrSignupView },
    { path: "/signup", component: SiginOrSignupView },
    { path: "/user", component: UserView }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;