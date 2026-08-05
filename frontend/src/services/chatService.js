import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getChatMessages = async (contactId) => {
  try {
    const res = await apiClient.get(`/chat/messages/thread/${contactId}/`);
    return res.data;
  } catch (e) {
    // Find current user role to match ID
    const token = localStorage.getItem('access_token');
    let myId = 1; // default admin
    if (token) {
      if (token.includes('STUDENT')) myId = 3;
      else if (token.includes('TEACHER')) myId = 2;
      else if (token.includes('PARENT')) myId = 4;
    }
    return localMockState.chat_messages.filter(
      msg => (msg.sender === myId && msg.recipient === parseInt(contactId)) ||
             (msg.sender === parseInt(contactId) && msg.recipient === myId)
    );
  }
};

export const sendChatMessage = async (contactId, messageText) => {
  try {
    const res = await apiClient.post('/chat/messages/', {
      recipient: parseInt(contactId),
      message: messageText
    });
    return res.data;
  } catch (e) {
    const token = localStorage.getItem('access_token');
    let myId = 1;
    let myUsername = 'admin';
    if (token) {
      if (token.includes('STUDENT')) { myId = 3; myUsername = 'student_zayd'; }
      else if (token.includes('TEACHER')) { myId = 2; myUsername = 'teacher_ahmed'; }
      else if (token.includes('PARENT')) { myId = 4; myUsername = 'parent_ahmed'; }
    }
    const newMsg = {
      id: localMockState.chat_messages.length + 1,
      sender: myId,
      sender_username: myUsername,
      recipient: parseInt(contactId),
      recipient_username: contactId === '2' ? 'teacher_ahmed' : (contactId === '3' ? 'student_zayd' : 'admin'),
      message: messageText,
      timestamp: new Date().toISOString(),
      is_read: false
    };
    localMockState.chat_messages.push(newMsg);
    return newMsg;
  }
};
