import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'name', label: '팀 이름' },
  { key: 'description', label: '소개' },
  { key: 'members', label: '멤버' },
]

export default function Teams() {
  return (
    <CollectionPage
      description="팀과 소속 멤버를 둘러보세요."
      endpoint="teams"
      fields={fields}
      title="팀"
    />
  )
}