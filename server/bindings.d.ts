/**
 * TypeScript definitions for Cloudflare Workers environment bindings
 */

/**
 * Environment bindings available to the worker
 */
declare global {
  interface Env {
    /** Salt for hashing client IDs (privacy protection) */
    ID_SALT?: string;

    /** Durable Object namespace for client logs v2 */
    client_logs_v2: DurableObjectNamespace;

    /** Static assets built from the React frontend */
    ASSETS: Fetcher;
  }

  /**
   * Bindings interface (used by Durable Objects)
   */
  interface Bindings extends Env {}
}

export {};
