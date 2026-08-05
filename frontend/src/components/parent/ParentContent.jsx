import React, { useState } from 'react';
import { ACCENTS } from '../../constants/theme';
import { ChatPanel } from '../ui/ChatPanel';
import { SettingsPanel } from '../ui/SettingsPanel';
import { DEFAULT_PARENT_NAME } from './useParentData';
import DashboardHome from './DashboardHome';
import ChildrenView from './ChildrenView';
import ResultsView from './ResultsView';
import FeesView from './FeesView';
import AnnouncementsView from './AnnouncementsView';
import PaymentModal from './PaymentModal';

const accent = ACCENTS.PARENT;
const isMine = msg => msg.sender_username === 'parent_ahmed' || msg.sender === 4;

export default function ParentContent({ activeTab, onNavigate, user, onLogout, data }) {
  const [invoiceToPay, setInvoiceToPay] = useState(null);
  const parentName = user?.name || DEFAULT_PARENT_NAME;
  const { child, invoices, announcements, chatMessages, sendMessage, payInvoice, nextDue, isPaidThisMonth } = data;

  const handlePay = (method) => {
    if (!invoiceToPay) return;
    payInvoice(invoiceToPay.id, method);
    setInvoiceToPay(null);
  };

  let view;
  switch (activeTab) {
    case 'dashboard':
      view = <DashboardHome parentName={parentName} child={child} chatMessages={chatMessages} announcements={announcements} isPaidThisMonth={isPaidThisMonth} nextDue={nextDue} onNavigate={onNavigate} onPayInvoice={setInvoiceToPay} accent={accent} />;
      break;
    case 'children': view = <ChildrenView child={child} accent={accent} />; break;
    case 'results': view = <ResultsView accent={accent} />; break;
    case 'fees': view = <FeesView invoices={invoices} onPayInvoice={setInvoiceToPay} accent={accent} />; break;
    case 'messages': view = <ChatPanel title="Message Teacher" accent={accent} messages={chatMessages} isMine={isMine} onSend={sendMessage} placeholder="Type your message..." />; break;
    case 'announcements': view = <AnnouncementsView announcements={announcements} accent={accent} />; break;
    case 'settings': view = <SettingsPanel accent={accent} notifText="Receive fee, attendance and message alerts via email." checkboxAccentClass="accent-violet-500" onLogout={onLogout} />; break;
    default: view = null;
  }

  return (
    <>
      {view}
      {invoiceToPay && <PaymentModal invoice={invoiceToPay} onPay={handlePay} onClose={() => setInvoiceToPay(null)} />}
    </>
  );
}
