import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { attachApiExchange } from './apiAttachments';

interface GraphQLRequestBody {
  query: string;
  variables?: Record<string, unknown>;
}

export class GraphQLClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly endpoint: string
  ) {}

  async query(body: GraphQLRequestBody, testInfo?: TestInfo): Promise<APIResponse> {
    const response = await this.request.post(this.endpoint, { data: body });

    await attachApiExchange(testInfo, {
      clientName: 'graphql',
      method: 'POST',
      url: this.endpoint,
      requestBody: body,
      response,
    });

    return response;
  }
}

