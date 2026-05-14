import type { PracticeFormData } from '../../fixtures/testData';

export function buildPracticeFormData(seed = Date.now()): PracticeFormData {
  const unique = String(seed).slice(-6);

  return {
    firstName: `Juan${unique}`,
    lastName: 'Perez',
    email: `juan.${unique}@example.com`,
    gender: 'Male',
    mobile: `3${String(seed).slice(-9)}`,
    dateOfBirth: '10 May 1990',
    dateOfBirthModal: '10 May,1990',
    subjects: ['Maths', 'English'],
    hobbies: ['Sports', 'Music'],
    picture: 'test-file.txt',
    address: 'Calle 123 #45-67',
    state: 'NCR',
    city: 'Delhi',
  };
}

