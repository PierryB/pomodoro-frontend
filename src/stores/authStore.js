import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7283/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  },

  actions: {
    async register(name, email, password) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          password
        })
        
        this.token = response.data.token
        this.user = {
          email: response.data.email,
          name: response.data.name
        }
        
        localStorage.setItem('token', this.token)
        this.setAuthHeader()
        
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao registrar'
        return false
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password
        })
        
        this.token = response.data.token
        this.user = {
          email: response.data.email,
          name: response.data.name
        }
        
        localStorage.setItem('token', this.token)
        this.setAuthHeader()
        
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Email ou senha inválidos'
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    setAuthHeader() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    },

    async fetchProfile() {
      try {
        const response = await axios.get(`${API_URL}/auth/me`)
        this.user = {
          email: response.data.email,
          name: response.data.name
        }
        return true
      } catch {
        // Token inválido ou expirado - fazer logout
        this.logout()
        return false
      }
    },

    async initAuth() {
      if (this.token) {
        this.setAuthHeader()
        await this.fetchProfile()
      }
    }
  }
})
