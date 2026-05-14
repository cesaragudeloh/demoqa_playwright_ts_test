import { expect, test } from '@playwright/test';
import { z } from 'zod';
import { RestClient } from '../../src/api/restClient';

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string().min(1),
  body: z.string().min(1),
});

test.describe('JSONPlaceholder REST @api', () => {
  test('[@smoke] obtiene un post por id', async ({ request }, testInfo) => {
    const client = new RestClient(request);

    const response = await client.get('/posts/1', testInfo);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const result = postSchema.safeParse(body);
    expect(result.success).toBe(true);
  });

  test('[@regression] crea un post', async ({ request }, testInfo) => {
    const client = new RestClient(request);

    const payload = {
      title: 'senior-sdet-demo',
      body: 'validating post creation flow',
      userId: 99,
    };

    const response = await client.post('/posts', payload, testInfo);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(typeof body.id).toBe('number');
  });

  test('[@regression] responde 404 para recurso inexistente', async ({ request }, testInfo) => {
    const client = new RestClient(request);

    const response = await client.get('/unknown-path', testInfo);
    expect(response.status()).toBe(404);
  });
});

