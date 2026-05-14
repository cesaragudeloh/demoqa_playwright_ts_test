import { expect, test } from '@playwright/test';
import { z } from 'zod';
import { GraphQLClient } from '../../src/api/graphqlClient';
import { env } from '../../src/core/env';

const countrySchema = z.object({
  code: z.string().length(2),
  name: z.string().min(1),
  capital: z.string().nullable(),
  emoji: z.string().min(1),
});

test.describe('Countries GraphQL @graphql', () => {
  test('[@smoke] consulta un pais por codigo', async ({ request }, testInfo) => {
    const client = new GraphQLClient(request, env.graphqlBaseUrl);

    const response = await client.query(
      {
        query: `
          query CountryByCode($code: ID!) {
            country(code: $code) {
              code
              name
              capital
              emoji
            }
          }
        `,
        variables: { code: 'CO' },
      },
      testInfo
    );

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.errors).toBeUndefined();

    const result = countrySchema.safeParse(body.data.country);
    expect(result.success).toBe(true);
    expect(body.data.country.code).toBe('CO');
  });

  test('[@regression] retorna error cuando el query es invalido', async ({ request }, testInfo) => {
    const client = new GraphQLClient(request, env.graphqlBaseUrl);

    const response = await client.query(
      {
        query: `
          query InvalidField {
            country(code: "CO") {
              invalidField
            }
          }
        `,
      },
      testInfo
    );

    expect([200, 400]).toContain(response.status());
    const body = await response.json();
    expect(Array.isArray(body.errors)).toBe(true);
    expect(body.errors[0].message).toContain('Cannot query field');
  });
});

