export interface PracticeFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  dateOfBirth: string;
  dateOfBirthModal: string;
  subjects: string[];
  hobbies: string[];
  picture: string;
  address: string;
  state: string;
  city: string;
}

export const testData: PracticeFormData = {
  firstName: 'Juan',
  lastName: 'Perez',
  email: 'juan.perez@example.com',
  gender: 'Male',
  mobile: '3001234567',
  dateOfBirth: '10 May 1990',
  dateOfBirthModal: '10 May,1990',
  subjects: ['Maths', 'English'],
  hobbies: ['Sports', 'Music'],
  picture: 'test-file.txt',
  address: 'Calle 123 #45-67',
  state: 'NCR',
  city: 'Delhi',
};

