import type { APIResponse, TestInfo } from '@playwright/test';

interface ApiAttachmentInput {
  clientName: string;
  method: string;
  url: string;
  requestBody?: unknown;
  response: APIResponse;
}

function serialize(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function normalizeBody(rawBody: string): string {
  try {
    return JSON.stringify(JSON.parse(rawBody), null, 2);
  } catch {
    return rawBody;
  }
}

export async function attachApiExchange(
  testInfo: TestInfo | undefined,
  input: ApiAttachmentInput
): Promise<void> {
  if (!testInfo) {
    return;
  }

  const rawResponseBody = await input.response.text();

  const requestPayload = {
    method: input.method,
    url: input.url,
    body: input.requestBody,
  };

  const responsePayload = {
    status: input.response.status(),
    statusText: input.response.statusText(),
    url: input.response.url(),
    headers: input.response.headers(),
    body: normalizeBody(rawResponseBody),
  };

  const attachmentPrefix = `${input.clientName}-${input.method.toLowerCase()}-${Date.now()}`;

  await testInfo.attach(`${attachmentPrefix}-request.json`, {
    body: serialize(requestPayload),
    contentType: 'application/json',
  });

  await testInfo.attach(`${attachmentPrefix}-response.json`, {
    body: serialize(responsePayload),
    contentType: 'application/json',
  });
}

