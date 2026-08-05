import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getInvoices = async (studentId) => {
  try {
    const res = await apiClient.get(`/accounts/invoices/?student=${studentId}`);
    return res.data;
  } catch (e) {
    return localMockState.invoices.filter(i => !studentId || i.student === parseInt(studentId));
  }
};

export const payInvoice = async (id, paymentMethod) => {
  try {
    const res = await apiClient.patch(`/accounts/invoices/${id}/`, { status: 'PAID', payment_method: paymentMethod });
    return res.data;
  } catch (e) {
    const inv = localMockState.invoices.find(i => i.id === parseInt(id));
    if (inv) {
      inv.status = 'PAID';
      inv.payment_method = paymentMethod;
      return inv;
    }
    throw new Error('Invoice not found');
  }
};

export const getSalaries = async () => {
  try {
    const res = await apiClient.get('/accounts/salaries/');
    return res.data;
  } catch (e) {
    return localMockState.salaries;
  }
};

export const getFeeStructures = async () => {
  try {
    const res = await apiClient.get('/accounts/fees/');
    return res.data;
  } catch (e) {
    return localMockState.fee_structures;
  }
};
