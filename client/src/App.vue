<script setup>
import { RouterView, useRoute } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './views/Header.vue';

const route = useRoute();

// Check if the route is /login
const isLoginPage = route.path === '/login';
</script>

<template>
    <div>
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped></style>
