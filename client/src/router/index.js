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
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/blog-list',
            name: 'blog-list',
            component: () => import('../views/blog/BlogList.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('../views/NotFoundPage.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // Initialize the auth state from localStorage
    authStore.initializeAuthState()

    // If the user is trying to access a protected route, fetch session data
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!authStore.isAuthenticated) {
            await authStore.fetchSessionData()
        }

        if (authStore.isAuthenticated) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router