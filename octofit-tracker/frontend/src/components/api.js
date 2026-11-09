const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const codespaceHost = globalThis.location?.hostname.match(/^(.+)-5173\.app\.github\.dev$/)
const codespaceName = configuredCodespaceName || codespaceHost?.[1]

const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(endpoint) {
  if (endpoint.startsWith('https://')) return endpoint
  const apiPath = endpoint.startsWith('/api/') ? endpoint : `/api/${endpoint}/`
  return `${apiOrigin}${apiPath}`
}

export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}