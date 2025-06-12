'use client';
import axiomClient from '@/lib/axiom/axiom';
import { Logger, AxiomJSTransport } from '@axiomhq/logging';
import { createUseLogger, createWebVitalsComponent } from '@axiomhq/react';
import { nextJsFormatters } from '@axiomhq/nextjs/client';

// Skip logging in CI and test environments
const shouldLog = process.env.NODE_ENV !== 'test' && !process.env.CI;

// Create logger with conditional transport
const createClientLogger = () => {
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

export const logger = createClientLogger();

// Only create React hooks for real logger instances
export const useLogger = shouldLog 
  ? createUseLogger(logger as Logger)
  : () => ({ info: () => {}, warn: () => {}, error: () => {}, debug: () => {} });

export const AxiomWebVitals = shouldLog 
  ? createWebVitalsComponent(logger as Logger)
  : () => null;