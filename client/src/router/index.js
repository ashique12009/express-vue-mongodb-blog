import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/auth/AuthPage.vue'),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('../views/auth/LoginPage.vue')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('../views/auth/RegisterPage.vue')
                }
            ]
        }
    ]
});

export default router