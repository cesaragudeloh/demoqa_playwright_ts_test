# DemoQA Playwright TS Test (POM)

Automatizacion E2E del formulario `https://demoqa.com/automation-practice-form` con Playwright + TypeScript usando Page Object Model.

## Estructura

- `pages/PracticeFormPage.ts`: acciones y locators del formulario
- `tests/automation-practice-form.spec.ts`: escenarios happy/sad path
- `fixtures/testData.ts`: datos de prueba reutilizables
- `fixtures/test-file.txt`: archivo de carga para `setInputFiles`

## Instalacion

```bash
npm ci
npx playwright install
```

## Ejecucion

```bash
npm run test:headless
npm run test:headed
npm run report
```

