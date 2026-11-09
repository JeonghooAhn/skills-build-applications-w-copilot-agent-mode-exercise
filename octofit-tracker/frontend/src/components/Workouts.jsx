import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'name', label: '운동' },
  { key: 'target', label: '목표' },
  { key: 'difficulty', label: '난이도' },
  { key: 'durationMinutes', label: '시간 (분)' },
  { key: 'description', label: '설명' },
]
const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

export default function Workouts() {
  return (
    <CollectionPage
      description="목표에 맞는 운동 아이디어를 찾아보세요."
      endpoint={endpoint}
      fields={fields}
      title="운동 추천"
    />
  )
}