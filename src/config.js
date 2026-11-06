const rawApiOrigin = process.env.VUE_APP_API_ORIGIN || ''

export const API_ORIGIN = rawApiOrigin.trim().replace(/\/+$/, '')

export const apiUrl = (path) => {
  if (!API_ORIGIN) {
    throw new Error(
      'VUE_APP_API_ORIGIN is not configured. Copy .env.example to .env and set your API origin.'
    )
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_ORIGIN}${normalizedPath}`
}
