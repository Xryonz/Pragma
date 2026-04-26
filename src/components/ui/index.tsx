// ── Input ─────────────────────────────────────────────────────
interface InputProps {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  min?: string
}

export function Input({ label, type = 'text', value, onChange, placeholder, required, min }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        min={min}
        className="bg-transparent border border-neutral-800 text-neutral-100 px-3.5 py-2.5 text-sm font-mono outline-none focus:border-white transition-colors placeholder:text-neutral-700"
      />
    </div>
  )
}

// ── Notification ──────────────────────────────────────────────
interface NotificationProps {
  msg?: string
  type?: 'success' | 'error'
}

export function Notification({ msg, type }: NotificationProps) {
  if (!msg) return null
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-5 py-2.5 text-xs font-mono border animate-fade-in ${
        type === 'error'
          ? 'bg-neutral-100 text-black border-neutral-100'
          : 'bg-neutral-900 text-neutral-100 border-neutral-700'
      }`}
    >
      {type === 'error' ? '✗ ' : '✓ '}{msg}
    </div>
  )
}

// ── Google Button ─────────────────────────────────────────────
export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-neutral-800 text-neutral-300 hover:border-neutral-600 px-4 py-2.5 text-sm font-mono transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 18 18">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.215 17.64 11.907 17.64 9.2z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
        <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
      Continuar com Google
    </button>
  )
}
