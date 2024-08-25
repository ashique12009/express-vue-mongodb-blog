<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

const route = useRoute();

// Check if the route is /login
const isLoginPage = route.path === '/login';
</script>

<template>
    <div>
        <Navigation />
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped></style>
