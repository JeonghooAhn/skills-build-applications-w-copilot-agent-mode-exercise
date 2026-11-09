import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'type', label: '활동' },
  { key: 'user.displayName', label: '사용자' },
  { key: 'durationMinutes', label: '시간 (분)' },
  { key: 'distanceKilometers', label: '거리 (km)' },
  { key: 'calories', label: '칼로리' },
  { key: 'completedAt', label: '완료일', type: 'date' },
]

export default function Activities() {
  return (
    <CollectionPage
      description="완료한 운동과 활동 기록을 확인하세요."
      endpoint="activities"
      fields={fields}
      title="활동 기록"
    />
  )
}