import { createWebHistory, createRouter } from "vue-router";
import NotFound from "./pages/NotFound.vue";
import Feedback from "./pages/MainFeedback.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/feedback/:kodeagen/:token",
            name: "Feedback",
            component: Feedback,
        },
        {
            path: "/:notFound(.*)",
            name: "NotFound",
            component: NotFound,
        },
    ]
});

export default router;