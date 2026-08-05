import { useState, useEffect } from 'react';
import { getStudents } from '../../services/studentService';
import { getInvoices, payInvoice as payInvoiceRequest } from '../../services/billingService';
import { getAnnouncements } from '../../services/announcementService';
import { getChatMessages, sendChatMessage } from '../../services/chatService';

export const DEFAULT_PARENT_NAME = 'Mrs. Sarah Khan';
export const DEFAULT_CHILD = { name: 'Muhammad Ali', current_level: 'MIDDLE' };

export default function useParentData() {
  const [students, setStudents] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [studs, invs, anns] = await Promise.all([
        getStudents(), getInvoices(3), getAnnouncements(),
      ]);
      setStudents(studs);
      setInvoices(invs);
      setAnnouncements(anns);
      try {
        setChatMessages(await getChatMessages(2));
      } catch { /* ignore */ }
    };
    fetchData();
  }, []);

  const sendMessage = async (text) => {
    const msg = await sendChatMessage(2, text);
    setChatMessages(prev => [...prev, msg]);
  };

  const payInvoice = async (invoiceId, method) => {
    await payInvoiceRequest(invoiceId, method);
    setInvoices(prev => prev.map(inv => (inv.id === invoiceId ? { ...inv, status: 'PAID', payment_method: method } : inv)));
  };

  const child = students[0] || DEFAULT_CHILD;
  const nextDue = invoices.find(i => i.status === 'UNPAID');

  return { child, invoices, announcements, chatMessages, sendMessage, payInvoice, nextDue, isPaidThisMonth: !nextDue };
}
