// src/utils/error.ts
// Utilitário para extrair mensagem de erro de respostas do Axios
// sem precisar usar "any" em todo catch

interface ApiError {
  response?: {
    data?: {
      error?: string
    }
  }
}

export function getApiError(err: unknown, fallback: string): string {
  const e = err as ApiError
  return e?.response?.data?.error ?? fallback
}
