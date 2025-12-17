/**
 * @fileoverview Layout Component
 * This module provides a reusable layout wrapper component that provides
 * consistent page structure with a header and main content area for the
 * Emoji Tracker React application.
 */

/**
 * Layout Component
 * 
 * A wrapper component that provides consistent page structure across the application.
 * Includes a header with a customizable title and a main content area for children.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title="Mood Tracker"] - The title to display in the header
 * @param {React.ReactNode} props.children - Child components to render in the main content area
 * 
 * @returns {JSX.Element} The layout wrapper with header and main content
 * 
 * @example
 * <Layout title="My Moods">
 *   <MoodList moods={moods} />
 * </Layout>
 */
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
