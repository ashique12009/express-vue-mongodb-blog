<template>
    <main class="form-signin w-100 m-auto mt-5 min-vh-100">
        <form @submit.prevent="loginSubmit">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>

            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
                <label for="floatingPassword">Password</label>
            </div>

            <div class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit" :disabled="isLoading">Sign in</button>
            <p class="mt-1 mb-1 text-body-secondary">© 2024</p>
            <div v-if="isLoading" class="text-center mt-3">
                <img src="@/assets/spinner-5.gif" />
            </div>
        </form>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth' // Import pinia store
import axios from '@/services/axios'

// Define reactive variables
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Define pinia store
const authStore = useAuthStore()

// Define router
const router = useRouter()

// Define submit function
const loginSubmit = async () => {
    try {
        errorMessage.value = ''
        isLoading.value = true
        const response = await axios.post('/login', {
            email: email.value,
            password: password.value
        })

        if (response.data.user) {
            // Call fetch user session data in store
            authStore.fetchSessionData()

            router.push('/dashboard')
        }
        else {
            errorMessage.value = response.data.message || 'Login failed. Please check your credentials!'
        }
    } 
    catch (error) {
        console.log('ERROR: ' + error)
    }
    finally {
        isLoading.value = false
    }
}
</script>

<style lang="scss" scoped></style>