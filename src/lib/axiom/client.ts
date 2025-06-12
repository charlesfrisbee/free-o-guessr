'use client';
import axiomClient from '@/lib/axiom/axiom';
import { Logger, AxiomJSTransport } from '@axiomhq/logging';
import { createUseLogger, createWebVitalsComponent } from '@axiomhq/react';
import { nextJsFormatters } from '@axiomhq/nextjs/client';

// Skip logging in CI and test environments
const shouldLog = process.env.NODE_ENV !== 'test' && !process.env.CI;

// Create logger with conditional transport
const createClientLogger = () => {
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

export const logger = createClientLogger();
export const useLogger = createUseLogger(logger);
export const AxiomWebVitals = createWebVitalsComponent(logger);