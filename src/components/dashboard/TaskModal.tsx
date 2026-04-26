import { useState } from 'react'
import { Input } from '../ui'
import type { Task, Priority } from '../../types'

const PRIORITIES: { key: Priority; label: string }[] = [
  { key: 'low', label: 'Baixa' },
  { key: 'medium', label: 'Média' },
  { key: 'high', label: 'Alta' },
]

interface Props {
  task: Task | null
  onSave: (data: Omit<Task, 'id' | 'done'>) => void
  onClose: () => void
}

export function TaskModal({ task, onSave, onClose }: Props) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [deadline, setDeadline] = useState(
  task?.deadline ? task.deadline.split('T')[0] : ''
)
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'medium')

  const handleSave = () => {
    if (!title.trim()) return
    onSave({ title: title.trim(), description, deadline, priority })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0e0e0e] border border-neutral-800 w-full max-w-md p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-white">
            {task ? 'Editar tarefa' : 'Nova tarefa'}
          </h3>
          <button onClick={onClose} className="text-neutral-600 hover:text-white text-lg transition-colors">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Input label="Título *" value={title} onChange={setTitle} placeholder="O que precisa ser feito?" required />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes opcionais..."
              rows={3}
              className="bg-transparent border border-neutral-800 text-neutral-100 px-3.5 py-2.5 text-sm font-mono outline-none focus:border-white transition-colors resize-none placeholder:text-neutral-700"
            />
          </div>

          <Input
            label="Prazo"
            type="date"
            value={deadline}
            onChange={setDeadline}
            min={new Date().toISOString().split('T')[0]}
          />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              Prioridade
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setPriority(key)}
                  className={`flex-1 py-2 text-xs font-mono border transition-colors ${
                    priority === key
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-mono border border-neutral-800 text-neutral-500 hover:border-neutral-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 text-xs font-mono font-bold bg-white text-black hover:bg-neutral-100 transition-colors"
            >
              {task ? 'SALVAR' : 'CRIAR'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
