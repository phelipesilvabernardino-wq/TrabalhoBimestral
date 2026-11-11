
export const API_URL = 'http://localhost:3001/api';

export const formatCurrency = (value: number | string) => {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
