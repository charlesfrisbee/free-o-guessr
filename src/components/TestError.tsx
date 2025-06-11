"use client";
import { useState } from "react";
import * as Sentry from "@sentry/nextjs";

export default function TestError() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("Test client-side React error for Sentry!");
  }

  const testManualError = () => {
    // Simple test error for Sentry
    Sentry.captureException(new Error(`Test error ${Date.now()}`));
    Sentry.captureMessage("Test message from Free-O-Guessr", 'error');
    console.log("Test errors sent to Sentry!");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm block w-full"
      >
        Test Client Error
      </button>
      <button
        onClick={testManualError}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm block w-full"
      >
        Manual Error
      </button>
    </div>
  );
}