import { useState } from 'react'
import { Notification } from '../ui'
import { TaskCard } from './TaskCard'
import { TaskModal } from './TaskModal'
import type { User, Task, Filter, Notification as NotifType } from '../../types'

interface Props {
  user: User
  tasks: Task[]
  onLogout: () => void
  onAdd: (data: Omit<Task, 'id' | 'done'>) => void
  onUpdate: (id: Task['id'], data: Partial<Task>) => void
  onDelete: (id: Task['id']) => void
  onToggle: (id: Task['id']) => void
  notification: NotifType | null
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'done', label: 'Concluídas' },
]

export function Dashboard({ user, tasks, onLogout, onAdd, onUpdate, onDelete, onToggle, notification }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filtered = tasks.filter((t) => {
    if (filter === 'pending') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => !t.done).length,
    done: tasks.filter((t) => t.done).length,
  }

  const openAdd = () => { setEditingTask(null); setShowModal(true) }
  const openEdit = (task: Task) => { setEditingTask(task); setShowModal(true) }

  const handleSave = (data: Omit<Task, 'id' | 'done'>) => {
    if (editingTask) onUpdate(editingTask.id, data)
    else onAdd(data)
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Navbar */}
      <nav className="border-b border-neutral-900 px-5 py-3.5 flex items-center justify-between sticky top-0 bg-[#080808] z-40">
        <span className="text-xl font-black tracking-tighter text-white">PRAGMA</span>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-neutral-600 hidden sm:block">{user.name}</span>
          <button
            onClick={onLogout}
            className="font-mono text-[10px] tracking-widest text-neutral-500 border border-neutral-800 hover:border-neutral-600 px-3 py-1.5 transition-colors"
          >
            SAIR
          </button>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-7">
        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-2.5 mb-7">
          {[['Total', stats.total], ['Pendentes', stats.pending], ['Concluídas', stats.done]].map(([label, value]) => (
            <div key={label} className="border border-neutral-900 p-4">
              <p className="text-3xl font-black text-white leading-none">{value}</p>
              <p className="font-mono text-[10px] text-neutral-600 mt-1.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filtros + botão */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex gap-1.5">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 text-[11px] font-mono transition-colors ${
                  filter === key
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-500 border border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={openAdd}
            className="bg-white text-black px-4 py-1.5 text-[11px] font-mono font-bold hover:bg-neutral-100 transition-colors whitespace-nowrap"
          >
            + NOVA TAREFA
          </button>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-1.5">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-neutral-900 py-16 text-center">
              <p className="font-mono text-xs text-neutral-700">
                {filter === 'done' ? 'Nenhuma tarefa concluída.' : 'Nenhuma tarefa aqui.'}
              </p>
              {filter !== 'done' && (
                <button
                  onClick={openAdd}
                  className="font-mono text-[11px] text-neutral-600 hover:text-white mt-3 underline transition-colors"
                >
                  + Criar primeira tarefa
                </button>
              )}
            </div>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onEdit={openEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      <Notification msg={notification?.msg} type={notification?.type} />
    </div>
  )
}
