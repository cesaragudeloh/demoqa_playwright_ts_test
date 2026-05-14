import path from 'path';
import { expect, test } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { testData } from '../fixtures/testData';

test.describe('DemoQA Practice Form', () => {
  test('completa y envia el formulario exitosamente', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);
    const filePath = path.resolve(__dirname, `../fixtures/${testData.picture}`);

    await test.step('Abrir formulario y diligenciar todos los campos', async () => {
      await practiceFormPage.visit();
      await practiceFormPage.fillCompleteForm(testData, filePath);
    });

    await test.step('Enviar formulario', async () => {
      await practiceFormPage.submit();
    });

    await test.step('Validar titulo del modal', async () => {
      await expect(practiceFormPage.modalTitle).toHaveText('Thanks for submitting the form');
    });

    await test.step('Validar valores del modal', async () => {
      const expectedModalValues: Array<[string, string]> = [
        ['Student Name', `${testData.firstName} ${testData.lastName}`],
        ['Student Email', testData.email],
        ['Gender', testData.gender],
        ['Mobile', testData.mobile],
        ['Date of Birth', testData.dateOfBirthModal],
        ['Subjects', testData.subjects.join(', ')],
        ['Hobbies', testData.hobbies.join(', ')],
        ['Picture', testData.picture],
        ['Address', testData.address],
        ['State and City', `${testData.state} ${testData.city}`],
      ];

      for (const [label, value] of expectedModalValues) {
        await expect(practiceFormPage.getModalValueByLabel(label)).toHaveText(value);
      }
    });

    await test.step('Validar textos clave en el modal', async () => {
      const keyTexts = [testData.firstName, testData.lastName, testData.email];

      for (const text of keyTexts) {
        await expect(practiceFormPage.modalContent).toContainText(text);
      }
    });
  });

  test('muestra error al enviar sin campos obligatorios', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);

    await test.step('Abrir formulario sin diligenciar datos', async () => {
      await practiceFormPage.visit();
    });

    await test.step('Intentar enviar formulario vacio', async () => {
      await practiceFormPage.submit();
    });

    await test.step('Validar que no se muestre modal de envio exitoso', async () => {
      await expect(practiceFormPage.modalTitle).not.toBeVisible();
    });

    await test.step('Validar que los campos obligatorios queden invalidos', async () => {
      const requiredInputs = [
        practiceFormPage.firstNameInput,
        practiceFormPage.lastNameInput,
        practiceFormPage.mobileInput,
      ];

      for (const input of requiredInputs) {
        const isValid = await input.evaluate((element: HTMLInputElement) => element.checkValidity());
        expect(isValid).toBe(false);
      }

      const genderIsValid = await page
        .locator('#gender-radio-1')
        .evaluate((element: HTMLInputElement) => element.checkValidity());
      expect(genderIsValid).toBe(false);
    });
  });
});

