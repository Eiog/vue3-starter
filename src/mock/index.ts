import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import mocks from './mocks';

export function setupProdMockServer() {
  createProdMockServer([...mocks]);
}