<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './views/Header.vue';

</script>

<template>
    <div>
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped></style>
