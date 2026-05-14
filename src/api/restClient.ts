import type { APIRequestContext, APIResponse } from '@playwright/test';

export class RestClient {
  constructor(private readonly request: APIRequestContext) {}

  get(path: string): Promise<APIResponse> {
    return this.request.get(path);
  }

  post<TPayload extends object>(path: string, payload: TPayload): Promise<APIResponse> {
    return this.request.post(path, { data: payload });
  }
}

