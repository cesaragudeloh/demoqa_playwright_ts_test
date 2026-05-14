# Playwright TypeScript Test Automation

This project is a layered Playwright + TypeScript automation framework that includes:

- UI end-to-end tests (DemoQA form)
- REST API tests
- GraphQL tests
- Linting and type-check quality gates
- CI pipeline support

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

## Useful Notes

- API and GraphQL suites use the Playwright `api` project.
- UI tests use browser projects (`chromium`, `firefox`) configured in `playwright.config.ts`.
- Test evidence is generated under `playwright-report/` and `test-results/`.
- API/GraphQL tests attach request and response payloads to each test result in the HTML report.

