import { useState } from 'react'
import { Input, Notification, GoogleButton } from '../ui'
import type { Notification as NotifType } from '../../types'

interface Props {
  onLogin: (email: string, password: string) => void
  onGoogle: () => void
  onGoRegister: () => void
  notification: NotifType | null
}

export function LoginPage({ onLogin, onGoogle, onGoRegister, notification }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex bg-[#080808]">
      {/* Painel decorativo — visível apenas em telas grandes */}
      <div className="hidden lg:flex w-[45%] bg-neutral-100 flex-col justify-between p-14 flex-shrink-0">
        <div>
          <h1 className="text-5xl font-black text-black tracking-tighter leading-none">PRAGMA</h1>
          <p className="font-mono text-[11px] text-neutral-500 mt-2">v1.0 — gerenciador de tarefas</p>
        </div>
        <p className="text-[110px] font-black text-black opacity-[0.06] leading-none tracking-tighter">DONE.</p>
        <p className="font-mono text-xs text-neutral-500 leading-relaxed">
          A produtividade é a arte de<br />fazer as coisas certas.
        </p>
      </div>

      {/* Formulário */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10">
            <h1 className="text-4xl font-black text-white tracking-tighter">PRAGMA</h1>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Entrar</h2>
          <p className="font-mono text-xs text-neutral-600 mb-7">
            Sem conta?{' '}
            <button onClick={onGoRegister} className="text-white hover:underline">
              Cadastrar
            </button>
          </p>

          <div className="flex flex-col gap-4">
            <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" required />
            <Input label="Senha" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />

            <button
              onClick={() => onLogin(email, password)}
              className="w-full bg-white text-black py-2.5 text-xs font-bold font-mono tracking-widest hover:bg-neutral-100 transition-colors mt-1"
            >
              ENTRAR →
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-900" />
              <span className="font-mono text-[10px] text-neutral-700">ou</span>
              <div className="flex-1 h-px bg-neutral-900" />
            </div>

            <GoogleButton onClick={onGoogle} />
          </div>
        </div>
      </div>

      <Notification msg={notification?.msg} type={notification?.type} />
    </div>
  )
}
