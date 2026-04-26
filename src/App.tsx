import { useState, useEffect, useCallback } from 'react'
import { LoginPage } from './components/auth/LoginPage'
import { RegisterPage } from './components/auth/RegisterPage'
import { Dashboard } from './components/dashboard/Dashboard'
import { authService, taskService } from './services/api'
import type { User, Task, Notification } from './types'
import { getApiError } from './utils/error'

type Page = 'login' | 'register' | 'dashboard'

export default function App() {
  const [page, setPage] = useState<Page>('login')
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [notification, setNotification] = useState<Notification | null>(null)
  const [loading, setLoading] = useState(true)

  const notify = (msg: string, type: Notification['type'] = 'success') => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Restaura sessão ao carregar a página
  // Captura token do Google OAuth na URL
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')
  const name = params.get('name')
  const email = params.get('email')
  const id = params.get('id')

  if (token && name && email && id) {
    const u = { id, name, email }
    localStorage.setItem('pragma_token', token)
    localStorage.setItem('pragma_user', JSON.stringify(u))
    setUser(u)
    setPage('dashboard')
    window.history.replaceState({}, '', '/') // limpa a URL
    notify(`Bem-vindo, ${name.split(' ')[0]}!`)
  }
}, [])

  // Busca tarefas quando entra no dashboard
  const fetchTasks = useCallback(async () => {
    try {
      const res = await taskService.getAll()
      setTasks(res.data.tasks)
    } catch {
      notify('Erro ao carregar tarefas.', 'error')
    }
  }, [])

  useEffect(() => {
    if (page === 'dashboard') fetchTasks()
  }, [page, fetchTasks])

  // ── Auth ───────────────────────────────────────────────────
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await authService.login(email, password)
      const { token, user: u } = res.data
      localStorage.setItem('pragma_token', token)
      localStorage.setItem('pragma_user', JSON.stringify(u))
      setUser(u)
      setPage('dashboard')
      notify(`Bem-vindo de volta, ${u.name.split(' ')[0]}!`)
    } catch (err) {
      notify(getApiError(err, 'Erro ao fazer login.'), 'error')
    }
  }

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const res = await authService.register(name, email, password)
      const { token, user: u } = res.data
      localStorage.setItem('pragma_token', token)
      localStorage.setItem('pragma_user', JSON.stringify(u))
      setUser(u)
      setPage('dashboard')
      notify(`Bem-vindo, ${u.name.split(' ')[0]}!`)
    } catch (err) {
      notify(getApiError(err, 'Erro ao criar conta.'), 'error')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('pragma_token')
    localStorage.removeItem('pragma_user')
    setUser(null)
    setTasks([])
    setPage('login')
    notify('Até mais!')
  }

  // ── Tasks ──────────────────────────────────────────────────
  const handleAdd = async (data: Omit<Task, 'id' | 'done'>) => {
    try {
      const res = await taskService.create(data)
      setTasks((prev) => [res.data.task, ...prev])
      notify('Tarefa criada!')
    } catch {
      notify('Erro ao criar tarefa.', 'error')
    }
  }

  const handleUpdate = async (id: Task['id'], data: Partial<Task>) => {
    try {
      const res = await taskService.update(id, data)
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data.task : t)))
      notify('Tarefa atualizada!')
    } catch {
      notify('Erro ao atualizar tarefa.', 'error')
    }
  }

  const handleDelete = async (id: Task['id']) => {
    try {
      await taskService.delete(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      notify('Tarefa removida.')
    } catch {
      notify('Erro ao excluir tarefa.', 'error')
    }
  }

  const handleToggle = async (id: Task['id']) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    await handleUpdate(id, { done: !task.done })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="font-mono text-xs text-neutral-700 animate-pulse">carregando...</p>
      </div>
    )
  }

  if (page === 'login')
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoogle={() => notify('Login com Google requer configuração do OAuth.', 'error')}
        onGoRegister={() => setPage('register')}
        notification={notification}
      />
    )

  if (page === 'register')
    return (
      <RegisterPage
        onRegister={handleRegister}
        onGoLogin={() => setPage('login')}
        notification={notification}
      />
    )

  return (
    <Dashboard
      user={user!}
      tasks={tasks}
      onLogout={handleLogout}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggle={handleToggle}
      notification={notification}
    />
  )
}

