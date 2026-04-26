export type Priority = 'low' | 'medium' | 'high'
export type Filter = 'all' | 'pending' | 'done'

export interface User {
  id: string | number
  name: string
  email: string
}

export interface Task {
  id: string | number
  title: string
  description?: string
  deadline?: string
  priority: Priority
  done: boolean
  created_at?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Notification {
  msg: string
  type: 'success' | 'error'
}
