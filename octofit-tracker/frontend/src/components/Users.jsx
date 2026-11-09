import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'displayName', label: '이름' },
  { key: 'username', label: '사용자 이름' },
  { key: 'email', label: '이메일' },
]
const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

export default function Users() {
  return (
    <CollectionPage
      description="OctoFit에 등록된 사용자를 확인하세요."
      endpoint={endpoint}
      fields={fields}
      title="사용자"
    />
  )
}