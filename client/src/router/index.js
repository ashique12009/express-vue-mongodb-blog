import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

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
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterPage.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/admin/DashboardPage.vue'),
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore()
                console.log('authStore.isAuthenticated '+authStore.isAuthenticated)
                if (authStore.isAuthenticated) {
                    next()
                } 
                else {
                    next('/login')
                }
            }
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('../views/blog/BlogItem.vue'),
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore()
                console.log('authStore.isAuthenticated '+authStore.isAuthenticated)
                if (authStore.isAuthenticated) {
                    next()
                } 
                else {
                    next('/login')
                }
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('../views/NotFoundPage.vue')
        }
    ]
});

export default router