import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { attachApiExchange } from './apiAttachments';

export class RestClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(path: string, testInfo?: TestInfo): Promise<APIResponse> {
    const response = await this.request.get(path);

    await attachApiExchange(testInfo, {
      clientName: 'rest',
      method: 'GET',
      url: path,
      response,
    });

    return response;
  }

  async post<TPayload extends object>(
    path: string,
    payload: TPayload,
    testInfo?: TestInfo
  ): Promise<APIResponse> {
    const response = await this.request.post(path, { data: payload });

    await attachApiExchange(testInfo, {
      clientName: 'rest',
      method: 'POST',
      url: path,
      requestBody: payload,
      response,
    });

    return response;
  }
}

