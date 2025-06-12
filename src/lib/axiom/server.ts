import axiomClient from '@/lib/axiom/axiom';
import { Logger, AxiomJSTransport } from '@axiomhq/logging';
import { createAxiomRouteHandler, nextJsFormatters } from '@axiomhq/nextjs';

// Skip logging in CI and test environments
const shouldLog = process.env.NODE_ENV !== 'test' && !process.env.CI;

// Create logger with conditional transport
const createServerLogger = () => {
  const transports = shouldLog ? [
    new AxiomJSTransport({ 
      axiom: axiomClient, 
      dataset: process.env.NEXT_PUBLIC_AXIOM_DATASET! 
    }),
  ] : [];

  return new Logger({
    transports,
    formatters: nextJsFormatters,
  });
};

export const logger = createServerLogger();
export const withAxiom = createAxiomRouteHandler(logger);