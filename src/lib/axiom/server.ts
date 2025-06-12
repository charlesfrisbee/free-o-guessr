import axiomClient from '@/lib/axiom/axiom';
import { Logger, AxiomJSTransport } from '@axiomhq/logging';
import { createAxiomRouteHandler, nextJsFormatters } from '@axiomhq/nextjs';

// Skip logging in CI and test environments
const shouldLog = process.env.NODE_ENV !== 'test' && !process.env.CI;

// Create logger with conditional transport
const createServerLogger = () => {
  if (!shouldLog) {
    // Return a no-op logger for test environments
    return {
      info: () => {},
      warn: () => {},
      error: () => {},
      debug: () => {},
    };
  }

  return new Logger({
    transports: [
      new AxiomJSTransport({ 
        axiom: axiomClient, 
        dataset: process.env.NEXT_PUBLIC_AXIOM_DATASET! 
      }),
    ],
    formatters: nextJsFormatters,
  });
};

export const logger = createServerLogger();
export const withAxiom = shouldLog 
  ? createAxiomRouteHandler(logger as Logger)
  : <T>(handler: T) => handler;