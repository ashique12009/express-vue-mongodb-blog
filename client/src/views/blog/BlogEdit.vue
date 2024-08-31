<template>
    <div class="container py-5 min-vh-100">
        <h1>Blog Edit</h1>
        <div>
            <h4>Blog Title</h4>
            <div class="mb-3">
                <input type="text" class="form-control" id="titleInput" v-model="post.title">
            </div>
            
            <h4>Blog Description</h4>
            <div class="mb-3">
                <ckeditor v-model="post.description" :editor="ClassicEditor" :config="editorConfig" />
            </div>

            <h4>Blog Author</h4>
            <div class="mb-3">
                <input type="text" class="form-control" id="authorInput" v-model="post.author">
            </div>

            <button type="submit" class="btn btn-primary" @click.prevent="editPost">Update</button>
        </div>

        <div v-if="isLoading" class="text-center mt-3">
            <img src="@/assets/spinner-5.gif" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/services/axios'
import { useRouter } from 'vue-router'
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'

// Reactive state variables
const post = ref({
    title: '',
    description: '',
    author: ''
})
const isLoading = ref(false)

// Define router
const router = useRouter()

const editorConfig = ref({
    plugins: [ Bold, Essentials, Italic, Mention, Paragraph, Undo ],
    toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ],
})

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

const editPost = async () => {
    try {
        isLoading.value = true

        const id = router.currentRoute.value.params.id
        const response = await axios.put(`/post/${id}`, {
            title: post.value.title,
            description: post.value.description,
            author: post.value.author
        })

        router.push('/blog-list')
    } 
    catch (error) {
        console.log('Edit error', error)
    }
    finally {
        isLoading.value = false
    }
}
</script>

<style lang="scss" scoped>
</style>