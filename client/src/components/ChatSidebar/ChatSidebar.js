import React, { useState, useRef, useEffect } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button, InputGroup, Input } from 'reactstrap';
import '../../styles/ChatSidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatResponse } from '../../redux/actions/ChatActions';

const ChatSidebar = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageText, setEditingMessageText] = useState('');

  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const relatedNewsData = useSelector(state => state.RelatedNewsDataReducer);
  const { response: aiResponseMessage, loading: aiResponseLoading, error: aiResponseError } = useSelector(state => state.ChatReducer);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!aiResponseLoading) {
      if (aiResponseMessage) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const index = updatedMessages.findIndex(msg => msg.isThinking);

          if (index !== -1) {
            updatedMessages[index] = {
              ...updatedMessages[index],
              text: aiResponseMessage,
              sender: 'ai',
              isThinking: false,
              timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
            };
          } else {

            updatedMessages.push({
              id: Date.now(),
              text: aiResponseMessage,
              sender: 'ai',
              isThinking: false,
              timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
            });
          }
          return updatedMessages;
        });
      } else if (aiResponseError) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const index = updatedMessages.findIndex(msg => msg.isThinking);
          const errorMessageText = `Üzgünüm, bir hata oluştu: ${aiResponseError}. Lütfen tekrar deneyin.`;

          if (index !== -1) {
            updatedMessages[index] = {
              ...updatedMessages[index],
              text: errorMessageText,
              sender: 'ai',
              isThinking: false,
              timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
            };
          } else {
            updatedMessages.push({
              id: Date.now(),
              text: errorMessageText,
              sender: 'ai',
              isThinking: false,
              timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
            });
          }
          return updatedMessages;
        });
      }
    }
  }, [aiResponseMessage, aiResponseLoading, aiResponseError]);


  const handleSendMessage = () => {
    const url = "http://localhost:8000/user_prompt";
    if (newMessage.trim() !== '') {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };

      const fullHistory = [...messages, userMessage].map(msg => ({
        sender: msg.sender,
        message: msg.text
      }));

      const conversationHistory = fullHistory.slice(-10);

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');

      const thinkingMessageId = Date.now() + 1;
      const thinkingMessage = {
        id: thinkingMessageId,
        text: 'Düşünüyor',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        isThinking: true
      };
      setMessages((prevMessages) => [...prevMessages, thinkingMessage]);

      dispatch(fetchChatResponse(url,
        {
          "prompt": userMessage.text,
          "data": relatedNewsData,
          "conversation_history": conversationHistory
        }
      ));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (editingMessageId !== null) {
        handleUpdateMessage();
      } else {
        handleSendMessage();
      }
    }
  };

  const handleEditClick = (messageId, currentText) => {
    setEditingMessageId(messageId);
    setEditingMessageText(currentText);
    setNewMessage(currentText);
  };

  const handleUpdateMessage = () => {
    if (editingMessageText.trim() !== '') {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === editingMessageId ? { ...msg, text: editingMessageText, timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) + " (düzenlendi)" } : msg
        )
      );
      setEditingMessageId(null);
      setEditingMessageText('');
      setNewMessage('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingMessageText('');
    setNewMessage('');
  };


  return (
    <Offcanvas
      direction="end"
      isOpen={isOpen}
      toggle={toggleChat}
      className="chat-sidebar"
    >
      <OffcanvasHeader toggle={toggleChat}>
        <span style={{ color: "blue" }}>Haber</span><span style={{ color: "green" }}>AI</span>
      </OffcanvasHeader>
      <OffcanvasBody className="d-flex flex-column">
        <div className="chat-messages-container flex-grow-1 overflow-auto">
          {messages.length === 0 ? (
            <p className="text-muted text-center mt-3">Henüz mesaj yok. Bir mesaj göndererek sohbete başlayın!</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender} ${msg.isThinking ? 'thinking-message' : ''}`}>
                <div className="message-bubble-wrapper">
                  <div className="message-bubble">
                    {msg.text}
                    {msg.isThinking && (
                      <>
                        <span></span>
                        <span></span>
                        <span></span>
                      </>
                    )}
                  </div>
                  {msg.sender === 'user' && !aiResponseLoading && (
                    <div className="message-actions">
                      {editingMessageId === msg.id ? (
                        <Button
                          color="link"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="cancel-edit-btn"
                        >
                          İptal
                        </Button>
                      ) : (
                        <Button
                          color="link"
                          size="sm"
                          onClick={() => handleEditClick(msg.id, msg.text)}
                          className="edit-message-btn"
                        >
                          Düzenle
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                <div className="message-timestamp">
                  {msg.timestamp}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area mt-auto p-2 border-top">
          <InputGroup>
            <Input
              type="textarea"
              rows="1"
              placeholder={editingMessageId !== null ? "Mesajı düzenle..." : "Mesajınızı buraya yazın..."}
              value={editingMessageId !== null ? editingMessageText : newMessage}
              onChange={(e) => {
                if (editingMessageId !== null) {
                  setEditingMessageText(e.target.value);
                } else {
                  setNewMessage(e.target.value);
                }
              }}
              onKeyPress={handleKeyPress}
              className="chat-textarea"
              disabled={aiResponseLoading}
            />
            {editingMessageId !== null ? (
              <Button color="success" onClick={handleUpdateMessage} disabled={aiResponseLoading || editingMessageText.trim() === ''}>
                Güncelle
              </Button>
            ) : (
              <Button color="primary" onClick={handleSendMessage} disabled={aiResponseLoading || newMessage.trim() === ''}>
                Gönder
              </Button>
            )}
          </InputGroup>
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default ChatSidebar;