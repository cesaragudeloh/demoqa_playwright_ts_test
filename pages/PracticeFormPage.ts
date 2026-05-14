import { Locator, Page } from '@playwright/test';
import type { PracticeFormData } from '../fixtures/testData';

export class PracticeFormPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly pictureInput: Locator;
  readonly currentAddressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly submitButton: Locator;

  readonly modalTitle: Locator;
  readonly modalContent: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.pictureInput = page.locator('#uploadPicture');
    this.currentAddressInput = page.locator('#currentAddress');
    this.stateInput = page.locator('#react-select-3-input');
    this.cityInput = page.locator('#react-select-4-input');
    this.submitButton = page.locator('#submit');

    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.modalContent = page.locator('.modal-content');
  }

  async visit(): Promise<void> {
    await this.page.goto('/automation-practice-form');
  }

  async fillName(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async selectGender(genderLabel: PracticeFormData['gender']): Promise<void> {
    await this.page.getByLabel(genderLabel, { exact: true }).check();
  }

  async fillMobile(mobile: string): Promise<void> {
    await this.mobileInput.fill(mobile);
  }

  async setDateOfBirth(dateText: string): Promise<void> {
    const [day, month, year] = dateText.split(' ');
    const dayPadded = day.padStart(2, '0');

    await this.dateOfBirthInput.click();
    await this.page.locator('.react-datepicker__year-select').selectOption(year);
    await this.page.locator('.react-datepicker__month-select').selectOption({
      label: month,
    });

    await this.page
      .locator(
        `.react-datepicker__day--0${dayPadded}:not(.react-datepicker__day--outside-month)`
      )
      .first()
      .click();
  }

  async addSubjects(subjects: string[]): Promise<void> {
    for (const subject of subjects) {
      await this.subjectsInput.click();
      await this.subjectsInput.fill(subject);

      const subjectOption = this.page
        .locator('.subjects-auto-complete__option')
        .filter({ hasText: subject })
        .first();

      await subjectOption.waitFor({ state: 'visible' });
      await subjectOption.click();
    }
  }

  async selectHobbies(hobbies: string[]): Promise<void> {
    for (const hobby of hobbies) {
      await this.page.getByLabel(hobby, { exact: true }).check();
    }
  }

  async uploadPicture(filePath: string): Promise<void> {
    await this.pictureInput.setInputFiles(filePath);
  }

  async fillAddress(address: string): Promise<void> {
    await this.currentAddressInput.fill(address);
  }

  async selectStateAndCity(state: string, city: string): Promise<void> {
    await this.stateInput.fill(state);
    await this.stateInput.press('Tab');

    await this.cityInput.fill(city);
    await this.cityInput.press('Tab');
  }

  async fillCompleteForm(formData: PracticeFormData, filePath: string): Promise<void> {
    await this.fillName(formData.firstName, formData.lastName);
    await this.fillEmail(formData.email);
    await this.selectGender(formData.gender);
    await this.fillMobile(formData.mobile);
    await this.setDateOfBirth(formData.dateOfBirth);
    await this.addSubjects(formData.subjects);
    await this.selectHobbies(formData.hobbies);
    await this.uploadPicture(filePath);
    await this.fillAddress(formData.address);
    await this.selectStateAndCity(formData.state, formData.city);
  }

  async submit(): Promise<void> {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  getModalValueByLabel(label: string): Locator {
    return this.page
      .locator('.table-responsive tbody tr', {
        has: this.page.locator('td', { hasText: label }),
      })
      .locator('td')
      .nth(1);
  }
}

