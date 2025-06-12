import { Axiom } from '@axiomhq/js';

// Create a dummy client for test environments where token might not be available
const createAxiomClient = () => {
  const token = process.env.NEXT_PUBLIC_AXIOM_TOKEN;
  
  if (!token && (process.env.NODE_ENV === 'test' || process.env.CI)) {
    // Return a dummy client for test environments
    return new Axiom({ token: 'dummy-token-for-tests' });
  }
  
  return new Axiom({ token: token! });
};

const axiomClient = createAxiomClient();

export default axiomClient;