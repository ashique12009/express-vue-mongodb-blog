<template>
    <div class="container py-5 min-vh-100">
        <h1>Blog View</h1>
        <div v-if="isLoading" class="text-center mt-3">
            <img src="@/assets/spinner-5.gif" />
        </div>
        <div>
            <h4>Blog Title</h4>
            {{ post.title }}
            <h4>Blog Description</h4>
            <div v-html="post.description"></div>
            <h4>Blog Author</h4>
            {{ post.author }}
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/services/axios'
import { useRouter } from 'vue-router'

// Reactive state variables
const post = ref({})
const isLoading = ref(false)

// Define router
const router = useRouter()  

const fetchPost = async () => {
    try {
        isLoading.value = true
        const id = router.currentRoute.value.params.id

        const response = await axios.get(`/post/${id}`)

        post.value = response.data.post
    } 
    catch (error) {
        console.log('Fetching error',error)    
    }
    finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchPost()
})
</script>

<style lang="scss" scoped>
</style>