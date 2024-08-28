<template>
    <div class="container py-5 min-vh-100">
        <h1>Blog List</h1>
        <!-- Blog Posts Table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Author</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(post, index) in posts" :key="post._id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ post.title }}</td>
                    <td>{{ post.description }}</td>
                    <td>{{ post.author }}</td>
                    <td>{{ new Date(post.date).toLocaleDateString() }}</td>
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

// Reactive state variables
const posts = ref([])
const totalPosts = ref(0)
const totalPages = ref(0)
const currentPage = ref(1)
const limit = ref(2)

// Fetch posts from the api
const fetchPosts = async (page = 1) => {
    try {
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
}

// Fetch posts when the component is mounted
onMounted(() => {
    fetchPosts();
});

</script>

<style lang="scss" scoped></style>