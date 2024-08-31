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
            path: '/blog-create',
            name: 'blog-create',
            component: () => import('../views/blog/BlogCreate.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/blog-view/:id',
            name: 'blog-view',
            component: () => import('../views/blog/BlogView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/blog-edit/:id',
            name: 'blog-edit',
            component: () => import('../views/blog/BlogEdit.vue'),
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

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()

    // Initialize the auth state from localStorage
    authStore.initializeAuthState()

    // If the user is trying to access a protected route, fetch session data
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!authStore.isAuthenticated) {
            await authStore.fetchSessionData()
        }

        if (authStore.isAuthenticated) {
            return true // Allow navigation
        } else {
            return { path: '/login' }
        }
    } else {
        return true // Allow navigation for non-protected routes
    }
})

export default router