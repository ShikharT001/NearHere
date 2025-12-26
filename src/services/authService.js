// src/services/authService.js
import { apiRequest } from './api';

export const login = (data) =>
  apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
