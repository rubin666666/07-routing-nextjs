"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: "24px" }}>
      <h2>Failed to load notes.</h2>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
