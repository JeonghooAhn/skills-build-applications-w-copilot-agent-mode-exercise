import octofitLogo from '../../../docs/octofitapp-small.png'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: '활동', path: '/activities' },
  { label: '리더보드', path: '/leaderboard' },
  { label: '팀', path: '/teams' },
  { label: '사용자', path: '/users' },
  { label: '운동 추천', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/activities" aria-label="OctoFit 홈">
          <img src={octofitLogo} width="48" height="48" alt="" />
          <span>OctoFit <strong>Tracker</strong></span>
        </NavLink>
        <nav className="nav nav-pills" aria-label="주요 탐색">
          {navigation.map(({ label, path }) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              key={path}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
      <footer className="app-footer">OctoFit Tracker <span>·</span> 움직임을 기록하고 함께 성장하세요</footer>
    </div>
  )
}

export default App
