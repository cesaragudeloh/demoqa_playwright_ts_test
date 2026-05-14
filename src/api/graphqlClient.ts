import type { APIRequestContext, APIResponse } from '@playwright/test';

interface GraphQLRequestBody {
  query: string;
  variables?: Record<string, unknown>;
}

export class GraphQLClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly endpoint: string
  ) {}

  query(body: GraphQLRequestBody): Promise<APIResponse> {
    return this.request.post(this.endpoint, { data: body });
  }
}

