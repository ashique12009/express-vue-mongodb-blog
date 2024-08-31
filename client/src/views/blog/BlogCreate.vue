<template>
    <div class="container py-5 min-vh-100">
        <h1>Add Blog</h1>
        <form>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="title">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Author</label>
                <input type="text" class="form-control" id="exampleFormControlInput2" v-model="author">
            </div>

            <button type="submit" class="btn btn-primary" @click.prevent="submitBlog">Submit</button>
        </form>
        <div v-if="isLoading" class="text-center mt-3">
            <img src="@/assets/spinner-5.gif" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/services/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const description = ref('')
const author = ref('')
const isLoading = ref(false)

const submitBlog = async () => {
    try {
        isLoading.value = true
        const response = await axios.post('/posts', {
            title: title.value,
            description: description.value,
            author: author.value
        })

        router.push('/blog-list')
    } 
    catch (error) {
        console.log('ERROR blog submission: ' + error)    
    }
    finally {
        isLoading.value = false
    }
}
</script>

<style lang="scss" scoped></style>