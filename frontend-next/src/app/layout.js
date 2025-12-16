import "./globals.css";

export const metadata = {
  title: "Mood Tracker",
  description: "Emoji Mood Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="app-header">
          <h1>Mood Tracker</h1>
        </header>

        <main className="app-container">
          {children}
        </main>
      </body>
    </html>
  );
}
