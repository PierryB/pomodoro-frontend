import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const taskService = {
  getAll: () => api.get('/tasks'),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (task) => api.post('/tasks', task),
  update: (id, task) => api.put(`/tasks/${id}`, task),
  delete: (id) => api.delete(`/tasks/${id}`)
}

export const pomodoroService = {
  getAll: () => api.get('/pomodoro'),
  create: (session) => api.post('/pomodoro', session),
  getStats: () => api.get('/pomodoro/stats')
}

export default api
