import type { Task } from '../../types'

const PRIORITY_LABEL = { low: 'Baixa', medium: 'Média', high: 'Alta' }
const PRIORITY_COLOR = {
  low: 'text-neutral-600 border-neutral-800',
  medium: 'text-neutral-400 border-neutral-600',
  high: 'text-white border-neutral-400',
}

interface Props {
  task: Task
  onToggle: (id: Task['id']) => void
  onEdit: (task: Task) => void
  onDelete: (id: Task['id']) => void
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  const isOverdue =
    task.deadline && !task.done && new Date(task.deadline + 'T00:00:00') < new Date()

  const formatDate = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: '2-digit',
    })

  return (
    <div
      className={`border p-4 transition-all ${
        task.done ? 'border-neutral-900 opacity-50' : 'border-neutral-800 hover:border-neutral-600'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${
            task.done ? 'bg-white border-white' : 'border-neutral-600 hover:border-white'
          }`}
        >
          {task.done && <span className="text-black text-[9px] font-bold leading-none">✓</span>}
        </button>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <p
            className={`font-bold text-sm leading-snug ${
              task.done ? 'line-through text-neutral-600' : 'text-white'
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="font-mono text-[11px] text-neutral-600 mt-1 truncate">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            {task.deadline && (
              <span
                className={`font-mono text-[10px] px-2 py-0.5 border ${
                  isOverdue ? 'border-red-900 text-red-500' : 'border-neutral-800 text-neutral-600'
                }`}
              >
                {isOverdue ? '⚠ ' : ''}{formatDate(task.deadline)}
              </span>
            )}
            <span className={`font-mono text-[10px] px-2 py-0.5 border ${PRIORITY_COLOR[task.priority]}`}>
              {PRIORITY_LABEL[task.priority]}
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-neutral-700 hover:text-white text-sm px-1.5 py-0.5 transition-colors"
            title="Editar"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-neutral-700 hover:text-red-400 text-xs px-1.5 py-0.5 transition-colors"
            title="Excluir"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
