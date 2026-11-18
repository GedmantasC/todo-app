"use client";

/** Shown instead of the list if loading tasks fails, for example when the database is down. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="empty-message" role="alert">
      <p>The tasks could not be loaded.</p>
      <button type="button" id="clear-completed" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
