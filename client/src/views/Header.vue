<template>
    <section>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/">MEVN Blog</RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><RouterLink class="nav-link" to="/">Home</RouterLink></li>
                        <li class="nav-item"><RouterLink class="nav-link" to="/blog" v-if="authStore.isAuthenticated">Blog</RouterLink></li>
                        <li class="nav-item"><RouterLink class="nav-link" to="/login" v-if="!authStore.isAuthenticated">Login</RouterLink></li>
                        <li class="nav-item"><a class="nav-link" href="#" @click="logout" v-if="authStore.isAuthenticated">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/store/auth' // Import the auth store
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
    authStore.logout()
    router.push('/login')
}

</script>

<style lang="scss" scoped></style>