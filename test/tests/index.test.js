import { testProcessors } from './testProcessors.test.js';
import { testResponses } from './testResponses.test.js';

export const runTests = async() => {
  await testResponses();
  await testProcessors();
};
