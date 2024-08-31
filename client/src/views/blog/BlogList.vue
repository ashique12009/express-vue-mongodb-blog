<template>
    <div class="container py-5 min-vh-100">
        <h1>Blog List <button class="btn btn-primary" @click="addBlog">Add Blog</button></h1>
        <div v-if="isLoading" class="text-center mt-3">
            <img src="@/assets/spinner-5.gif" />
        </div>

        <div>Total Posts: {{ totalPosts }}</div>
        <!-- Blog Posts Table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Author</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(post, index) in posts" :key="post._id">
                    <td>{{ post.title }}</td>
                    <td v-html="excerpt(post.description)"></td>
                    <td>{{ post.author }}</td>
                    <td>{{ new Date(post.date).toLocaleDateString() }}</td>
                    <td>
                        <button class="btn btn-sm btn-secondary me-2" @click="viewBlog(post._id)">View</button>
                        <button class="btn btn-sm btn-primary me-2" @click="editPost(post._id)">Edit</button>
                        <button class="btn btn-sm btn-danger" @click="deletePost(post._id)">Delete</button>
                    </td> 
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <nav>
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="fetchPosts(currentPage - 1)">Previous</button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <button class="page-link" @click="fetchPosts(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="fetchPosts(currentPage + 1)">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/services/axios'
import { useRouter } from 'vue-router'

// Reactive state variables
const posts = ref([])
const totalPosts = ref(0)
const totalPages = ref(0)
const currentPage = ref(1)
const limit = ref(15)
const isLoading = ref(false)

const router = useRouter()

// Fetch posts from the api
const fetchPosts = async (page = 1) => {
    try {
        isLoading.value = true
        const response = await axios.get('/posts', {
            params: {
                page: page,
                limit: limit.value
            }
        })

        posts.value = response.data.posts
        totalPosts.value = response.data.totalPosts
        totalPages.value = Math.ceil(totalPosts.value / limit.value)
        currentPage.value = page
    }
    catch (error) {
        console.log('Fetching ERROR: ' + error)
    }
    finally {
        isLoading.value = false
    }
}

const addBlog = () => {
    router.push('/blog-create')
}

// Fetch posts when the component is mounted
onMounted(() => {
    fetchPosts();
});

const excerpt = (description) => {
    if (description.length > 50) {
        return description.substring(0, 50) + '...'
    }
    return description
}

const viewBlog = (mongoId) => {
    router.push('/blog-view/' + mongoId)
}

const deletePost = async (mongoId) => {
    try {
        isLoading.value = true
        const response = await axios.delete(`/post/${mongoId}`)

        fetchPosts();
    } 
    catch (error) {
        console.log('Deleting ERROR: ' + error)
    }
    finally {
        isLoading.value = false
    }
}

const editPost = (mongoId) => {
    router.push('/blog-edit/' + mongoId)
}

</script>

<style lang="scss" scoped></style>