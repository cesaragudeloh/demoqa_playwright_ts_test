import path from 'path';
import { expect, test } from '@playwright/test';
import { PracticeFormPage } from '../../pages/PracticeFormPage';
import { buildPracticeFormData } from '../../src/data/practiceFormFactory';

test.describe('DemoQA Practice Form @ui', () => {
  test('[@smoke] completa y envia el formulario exitosamente', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);
    const formData = buildPracticeFormData();
    const filePath = path.resolve(__dirname, `../../fixtures/${formData.picture}`);

    await test.step('Abrir formulario y diligenciar todos los campos', async () => {
      await practiceFormPage.visit();
      await practiceFormPage.fillCompleteForm(formData, filePath);
    });

    await test.step('Enviar formulario', async () => {
      await practiceFormPage.submit();
    });

    await test.step('Validar titulo del modal', async () => {
      await expect(practiceFormPage.modalTitle).toHaveText('Thanks for submitting the form');
    });

    await test.step('Validar valores del modal', async () => {
      const expectedModalValues: Array<[string, string]> = [
        ['Student Name', `${formData.firstName} ${formData.lastName}`],
        ['Student Email', formData.email],
        ['Gender', formData.gender],
        ['Mobile', formData.mobile],
        ['Date of Birth', formData.dateOfBirthModal],
        ['Subjects', formData.subjects.join(', ')],
        ['Hobbies', formData.hobbies.join(', ')],
        ['Picture', formData.picture],
        ['Address', formData.address],
        ['State and City', `${formData.state} ${formData.city}`],
      ];

      for (const [label, value] of expectedModalValues) {
        await expect(practiceFormPage.getModalValueByLabel(label)).toHaveText(value);
      }
    });
  });

  test('[@regression] muestra error al enviar sin campos obligatorios', async ({ page }) => {
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

