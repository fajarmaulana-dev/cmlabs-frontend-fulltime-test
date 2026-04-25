'use client'

import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'

import { useToastStore } from '@/stores/toast-store'
import { cn } from '@/utils/cn'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'bg-emerald-900/90 border-emerald-700 text-emerald-100',
  error: 'bg-red-900/90 border-red-700 text-red-100',
  info: 'bg-white shadow-lg border border-slate-100/90 border-zinc-600 text-slate-800',
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div
      aria-atomic="false"
      aria-live="polite"
      className="pointer-events-none fixed right-6 bottom-6 z-999 flex flex-col gap-3"
    >
      {toasts.map(toast => {
        const Icon = icons[toast.type]
        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-xl',
              'animate-in slide-in-from-right-4 duration-300',
              'max-w-95 min-w-70',
              colors[toast.type],
            )}
          >
            <Icon className="shrink-0" size={18} />
            <p className="flex-1 text-sm">{toast.message}</p>
            <button
              aria-label="Dismiss notification"
              className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
              onClick={() => removeToast(toast.id)}
            >
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
