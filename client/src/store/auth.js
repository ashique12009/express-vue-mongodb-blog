import { defineStore } from "pinia"
import axios from '@/services/axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        userEmail: ''
    }),
    actions: {
        async fetchSessionData() {
            try {
                const response = await axios.get('/get-session-data')
                if (response.data.success) {
                    this.isAuthenticated = true
                    this.userEmail = response.data.user
                } else {
                    this.isAuthenticated = false
                }
            } catch (error) {
                console.error('Error fetching session data:', error)
                this.isAuthenticated = false
            }
        },
        initializeAuthState() {
            this.isAuthenticated = false
        },
        logout() {
            this.isAuthenticated = false
            this.userEmail = ''
        }
    }
})