"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Manrope, system-ui, sans-serif",
          background: "#F7FAFE",
          color: "#334155",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ color: "#102B50", fontSize: "1.75rem" }}>Something went wrong</h1>
          <p style={{ marginTop: "0.75rem", color: "#64748B" }}>
            A critical error occurred. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              background: "#0866C6",
              color: "white",
              border: 0,
              borderRadius: "0.75rem",
              padding: "0.75rem 1.25rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
