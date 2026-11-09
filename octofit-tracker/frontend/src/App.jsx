import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  return (
    <main className="container py-5">
      <header className="d-flex align-items-center gap-3">
        <img src={octofitLogo} width="64" height="64" alt="OctoFit Tracker" />
        <div>
          <h1 className="mb-1">OctoFit Tracker</h1>
          <p className="mb-0 text-body-secondary">
            Your fitness tracking app is ready to build.
          </p>
        </div>
      </header>
    </main>
  )
}

export default App
