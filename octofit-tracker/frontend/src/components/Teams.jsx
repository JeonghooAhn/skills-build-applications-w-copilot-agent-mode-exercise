import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'name', label: '팀 이름' },
  { key: 'description', label: '소개' },
  { key: 'members', label: '멤버' },
]
const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

export default function Teams() {
  return (
    <CollectionPage
      description="팀과 소속 멤버를 둘러보세요."
      endpoint={endpoint}
      fields={fields}
      title="팀"
    />
  )
}