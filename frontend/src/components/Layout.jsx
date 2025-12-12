// frontend/src/components/Layout.jsx
export default function Layout({ title = "Mood Tracker", children }) {
    return (
      <div className="app-root">
        <header className="app-header">
          <h1 className="app-title">{title}</h1>
        </header>
  
        <main className="app-main">
          <div className="app-card">
            {children}
          </div>
        </main>
      </div>
    );
  }
  