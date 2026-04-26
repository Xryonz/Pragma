import axios from 'axios'
import type { AuthResponse, Task } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api'
})

// Injeta o token JWT em todas as requests automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pragma_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Auth ──────────────────────────────────────────────────────
export const authService = {
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>('/auth/register', { name, email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
}

// ── Tasks ─────────────────────────────────────────────────────
export const taskService = {
  getAll: (filter?: string) =>
    api.get<{ tasks: Task[] }>('/tasks', { params: { filter } }),

  create: (data: Omit<Task, 'id' | 'done'>) =>
    api.post<{ task: Task }>('/tasks', data),

  update: (id: string | number, data: Partial<Task>) =>
    api.put<{ task: Task }>(`/tasks/${id}`, data),

  delete: (id: string | number) =>
    api.delete(`/tasks/${id}`),
}
