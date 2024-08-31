<template>
    <div class="container py-5 min-vh-100">
        <h1 v-if="userEmail">Dashboard, welcome {{ userEmail }}</h1>
        <h1 v-else>Loading...</h1>
        <div class="row mt-3">
            <div class="col-xl-3 col-md-6">
                <div class="card bg-primary text-white mb-4">
                    <div class="card-body">Total Posts</div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <span class="text-white">{{ totalPostsNumber }}</span>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-warning text-white mb-4">
                    <div class="card-body">Total User</div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <span class="text-white">{{ totalUsersNumber }}</span>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body">Today's Post</div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <span class="text-white">{{ totalPostNumberOfToday }}</span>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-danger text-white mb-4">
                    <div class="card-body">Danger Card</div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from '@/services/axios'
import { onMounted, ref } from 'vue'

const userEmail = ref('')
const totalPostsNumber = ref(0)
const totalUsersNumber = ref(0)
const totalPostNumberOfToday = ref(0)

const getTotalPostsNumner = async () => {
    try {
        const response = await axios.get('/get-total-post-number')

        totalPostsNumber.value = response.data.totalPostNumber || 0
    }
    catch (error) {
        console.log('ERROR fetching dashboard data: ' + error)
    }
}

const getTotalUsersNumner = async () => {
    try {
        const response = await axios.get('/get-total-user-number')

        totalUsersNumber.value = response.data.totalUserNumber || 0
    }
    catch (error) {
        console.log('ERROR fetching dashboard data: ' + error)
    }
}

const getTotalPostNumberOfToday = async () => {
    try {
        const response = await axios.get('/get-total-post-number-of-today')

        totalPostNumberOfToday.value = response.data.getTotalPostNumberOfToday || 0
    }
    catch (error) {
        console.log('ERROR fetching dashboard data: ' + error)
    }
}

onMounted(async () => {
    try {
        const response = await axios.get('/get-session-data')

        if (response.data.success) {
            userEmail.value = response.data.user

            getTotalPostsNumner()
            getTotalUsersNumner()
            getTotalPostNumberOfToday()
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

<style lang="scss" scoped></style>