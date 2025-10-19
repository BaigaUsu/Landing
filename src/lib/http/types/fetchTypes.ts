import { RetryOptions } from "./retryTypes";

export type ExtendedFetchOptions = RequestInit & RetryOptions &{
  timeout?: number;
  // auth?: boolean
  skipAuth?: boolean;
    silentErrors?: boolean;
};