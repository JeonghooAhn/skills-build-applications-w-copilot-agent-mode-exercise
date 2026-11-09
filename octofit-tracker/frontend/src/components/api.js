const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const codespaceHost = globalThis.location?.hostname.match(/^(.+)-5173\.app\.github\.dev$/)
const codespaceName = configuredCodespaceName || codespaceHost?.[1]

const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(component) {
  return `${apiBaseUrl}/${component}/`
}

export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}