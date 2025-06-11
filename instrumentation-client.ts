import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Environment configuration
  environment: process.env.NODE_ENV || "development",
  
  // Ensure all events are sampled in development
  tracesSampleRate: 1.0,
  sampleRate: 1.0,
  
  debug: true,
  
  // Add beforeSend to log what's being sent
  beforeSend(event) {
    console.log("=== SENTRY BEFORE SEND ===");
    console.log("Event type:", event.type);
    console.log("Event level:", event.level);
    console.log("Event message:", event.message);
    console.log("========================");
    return event;
  },
  
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Optional: Add integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});

// Export router transition tracking
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;