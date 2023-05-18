import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WhatsAppChat() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [chatId, setChatId] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleCreateChat = async () => {
    try {
      const response = await axios.post(
        `https://green-api.com/api/rest/chats/create`,
        {
          idInstance: idInstance,
          apiTokenInstance: apiTokenInstance,
          phoneNumber: phoneNumber,
        }
      );
      const chatId = response.data.chatId;
      setChatId(chatId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post(
        `https://green-api.com/api/rest/chats/sendMessage`,
        {
          idInstance: idInstance,
          apiTokenInstance: apiTokenInstance,
          chatId: chatId,
          message: message,
        }
      );
      setMessage(''); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleReceiveMessage = async () => {
    try {
      const response = await axios.get(
        `https://green-api.com/api/rest/chats/receiveMessage`,
        {
          params: {
            idInstance: idInstance,
            apiTokenInstance: apiTokenInstance,
            chatId: chatId,
          },
        }
      );
      const receivedMessage = response.data.message;
      setReceivedMessage(receivedMessage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label>ID инстанса:</label>
        <input
          type="text"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />
      </div>
      <div>
        <label>API токен инстанса:</label>
        <input
          type="text"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
      </div>
      <div>
        <label>Номер телефона получателя:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleCreateChat}>Создать новый чат</button>
      </div>
      <div>
        <label>Сообщение:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
      <div>
        <button onClick={handleReceiveMessage}>Получить сообщение</button>
        {receivedMessage && (
          <div>
            <label>Полученное сообщение:</label>
            <div>{receivedMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WhatsAppChat;


