import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Award, Moon, Wallet, AlertTriangle, GraduationCap, CheckCircle, LogOut,
  Calendar, BookOpen, CreditCard, ChevronRight, FileText, Check, Printer,
  MessageSquare, Sparkles, Settings, Send
} from 'lucide-react';

export default function ParentDashboard() {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [islamicProfile, setIslamicProfile] = useState(null);
  const [islamicLogs, setIslamicLogs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);

  const sectionRoutes = {
    dashboard: '/dashboard',
    children: '/children',
    academics: '/academics',
    billing: '/billing',
    chat: '/chat',
    ai: '/ai',
    settings: '/settings',
    islamic: '/islamic'
  };

  const currentPath = location.pathname;
  const activeTab = Object.entries(sectionRoutes).find(([, path]) => path === currentPath)?.[0] || 'dashboard';

  const setActiveTab = (tab) => {
    navigate(sectionRoutes[tab], { replace: false });
  };

  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      navigate('/dashboard', { replace: true });
    }
  }, [currentPath, navigate]);

  // Billing payment states
  const [selectedInvoiceToPay, setSelectedInvoiceToPay] = useState(null);

  // Chat & AI states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInputText, setChatInputText] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { id: 1, sender: 'ai', text: "👋 Welcome! I am your AI Family Advisor. Ask me for recommendations or strategies to guide your child Zayd based on his performance and logs." }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showApiKeySetting, setShowApiKeySetting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.getAssessmentResults(3); // default child Zayd
      const ip = await api.getIslamicProfile(3);
      const logs = await api.getDailyProgressLogs(ip?.id || 1);
      const invs = await api.getInvoices(3);
      
      setAssessmentResults(results);
      setIslamicProfile(ip);
      setIslamicLogs(logs);
      setInvoices(invs);

      // Load conversation thread with Teacher Ahmed Bilal (ID 2)
      try {
        const msgs = await api.getChatMessages(2);
        setChatMessages(msgs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handlePayInvoice = async (method) => {
    if (!selectedInvoiceToPay) return;
    await api.payInvoice(selectedInvoiceToPay.id, method);
    
    // Update local state
    setInvoices(invoices.map(inv => inv.id === selectedInvoiceToPay.id ? { ...inv, status: 'PAID', payment_method: method } : inv));
    setSelectedInvoiceToPay(null);
    alert('Bill payment processed successfully through ' + method.replace('_', ' ') + '!');
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    try {
      const newMsg = await api.sendChatMessage(2, chatInputText.trim()); // Teacher Ahmed Bilal (ID 2)
      setChatMessages(prev => [...prev, newMsg]);
      setChatInputText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendAiMessage = async (e) => {
    e.preventDefault();
    if (!aiInputText.trim()) return;
    const userPrompt = aiInputText.trim();
    setAiInputText('');
    
    const userMsg = { id: Date.now(), sender: 'user', text: userPrompt };
    setAiMessages(prev => [...prev, userMsg]);
    setAiLoading(true);

    try {
      const aiReply = await api.askAI(userPrompt, 'PARENT');
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: aiReply };
      setAiMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errMsg = { id: Date.now() + 1, sender: 'ai', text: "❌ Failed to query AI. Check internet connectivity or the API key config in settings." };
      setAiMessages(prev => [...prev, errMsg]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSaveGeminiKey = (e) => {
    e.preventDefault();
    if (geminiKeyInput.trim()) {
      localStorage.setItem('gemini_api_key', geminiKeyInput.trim());
      alert('Gemini API key saved locally! Real-time responses are now enabled.');
    } else {
      localStorage.removeItem('gemini_api_key');
      alert('Gemini API key cleared. Running in simulated fallback mode.');
    }
    setShowApiKeySetting(false);
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #0b0f1a;
          --sidebar: #0f1524;
          --card: #151c2e;
          --card-hover: #1a2338;
          --border: #1e2a42;
          --text: #e8edf7;
          --text-muted: #8b9bb8;
          --text-dim: #6b7a99;
          --primary: #7c5cfc;
          --primary-hover: #6a4aef;
          --green: #22c55e;
          --green-bg: rgba(34, 197, 94, 0.12);
          --purple-soft: #a78bfa;
          --blue: #3b82f6;
          --orange: #f59e0b;
          --teal: #14b8a6;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .bf-portal {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          overflow-x: hidden;
        }
        .bf-portal .sidebar {
          width: 240px;
          min-height: 100vh;
          background: var(--sidebar);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 20px 16px;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
        }
        .bf-portal .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 8px 28px;
        }
        .bf-portal .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #7c5cfc, #22c55e);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
          font-weight: 700;
        }
        .bf-portal .logo-text {
          display: flex;
          flex-direction: column;
        }
        .bf-portal .logo-text strong {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .bf-portal .logo-text span {
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 1.2px;
          text-transform: uppercase;
          font-weight: 500;
        }
        .bf-portal .nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .bf-portal .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
        .bf-portal .nav-item:hover {
          background: rgba(124, 92, 252, 0.1);
          color: var(--text);
        }
        .bf-portal .nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 14px rgba(124, 92, 252, 0.35);
        }
        .bf-portal .nav-item svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
        .bf-portal .help-card {
          margin-top: auto;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
          text-align: left;
        }
        .bf-portal .help-card .help-icon {
          width: 40px;
          height: 40px;
          background: rgba(124, 92, 252, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        .bf-portal .help-card .help-icon svg {
          width: 22px;
          height: 22px;
          color: var(--primary);
        }
        .bf-portal .help-card h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .bf-portal .help-card p {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 14px;
          line-height: 1.4;
        }
        .bf-portal .btn-support {
          display: block;
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          font-family: inherit;
        }
        .bf-portal .btn-support:hover {
          background: var(--primary-hover);
        }
        .bf-portal .main {
          margin-left: 240px;
          flex: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .bf-portal .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 28px;
          border-bottom: 1px solid var(--border);
          background: rgba(11, 15, 26, 0.85);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .bf-portal .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        .bf-portal .menu-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          display: none;
        }
        .bf-portal .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 16px;
          max-width: 420px;
          width: 100%;
        }
        .bf-portal .search-box svg {
          width: 18px;
          height: 18px;
          color: var(--text-dim);
          flex-shrink: 0;
        }
        .bf-portal .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-size: 14px;
          width: 100%;
          font-family: inherit;
        }
        .bf-portal .search-box input::placeholder {
          color: var(--text-dim);
        }
        .bf-portal .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .bf-portal .notif {
          position: relative;
          background: var(--card);
          border: 1px solid var(--border);
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-muted);
        }
        .bf-portal .notif .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--primary);
          color: white;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bf-portal .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 4px 8px 4px 4px;
          border-radius: 12px;
          transition: background 0.2s;
          border: none;
          background: transparent;
          color: inherit;
          font-family: inherit;
        }
        .bf-portal .user-profile:hover {
          background: var(--card);
        }
        .bf-portal .user-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          width: 220px;
          background: #101726;
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          padding: 8px;
          z-index: 120;
        }
        .bf-portal .user-dropdown .option {
          width: 100%;
          border: none;
          background: transparent;
          color: var(--text);
          padding: 10px 12px;
          border-radius: 10px;
          text-align: left;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: inherit;
        }
        .bf-portal .user-dropdown .option:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .bf-portal .user-dropdown .separator {
          height: 1px;
          background: var(--border);
          margin: 6px 0;
        }
        .bf-portal .user-dropdown .danger {
          color: #fb7185;
        }
        .bf-portal .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a78bfa, #7c5cfc);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          overflow: hidden;
          border: 2px solid rgba(124, 92, 252, 0.3);
        }
        .bf-portal .user-info {
          display: flex;
          flex-direction: column;
        }
        .bf-portal .user-info .name {
          font-size: 13px;
          font-weight: 600;
        }
        .bf-portal .user-info .role {
          font-size: 11px;
          color: var(--text-dim);
        }
        .bf-portal .chevron {
          color: var(--text-dim);
          margin-left: 4px;
        }
        .bf-portal .content {
          padding: 24px 28px 40px;
          flex: 1;
        }
        .bf-portal .top-row {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          margin-bottom: 20px;
        }
        .bf-portal .greeting-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #151c2e 50%, #1a1530 100%);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .bf-portal .greeting-card::before {
          content: '';
          position: absolute;
          top: -40%;
          right: 10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(124, 92, 252, 0.15), transparent 70%);
          pointer-events: none;
        }
        .bf-portal .greeting-left h1 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bf-portal .greeting-left p {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .bf-portal .child-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bf-portal .child-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          border: 2px solid rgba(59, 130, 246, 0.3);
        }
        .bf-portal .child-details .label {
          font-size: 11px;
          color: var(--text-dim);
          margin-bottom: 2px;
        }
        .bf-portal .child-details .name {
          font-size: 15px;
          font-weight: 600;
        }
        .bf-portal .child-details .meta {
          font-size: 12px;
          color: var(--text-muted);
        }
        .bf-portal .greeting-illustration {
          flex-shrink: 0;
          width: 200px;
          height: 140px;
          position: relative;
        }
        .bf-portal .illustration-svg {
          width: 100%;
          height: 100%;
        }
        .bf-portal .schedule-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .bf-portal .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .bf-portal .card-header h3 {
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bf-portal .card-header h3 svg {
          width: 16px;
          height: 16px;
          color: var(--primary);
        }
        .bf-portal .view-link {
          font-size: 12px;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .bf-portal .view-link:hover {
          opacity: 0.8;
        }
        .bf-portal .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .bf-portal .schedule-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .bf-portal .schedule-item:hover {
          border-color: var(--border);
        }
        .bf-portal .schedule-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bf-portal .schedule-icon.math { background: rgba(124, 92, 252, 0.2); color: #a78bfa; }
        .bf-portal .schedule-icon.english { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
        .bf-portal .schedule-icon.science { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .bf-portal .schedule-icon svg {
          width: 18px;
          height: 18px;
        }
        .bf-portal .schedule-info {
          flex: 1;
        }
        .bf-portal .schedule-info .subj {
          font-size: 13px;
          font-weight: 600;
        }
        .bf-portal .schedule-info .time {
          font-size: 11px;
          color: var(--text-dim);
        }
        .bf-portal .schedule-footer {
          margin-top: 14px;
          text-align: right;
        }
        .bf-portal .mid-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .bf-portal .panel {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 20px;
        }
        .bf-portal .panel .card-header {
          margin-bottom: 14px;
        }
        .bf-portal .results-table {
          width: 100%;
        }
        .bf-portal .results-table .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          font-size: 13px;
        }
        .bf-portal .results-table .row:last-of-type {
          border-bottom: none;
        }
        .bf-portal .results-table .header-row {
          color: var(--text-dim);
          font-size: 12px;
          font-weight: 500;
          padding-bottom: 8px;
        }
        .bf-portal .results-table .marks {
          color: var(--green);
          font-weight: 600;
        }
        .bf-portal .panel-footer {
          margin-top: 12px;
          text-align: right;
        }
        .bf-portal .fee-status {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .bf-portal .paid-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--green-bg);
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 12px;
          padding: 14px 16px;
        }
        .bf-portal .paid-badge .icon-box {
          width: 40px;
          height: 40px;
          background: rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--green);
        }
        .bf-portal .paid-badge .icon-box svg {
          width: 22px;
          height: 22px;
        }
        .bf-portal .paid-badge .text {
          flex: 1;
          font-size: 14px;
          font-weight: 600;
          color: var(--green);
        }
        .bf-portal .paid-badge .check {
          width: 24px;
          height: 24px;
          background: var(--green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .bf-portal .paid-badge .check svg {
          width: 14px;
          height: 14px;
        }
        .bf-portal .next-due {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
        }
        .bf-portal .next-due .date {
          color: var(--text);
          font-weight: 600;
        }
        .bf-portal .btn-invoice {
          display: block;
          width: 100%;
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          border-radius: 10px;
          padding: 11px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .bf-portal .btn-invoice:hover {
          background: rgba(124, 92, 252, 0.1);
        }
        .bf-portal .messages-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bf-portal .msg-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px;
          border-radius: 10px;
          transition: background 0.2s;
          cursor: pointer;
        }
        .bf-portal .msg-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }
        .bf-portal .msg-icon {
          width: 36px;
          height: 36px;
          background: rgba(124, 92, 252, 0.15);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }
        .bf-portal .msg-icon svg {
          width: 16px;
          height: 16px;
        }
        .bf-portal .msg-content {
          flex: 1;
          min-width: 0;
        }
        .bf-portal .msg-content .title {
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bf-portal .msg-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }
        .bf-portal .msg-meta .time {
          font-size: 11px;
          color: var(--text-dim);
        }
        .bf-portal .dot {
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .bf-portal .bottom-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 20px;
        }
        .bf-portal .announcements-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bf-portal .ann-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
        }
        .bf-portal .ann-dot {
          width: 8px;
          height: 8px;
          background: var(--green);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .bf-portal .ann-item .text {
          flex: 1;
          color: var(--text);
        }
        .bf-portal .ann-item .date {
          font-size: 12px;
          color: var(--text-dim);
          white-space: nowrap;
        }
        .bf-portal .quick-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .bf-portal .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 18px 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          color: var(--text);
        }
        .bf-portal .action-btn:hover {
          background: rgba(124, 92, 252, 0.08);
          border-color: rgba(124, 92, 252, 0.3);
          transform: translateY(-2px);
        }
        .bf-portal .action-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bf-portal .action-icon svg {
          width: 22px;
          height: 22px;
        }
        .bf-portal .action-icon.download { background: rgba(124, 92, 252, 0.2); color: #a78bfa; }
        .bf-portal .action-icon.meeting { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
        .bf-portal .action-icon.contact { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
        .bf-portal .action-icon.timetable { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .bf-portal .action-btn span {
          font-size: 11px;
          font-weight: 500;
          text-align: center;
          line-height: 1.3;
          color: var(--text-muted);
        }
        .bf-portal .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: var(--text-dim);
          border-top: 1px solid var(--border);
        }
        .bf-portal .footer .heart {
          color: #ec4899;
        }
        @media (max-width: 1100px) {
          .bf-portal .mid-row {
            grid-template-columns: 1fr 1fr;
          }
          .bf-portal .mid-row .panel:last-child {
            grid-column: 1 / -1;
          }
          .bf-portal .quick-actions {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 900px) {
          .bf-portal .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s;
          }
          .bf-portal .sidebar.open {
            transform: translateX(0);
          }
          .bf-portal .main {
            margin-left: 0;
          }
          .bf-portal .menu-btn {
            display: block;
          }
          .bf-portal .top-row {
            grid-template-columns: 1fr;
          }
          .bf-portal .mid-row {
            grid-template-columns: 1fr;
          }
          .bf-portal .bottom-row {
            grid-template-columns: 1fr;
          }
          .bf-portal .greeting-illustration {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .bf-portal .content {
            padding: 16px;
          }
          .bf-portal .topbar {
            padding: 12px 16px;
          }
          .bf-portal .user-info {
            display: none;
          }
          .bf-portal .search-box {
            max-width: none;
          }
        }
      `}</style>

      <div className="bf-portal">
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="logo-text">
              <strong>BrightFuture</strong>
              <span>Parent Portal</span>
            </div>
          </div>

          <nav className="nav">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('children')}
              className={`nav-item ${activeTab === 'children' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              My Children
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('academics')}
              className={`nav-item ${activeTab === 'academics' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Exam Results
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('billing')}
              className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Fee Payments
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Teacher Messages
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('islamic')}
              className={`nav-item ${activeTab === 'islamic' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Announcements
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className={`nav-item ${activeTab === 'ai' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v2" />
                <path d="M12 19v2" />
                <path d="M3 12h2" />
                <path d="M19 12h2" />
                <path d="M5.6 5.6l1.4 1.4" />
                <path d="M17 17l1.4 1.4" />
                <path d="M5.6 18.4l1.4-1.4" />
                <path d="M17 7l1.4-1.4" />
                <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
              </svg>
              AI Advisor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </button>
          </nav>

          <div className="help-card">
            <div className="help-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <h4>Need Help?</h4>
            <p>We're here to assist you.</p>
            <button type="button" className="btn-support">
              Contact Support
            </button>
          </div>
        </aside>

        <div className="main">
          <header className="topbar">
            <div className="topbar-left">
              <button type="button" className="menu-btn" aria-label="Toggle menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <div className="search-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Search anything..." />
              </div>
            </div>
            <div className="topbar-right">
              <div className="notif">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="badge">3</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  className="user-profile"
                >
                  <div className="avatar">👩</div>
                  <div className="user-info">
                    <span className="name">{user?.name || 'Mrs. Sarah Khan'}</span>
                    <span className="role">Parent</span>
                  </div>
                  <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="user-dropdown">
                    <button type="button" className="option" onClick={() => { setProfileOpen(false); setActiveTab('settings'); }}>
                      Settings
                    </button>
                    <div className="separator" />
                    <button type="button" className="option" onClick={() => { switchRole('ADMIN'); setProfileOpen(false); }}>
                      Admin View
                    </button>
                    <button type="button" className="option" onClick={() => { switchRole('TEACHER'); setProfileOpen(false); }}>
                      Teacher View
                    </button>
                    <button type="button" className="option" onClick={() => { switchRole('STUDENT'); setProfileOpen(false); }}>
                      Student View
                    </button>
                    <button type="button" className="option" onClick={() => { switchRole('PARENT'); setProfileOpen(false); }}>
                      Parent View
                    </button>
                    <div className="separator" />
                    <button type="button" className="option danger" onClick={() => { logout(); setProfileOpen(false); }}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="content">
            {activeTab === 'dashboard' && (
              <>
                <div className="top-row">
                  <div className="greeting-card">
                    <div className="greeting-left">
                      <h1>Good Morning, {user?.name || 'Mrs. Sarah'}! 👋</h1>
                      <p>Stay connected with your child's learning journey.</p>
                      <div className="child-info">
                        <div className="child-avatar">👦</div>
                        <div className="child-details">
                          <div className="label">Current Child</div>
                          <div className="name">Muhammad Ali</div>
                          <div className="meta">Grade 8 &nbsp;•&nbsp; Roll No. 1024</div>
                        </div>
                      </div>
                    </div>
                    <div className="greeting-illustration">
                      <svg className="illustration-svg" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="40" y="115" width="140" height="8" rx="2" fill="#2a3550" />
                        <rect x="50" y="123" width="8" height="20" fill="#1e2a42" />
                        <rect x="162" y="123" width="8" height="20" fill="#1e2a42" />
                        <rect x="70" y="85" width="70" height="32" rx="3" fill="#3b4a6b" />
                        <rect x="74" y="88" width="62" height="24" rx="2" fill="#1a2338" />
                        <rect x="65" y="117" width="80" height="4" rx="1" fill="#4a5a7a" />
                        <circle cx="95" cy="70" r="16" fill="#f5c6a0" />
                        <ellipse cx="95" cy="58" rx="14" ry="10" fill="#2d2d2d" />
                        <rect x="82" y="85" width="26" height="30" rx="4" fill="#22c55e" />
                        <rect x="78" y="95" width="10" height="18" rx="3" fill="#f5c6a0" />
                        <rect x="102" y="95" width="10" height="18" rx="3" fill="#f5c6a0" />
                        <circle cx="145" cy="58" r="18" fill="#f5c6a0" />
                        <ellipse cx="145" cy="44" rx="16" ry="12" fill="#4a3728" />
                        <path d="M130 50 Q145 70 160 50" fill="#4a3728" />
                        <rect x="128" y="75" width="34" height="40" rx="6" fill="#7c5cfc" />
                        <rect x="122" y="85" width="12" height="22" rx="4" fill="#f5c6a0" />
                        <rect x="156" y="85" width="12" height="22" rx="4" fill="#f5c6a0" />
                        <path d="M155 25 C155 22 158 20 160 22 C162 20 165 22 165 25 C165 30 160 34 160 34 C160 34 155 30 155 25Z" fill="#ec4899" opacity="0.7" />
                        <path d="M175 45 C175 43 177 41 179 43 C181 41 183 43 183 45 C183 48 179 51 179 51 C179 51 175 48 175 45Z" fill="#a78bfa" opacity="0.6" />
                        <path d="M50 40 C50 38 52 36 54 38 C56 36 58 38 58 40 C58 43 54 46 54 46 C54 46 50 43 50 40Z" fill="#ec4899" opacity="0.5" />
                        <rect x="185" y="100" width="16" height="18" rx="2" fill="#3b4a6b" />
                        <ellipse cx="193" cy="95" rx="10" ry="8" fill="#22c55e" />
                        <ellipse cx="188" cy="90" rx="6" ry="5" fill="#16a34a" />
                        <ellipse cx="198" cy="92" rx="5" ry="4" fill="#16a34a" />
                      </svg>
                    </div>
                  </div>

                  <div className="schedule-card">
                    <div className="card-header">
                      <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Today's Schedule
                      </h3>
                      <button type="button" className="view-link">
                        View Timetable
                      </button>
                    </div>
                    <div className="schedule-list">
                      <div className="schedule-item">
                        <div className="schedule-icon math">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                        </div>
                        <div className="schedule-info">
                          <div className="subj">Mathematics</div>
                          <div className="time">09:00 AM - 10:00 AM</div>
                        </div>
                      </div>
                      <div className="schedule-item">
                        <div className="schedule-icon english">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                        </div>
                        <div className="schedule-info">
                          <div className="subj">English</div>
                          <div className="time">11:00 AM - 12:00 PM</div>
                        </div>
                      </div>
                      <div className="schedule-item">
                        <div className="schedule-icon science">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 3h6v2H9z" />
                            <path d="M10 5v4.5L6 17a2 2 0 0 0 1.7 3h8.6a2 2 0 0 0 1.7-3l-4-7.5V5" />
                          </svg>
                        </div>
                        <div className="schedule-info">
                          <div className="subj">Science</div>
                          <div className="time">01:00 PM - 02:00 PM</div>
                        </div>
                      </div>
                    </div>
                    <div className="schedule-footer">
                      <button type="button" className="view-link">
                        View Full Timetable →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mid-row">
                  <div className="panel">
                    <div className="card-header">
                      <h3>Recent Exam Results</h3>
                      <button type="button" className="view-link">
                        View All
                      </button>
                    </div>
                    <div className="results-table">
                      <div className="row header-row">
                        <span>Subject</span>
                        <span>Marks</span>
                      </div>
                      <div className="row">
                        <span>Mathematics</span>
                        <span className="marks">92/100</span>
                      </div>
                      <div className="row">
                        <span>English</span>
                        <span className="marks">88/100</span>
                      </div>
                      <div className="row">
                        <span>Science</span>
                        <span className="marks">90/100</span>
                      </div>
                      <div className="row">
                        <span>Computer</span>
                        <span className="marks">95/100</span>
                      </div>
                    </div>
                    <div className="panel-footer">
                      <button type="button" className="view-link">
                        View Full Results →
                      </button>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="card-header">
                      <h3>Fee Status</h3>
                    </div>
                    <div className="fee-status">
                      <div className="paid-badge">
                        <div className="icon-box">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                          </svg>
                        </div>
                        <span className="text">Paid This Month</span>
                        <div className="check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                      <div className="next-due">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Next Due Date
                        <span className="date">15 August 2026</span>
                      </div>
                      <button type="button" className="btn-invoice">
                        View Invoice
                      </button>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="card-header">
                      <h3>Teacher Messages</h3>
                      <button type="button" className="view-link">
                        View All
                      </button>
                    </div>
                    <div className="messages-list">
                      <div className="msg-item">
                        <div className="msg-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                        <div className="msg-content">
                          <div className="title">New message from Mathematics Teacher</div>
                          <div className="msg-meta">
                            <span className="time">2h ago</span>
                            <span className="dot" />
                          </div>
                        </div>
                      </div>
                      <div className="msg-item">
                        <div className="msg-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                        <div className="msg-content">
                          <div className="title">Parent-Teacher Meeting on Friday</div>
                          <div className="msg-meta">
                            <span className="time">1d ago</span>
                            <span className="dot" />
                          </div>
                        </div>
                      </div>
                      <div className="msg-item">
                        <div className="msg-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                        <div className="msg-content">
                          <div className="title">Assignment feedback available for Science</div>
                          <div className="msg-meta">
                            <span className="time">2d ago</span>
                            <span className="dot" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bottom-row">
                  <div className="panel">
                    <div className="card-header">
                      <h3>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--primary)' }}>
                          <path d="M3 11l18-5v12L3 14v-3z" />
                          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                        </svg>
                        School Announcements
                      </h3>
                      <button type="button" className="view-link">
                        View All
                      </button>
                    </div>
                    <div className="announcements-list">
                      <div className="ann-item">
                        <span className="ann-dot" />
                        <span className="text">Sports Day on June 15, 2026</span>
                        <span className="date">May 20</span>
                      </div>
                      <div className="ann-item">
                        <span className="ann-dot" />
                        <span className="text">Summer Vacation Notice</span>
                        <span className="date">May 18</span>
                      </div>
                      <div className="ann-item">
                        <span className="ann-dot" />
                        <span className="text">Parent Meeting on May 25, 2026</span>
                        <span className="date">May 16</span>
                      </div>
                      <div className="ann-item">
                        <span className="ann-dot" />
                        <span className="text">New Curriculum Update</span>
                        <span className="date">May 10</span>
                      </div>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="card-header">
                      <h3>Quick Actions</h3>
                    </div>
                    <div className="quick-actions">
                      <a href="#" className="action-btn" onClick={(e) => e.preventDefault()}>
                        <div className="action-icon download">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </div>
                        <span>
                          Download
                          <br />
                          Report Card
                        </span>
                      </a>
                      <a href="#" className="action-btn" onClick={(e) => e.preventDefault()}>
                        <div className="action-icon meeting">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <span>
                          Book Teacher
                          <br />
                          Meeting
                        </span>
                      </a>
                      <a href="#" className="action-btn" onClick={(e) => e.preventDefault()}>
                        <div className="action-icon contact">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                        <span>
                          Contact
                          <br />
                          Teacher
                        </span>
                      </a>
                      <a href="#" className="action-btn" onClick={(e) => e.preventDefault()}>
                        <div className="action-icon timetable">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                          </svg>
                        </div>
                        <span>
                          View
                          <br />
                          Timetable
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'children' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">My Children</h2>
                  <p className="text-slate-400 text-sm mt-1">Monitor each child’s profile, progress, and latest school activity.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass rounded-3xl p-6 border border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center text-2xl">👦</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Muhammad Ali</h3>
                        <p className="text-sm text-slate-400">Grade 8 • Roll No. 1024</p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-3 text-sm text-slate-300">
                      <div className="flex justify-between"><span>Class Teacher</span><span className="text-white font-semibold">Ustadh Ahmed Bilal</span></div>
                      <div className="flex justify-between"><span>Attendance</span><span className="text-emerald-400 font-semibold">96%</span></div>
                      <div className="flex justify-between"><span>Latest Result</span><span className="text-white font-semibold">92/100 Math</span></div>
                    </div>
                  </div>
                  <div className="glass rounded-3xl p-6 border border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-2xl">👧</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Areeba Ali</h3>
                        <p className="text-sm text-slate-400">Grade 5 • Roll No. 503</p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-3 text-sm text-slate-300">
                      <div className="flex justify-between"><span>Class Teacher</span><span className="text-white font-semibold">Miss Zara Noor</span></div>
                      <div className="flex justify-between"><span>Attendance</span><span className="text-emerald-400 font-semibold">94%</span></div>
                      <div className="flex justify-between"><span>Latest Result</span><span className="text-white font-semibold">89/100 English</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Academic Performance Logs</h2>
                  <p className="text-slate-400 text-sm mt-1">Review verified report cards, learning diagnostics, and teacher recommendations.</p>
                </div>
                {assessmentResults.map((res) => (
                  <div key={res.id} className="glass p-6 rounded-3xl border border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-md uppercase tracking-wider">Evaluation Result</span>
                        <h3 className="text-xl font-bold text-white mt-1.5">{res.assessment?.title}</h3>
                      </div>
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Overall Score</span>
                        <h4 className="text-2xl font-black text-emerald-400 mt-0.5">{res.score}%</h4>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Key Strengths</h4>
                        <p className="text-slate-300 text-xs leading-relaxed mt-2">{res.strengths}</p>
                      </div>
                      <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                        <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest">Growth Areas</h4>
                        <p className="text-slate-300 text-xs leading-relaxed mt-2">{res.weaknesses}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Outstanding Tuition Bills</h2>
                  <p className="text-slate-400 text-sm mt-1">Review student invoice statements and pay balances via mock online gateways.</p>
                </div>
                <div className="glass p-6 rounded-2xl max-w-3xl mx-auto space-y-4">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Invoice ID: BF-00{inv.id}</span>
                          <span className="text-slate-700 text-xs">•</span>
                          <span className="text-xs text-slate-500 font-semibold">Due: {inv.due_date}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Homeschooling fee package for level Level 1 Primary.</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-white">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Message Teacher</h2>
                  <p className="text-slate-400 text-sm mt-1">Direct message channel with Zayd's primary tutor Ustadh Ahmed Bilal.</p>
                </div>
                <div className="glass rounded-3xl p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-2">
                    {chatMessages.map((msg) => {
                      const isMe = msg.sender === 4;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMe ? 'bg-pink-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
                            <p>{msg.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <form onSubmit={handleSendChatMessage} className="border-t border-slate-800 pt-4 flex gap-3">
                    <input type="text" required value={chatInputText} onChange={(e) => setChatInputText(e.target.value)} placeholder="Type your message to Ustadh..." className="flex-1 px-4 py-3 border border-slate-700 bg-slate-900 text-xs text-white rounded-xl" />
                    <button type="submit" className="p-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl transition cursor-pointer">
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">AI Family Advisor</h2>
                  <p className="text-slate-400 text-sm mt-1">Get parenting strategies, learning gaps diagnostics, and home activities advice from AI.</p>
                </div>
                <div className="glass rounded-3xl p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
                    {aiMessages.map((msg) => {
                      const isUser = msg.sender === 'user';
                      return (
                        <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xl rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${isUser ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'}`}>
                            <p>{msg.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <form onSubmit={handleSendAiMessage} className="border-t border-slate-800 pt-4 flex gap-3">
                    <input type="text" required value={aiInputText} onChange={(e) => setAiInputText(e.target.value)} placeholder="Ask Gemini for child advising tips..." className="flex-1 px-4 py-3 border border-slate-700 bg-slate-900 text-xs text-white rounded-xl" />
                    <button type="submit" className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition cursor-pointer">
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Portal Settings</h2>
                  <p className="text-slate-400 text-sm mt-1">Manage the local Gemini API key used for live AI guidance and parent advisor responses.</p>
                </div>
                <div className="glass rounded-3xl p-6 max-w-2xl mx-auto">
                  <form onSubmit={handleSaveGeminiKey} className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                      Gemini API key
                    </label>
                    <input
                      type="password"
                      value={geminiKeyInput}
                      onChange={(e) => setGeminiKeyInput(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                      placeholder="Paste your Gemini API key here"
                    />
                    <div className="flex gap-3">
                      <button type="submit" className="px-4 py-2 rounded-xl bg-violet-600 text-white font-semibold text-xs hover:bg-violet-500 transition">
                        Save key
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setGeminiKeyInput('');
                          localStorage.removeItem('gemini_api_key');
                          alert('Gemini API key cleared. Running in simulated fallback mode.');
                        }}
                        className="px-4 py-2 rounded-xl border border-slate-700 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition"
                      >
                        Clear key
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'islamic' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Quran Recitation Tracker</h2>
                  <p className="text-slate-400 text-sm mt-1">Monitor daily Quran recitation logs, memorization pages, and tutor comments.</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="text-sm font-bold text-white">Current Surah</h4>
                      <p className="text-pink-400 font-semibold mt-2">Surah {islamicProfile?.current_surah}</p>
                      <p className="text-xs text-slate-400 mt-1">Starting Ayah {islamicProfile?.current_ayat}</p>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="text-sm font-bold text-white">Memorized Progress</h4>
                      <p className="text-emerald-400 font-semibold mt-2">{islamicProfile?.hifz_completed_pages} / 600 pages</p>
                    </div>
                  </div>
                  <div className="space-y-3 mt-6">
                    {islamicLogs.map((log) => (
                      <div key={log.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-pink-500/10 text-pink-400 rounded-md uppercase tracking-wider">{log.type}</span>
                            <span className="text-xs text-slate-400 font-medium">{log.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">{log.evaluation_grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <footer className="footer">
            © 2025 BrightFuture School. All rights reserved. <span className="heart">💜</span>
          </footer>
        </div>
      </div>
    </>
  );
}
