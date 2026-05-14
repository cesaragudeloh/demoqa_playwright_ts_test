# Playwright TS - Senior SDET Demo

Proyecto de automatizacion con enfoque Senior SDET: UI E2E + API REST + GraphQL, arquitectura por capas, y calidad transversal para CI/CD.

## Arquitectura

- `src/core/env.ts`: configuracion por variables de entorno.
- `src/api/restClient.ts`: cliente reutilizable para pruebas REST.
- `src/api/graphqlClient.ts`: cliente reutilizable para pruebas GraphQL.
- `src/data/practiceFormFactory.ts`: datos dinamicos para reducir acoplamiento y flakiness.
- `pages/PracticeFormPage.ts`: Page Object del formulario DemoQA.
- `tests/ui/*.spec.ts`: pruebas de interfaz etiquetadas (`@smoke`, `@regression`).
- `tests/api/*.spec.ts`: pruebas REST con validacion de esquema (`zod`).
- `tests/graphql/*.spec.ts`: pruebas GraphQL (query valida y manejo de errores).
- `.github/workflows/ci.yml`: pipeline con lint, typecheck, test y artefactos.

## Variables de entorno (opcionales)

- `UI_BASE_URL` (default: `https://demoqa.com`)
- `API_BASE_URL` (default: `https://jsonplaceholder.typicode.com`)
- `GRAPHQL_BASE_URL` (default: `https://countries.trevorblades.com/graphql`)
- Copia `.env.example` a `.env` si quieres fijar endpoints locales.

## Instalacion

```bash
npm ci
npx playwright install chromium firefox
```

## Ejecucion

```bash
npm run check
npm run test:ui
npm run test:api
npm run test:graphql
npm run test:smoke
npm run report
```

## Entrevista: como demostrar seniority en 10 minutos

1. Explica la separacion por capas (`core`, `api`, `data`, `ui`, `tests`).
2. Muestra validaciones de contrato con `zod` en pruebas REST/GraphQL.
3. Ejecuta `npm run check` para evidenciar quality gates.
4. Muestra `ci.yml` para explicar trazabilidad y artefactos de debugging.
5. Propone extensiones: Appium (mobile), k6 (performance), dashboards de calidad.

