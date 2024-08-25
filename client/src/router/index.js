import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomePage.vue'),         
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginPage.vue'),
        }
    ]
});

export default router