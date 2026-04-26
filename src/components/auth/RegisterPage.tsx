import { useState } from 'react'
import { Input, Notification, GoogleButton } from '../ui'
import type { Notification as NotifType } from '../../types'

interface Props {
  onRegister: (name: string, email: string, password: string) => void
  onGoLogin: () => void
  notification: NotifType | null
}

export function RegisterPage({ onRegister, onGoLogin, notification }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name || !email || !password) { setError('Preencha todos os campos.'); return }
    if (password !== confirm) { setError('Senhas não coincidem.'); return }
    if (password.length < 6) { setError('Senha: mínimo 6 caracteres.'); return }
    setError('')
    onRegister(name, email, password)
  }

  return (
    <div className="min-h-screen flex bg-[#080808]">
      <div className="hidden lg:flex w-[45%] bg-neutral-100 flex-col justify-between p-14 flex-shrink-0">
        <div>
          <h1 className="text-5xl font-black text-black tracking-tighter leading-none">PRAGMA</h1>
          <p className="font-mono text-[11px] text-neutral-500 mt-2">v1.0 — gerenciador de tarefas</p>
        </div>
        <p className="text-[110px] font-black text-black opacity-[0.06] leading-none tracking-tighter">START.</p>
        <p className="font-mono text-xs text-neutral-500 leading-relaxed">
          Organize seu dia.<br />Uma tarefa de cada vez.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10">
            <h1 className="text-4xl font-black text-white tracking-tighter">PRAGMA</h1>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Criar conta</h2>
          <p className="font-mono text-xs text-neutral-600 mb-7">
            Já tem conta?{' '}
            <button onClick={onGoLogin} className="text-white hover:underline">
              Entrar
            </button>
          </p>

          <div className="flex flex-col gap-4">
            <Input label="Nome" value={name} onChange={setName} placeholder="Seu nome" required />
            <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" required />
            <Input label="Senha" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
            <Input label="Confirmar senha" type="password" value={confirm} onChange={setConfirm} placeholder="••••••••" required />

            {error && <p className="font-mono text-[11px] text-red-400">✗ {error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full bg-white text-black py-2.5 text-xs font-bold font-mono tracking-widest hover:bg-neutral-100 transition-colors mt-1"
            >
              CRIAR CONTA →
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-900" />
              <span className="font-mono text-[10px] text-neutral-700">ou</span>
              <div className="flex-1 h-px bg-neutral-900" />
            </div>

           <GoogleButton onClick={() => window.location.href = 'https://pragma-backend-production.up.railway.app/api/auth/google'} />
          </div>
        </div>
      </div>

      <Notification msg={notification?.msg} type={notification?.type} />
    </div>
  )
}
