/**
 * TypeScript definitions for Cloudflare Workers environment bindings
 */

/**
 * Environment bindings available to the worker
 */
declare global {
  interface Env {
    /** Durable Object namespace for client logs */
    client_logs: DurableObjectNamespace;

    /** KV namespace for static content (site assets) */
    __STATIC_CONTENT: KVNamespace;
  }

  /**
   * Execution context for the worker
   */
  interface Context {
    /**
     * Extends the lifetime of the event until the promise settles
     * Used for background operations that should complete even after returning a response
     */
    waitUntil(promise: Promise<any>): void;

    /**
     * Prevents a request from failing due to an unhandled promise rejection
     */
    passThroughOnException(): void;
  }

  /**
   * Bindings interface (used by Durable Objects)
   */
  interface Bindings extends Env {}
}

export {};
