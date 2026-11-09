import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'user.displayName', label: '사용자' },
  { key: 'points', label: '포인트' },
  { key: 'period', label: '기간' },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      description="기간별 포인트 순위를 확인하세요."
      endpoint="leaderboard"
      fields={fields}
      title="리더보드"
    />
  )
}