<template>
    <div class="container py-5">
        <h1 v-if="userEmail">Dashboard, welcome {{ userEmail }}</h1>
        <h1 v-else>Loading...</h1>
    </div>
</template>

<script setup>
import axios from '@/services/axios'
import { onMounted, ref } from 'vue'

const userEmail = ref('')

onMounted(async () => {
    try {
        const response = await axios.get('/get-session-data')

        if (response.data.success) {
            userEmail.value = response.data.user
        }
        else {
            console.log('No active session found!')
        }
    } 
    catch (error) {
        console.log('ERROR fetching session data: ' + error)    
    }
})

</script>

<style lang="scss" scoped>

</style>