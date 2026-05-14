# Playwright TypeScript Test Automation

This repository is a layered Playwright + TypeScript automation framework that includes:

- UI end-to-end tests (DemoQA form)
- REST API tests
- GraphQL tests
- Linting and type-check quality gates
- CI pipeline support

## Suggested GitHub Repository Description

Senior-grade Playwright + TypeScript test automation framework for UI, REST, and GraphQL with tagging, reusable clients, and GitHub Actions CI.

## Framework Highlights

- 100% TypeScript implementation.
- Clear architecture with separation of concerns (`fixtures/`, `pages/`, `src/`, `tests/`).
- Page Object Model for UI maintainability.
- Dynamic and reusable test data setup.
- Reusable API clients for REST and GraphQL.
- Quality gates via linting and static type checks.
- Multi-project Playwright configuration (`chromium`, `firefox`, `api`).
- Tagged execution strategy (`@smoke`, `@regression`).
- HTML report artifacts including API/GraphQL request-response attachments.
- GitHub Actions workflow for automated validation.

## General Overview

- `src/core/env.ts`: environment configuration.
- `src/api/restClient.ts`: reusable REST client.
- `src/api/graphqlClient.ts`: reusable GraphQL client.
- `src/data/practiceFormFactory.ts`: dynamic test data factory.
- `pages/PracticeFormPage.ts`: Page Object for DemoQA practice form.
- `tests/ui/*.spec.ts`: UI tests with tags (`@smoke`, `@regression`).
- `tests/api/*.spec.ts`: REST API tests with schema validation (`zod`).
- `tests/graphql/*.spec.ts`: GraphQL query and error validation tests.
- `.github/workflows/ci.yml`: CI workflow (lint, typecheck, tests, artifacts).

## CI/CD (GitHub Actions)

- Workflow file: `.github/workflows/ci.yml`
- Runs on push and pull requests.
- Executes lint, typecheck, and Playwright tests.
- Uploads `playwright-report/` and `test-results/` as artifacts.

## Requirements

- Node.js 20+ (Node.js 22 recommended)
- npm 10+
- Internet access (tests call public endpoints)
- Playwright browser binaries (installed in setup)

## Installation

```bash
npm install
npx playwright install chromium firefox
```

## Environment Variables (Optional)

You can override default endpoints with environment variables:

- `UI_BASE_URL` (default: `https://demoqa.com`)
- `API_BASE_URL` (default: `https://jsonplaceholder.typicode.com`)
- `GRAPHQL_BASE_URL` (default: `https://countries.trevorblades.com/graphql`)

Quick setup:

```bash
cp .env.example .env
```

## Run Commands

```bash
npm run check
npm run test:ui
npm run test:api
npm run test:graphql
npm run test:all
npm run test:smoke
npm run test:regression
npm run report
```

- `npm run check`: runs lint + TypeScript type checking.
- `npm run test:ui`: runs UI Playwright tests in `tests/ui`.
- `npm run test:api`: runs REST API tests in `tests/api` using the `api` project.
- `npm run test:graphql`: runs GraphQL tests in `tests/graphql` using the `api` project.
- `npm run test:all`: runs all configured projects (`chromium`, `firefox`, and `api`).
- `npm run test:smoke`: runs tests tagged with `@smoke`.
- `npm run test:regression`: runs tests tagged with `@regression`.
- `npm run report`: opens the Playwright HTML report.

## Tagging Strategy

- `@smoke`: critical and fast validations for PR confidence.
- `@regression`: broader validation set for deeper checks.
- Tags can be combined with projects and CI jobs to create fit-for-purpose pipelines.

## API Testing Example

Example from `tests/api/jsonplaceholder.spec.ts` using `src/api/restClient.ts`:

```ts
test('[@regression] creates a post', async ({ request }, testInfo) => {
  const client = new RestClient(request);

  const payload = {
	title: 'senior-sdet-demo',
	body: 'validating post creation flow',
	userId: 99,
  };

  const response = await client.post('/posts', payload, testInfo);
  expect(response.status()).toBe(201);
});
```

The `testInfo` argument enables automatic request/response attachments in the HTML report.

## How I Would Scale This Framework in an Enterprise Project

- Add domain-based modules (e.g., `orders`, `payments`, `auth`) with dedicated client/page layers.
- Add environment profiles and secrets management for dev, stage, and prod-like test runs.
- Add contract validation via OpenAPI/GraphQL schema checks in CI.
- Add data factories and synthetic test data services to reduce flaky dependencies.
- Add parallel execution strategy by risk level and business criticality.
- Add nightly full-regression and PR smoke pipelines with trend dashboards.
- Add mobile layer integration (Appium) and performance validation (k6) as separate quality stages.

## Useful Notes

- API and GraphQL suites use the Playwright `api` project.
- UI tests use browser projects (`chromium`, `firefox`) configured in `playwright.config.ts`.
- Test evidence is generated under `playwright-report/` and `test-results/`.
- API/GraphQL tests attach request and response payloads to each test result in the HTML report.

