import AboutView from "@/view/AboutView.vue";
import BookView from "@/view/BookView.vue";
import ChapterView from "@/view/ChapterView.vue";
import HomeView from "@/view/HomeView.vue";
import SearchView from "@/view/SearchView.vue";
import UploadView from "@/view/UploadView.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/search', component: SearchView },
    { path: "/:book_id", component: BookView },
    { path: "/:book_id/:chapter_id", component: ChapterView },
    { path: "/upload", component: UploadView }
]

const Router = createRouter({
    history: createWebHistory(),
    routes
})

export default Router