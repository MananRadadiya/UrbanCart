/**
 * URBAN CART - AI Shopping Assistant Component
 * 
 * Floating chatbot UI with product recommendation intent
 * Non-intrusive, cleanly isolated, reusable architecture
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Hi! 👋 I\'m your shopping assistant. Need help finding something?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI response (architecture only - no real AI)
  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse = '';

      // Intent recognition (simple pattern matching)
      const lowerText = text.toLowerCase();

      if (lowerText.includes('men')) {
        aiResponse = '👔 Check out our Men\'s Collection! We have premium styles for every occasion. Would you like me to show you the latest arrivals?';
      } else if (lowerText.includes('women')) {
        aiResponse = '👗 Explore our Women\'s Collection with exclusive designs. Ready to find something special?';
      } else if (lowerText.includes('unisex')) {
        aiResponse = '✨ Our Unisex Collection has timeless pieces for everyone. What\'s your style?';
      } else if (lowerText.includes('accessories')) {
        aiResponse = '🎁 Perfect! Our Accessories collection completes any outfit. Browse our curated selection?';
      } else if (lowerText.includes('new') || lowerText.includes('latest')) {
        aiResponse = '🆕 Fresh arrivals just added! Want to explore what\'s trending right now?';
      } else if (lowerText.includes('recommend') || lowerText.includes('suggest')) {
        aiResponse = '💡 I\'d love to help! Are you looking for something specific? (Men, Women, Unisex, or Accessories?)';
      } else if (lowerText.includes('price') || lowerText.includes('sale')) {
        aiResponse = '💰 We have great prices! Visit our Shop page to explore with filters for your budget.';
      } else if (lowerText.includes('help') || lowerText.includes('support')) {
        aiResponse = '🙋 How can I assist? I can help you find products by category, answer questions, or guide you through the site.';
      } else {
        aiResponse = '😊 That\'s interesting! I can help you find products. Try mentioning a category like Men, Women, Unisex, or Accessories!';
      }

      const aiMessage = {
        id: userMessage.id + 1,
        type: 'ai',
        text: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="ai-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Shopping Assistant"
        title="Ask for help"
      >
        <span className="chat-icon">💬</span>
        {!isOpen && messages.length > 1 && (
          <motion.span
            className="chat-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {messages.length - 1}
          </motion.span>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-title">
                <span className="title-icon">🤖</span>
                <h3>Shopping Assistant</h3>
              </div>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages Container */}
            <div className="messages-container">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-bubble">{message.text}</div>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              className="chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="chat-input"
                aria-label="Chat message input"
              />
              <button
                type="submit"
                className="send-button"
                aria-label="Send message"
                disabled={!inputValue.trim()}
              >
                ➤
              </button>
            </form>

            {/* Quick Actions */}
            <div className="quick-actions">
              <button
                className="quick-action"
                onClick={() => handleSendMessage('Show me men products')}
              >
                👔 Men
              </button>
              <button
                className="quick-action"
                onClick={() => handleSendMessage('Show me women products')}
              >
                👗 Women
              </button>
              <button
                className="quick-action"
                onClick={() => handleSendMessage('What\'s new?')}
              >
                🆕 New
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
