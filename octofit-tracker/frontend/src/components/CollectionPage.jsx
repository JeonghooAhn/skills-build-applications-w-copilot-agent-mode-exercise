import { useEffect, useState } from 'react'
import { getApiUrl, getCollection } from './api.js'

function displayValue(item, field) {
  const value = field.key.split('.').reduce((current, key) => current?.[key], item)

  if (value == null || value === '') return '—'
  if (Array.isArray(value)) {
    return value.map((entry) => entry?.displayName || entry?.name || entry?.username || entry).join(', ') || '—'
  }
  if (typeof value === 'object') {
    return value.displayName || value.name || value.username || '—'
  }
  if (field.type === 'date') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('ko-KR')
  }
  return String(value)
}

export default function CollectionPage({ title, description, endpoint, fields }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getApiUrl(endpoint), { signal: controller.signal })
        if (!response.ok) throw new Error(`서버 응답 오류 (${response.status})`)
        setItems(getCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || '데이터를 불러오지 못했습니다.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section className="collection-page" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT / {endpoint.toUpperCase()}</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        {!loading && !error && <span className="item-count">{items.length}개 항목</span>}
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {loading && <p className="status-message" role="status">불러오는 중…</p>}
      {!loading && !error && items.length === 0 && (
        <p className="status-message">표시할 데이터가 없습니다.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle collection-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                {fields.map((field) => <th scope="col" key={field.key}>{field.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || `${endpoint}-${index}`}>
                  <th scope="row">{String(index + 1).padStart(2, '0')}</th>
                  {fields.map((field) => (
                    <td key={field.key}>{displayValue(item, field)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}