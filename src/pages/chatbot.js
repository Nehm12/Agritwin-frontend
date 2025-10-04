import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour! 👋 Comment puis-je vous aider aujourd'hui?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const quickReplies = [
    { id: 1, text: "Comment créer un champ?", icon: "🌱" },
    { id: 2, text: "Lancer une simulation", icon: "📊" },
    { id: 3, text: "Tarifs et abonnements", icon: "💳" },
    { id: 4, text: "Support technique", icon: "🔧" }
  ];

  const botResponses = {
    'comment créer un champ': "Pour créer un champ, allez dans 'Mes Champs' puis cliquez sur le bouton '+ Nouveau Champ'. Vous pourrez ensuite tracer votre parcelle sur la carte et ajouter les informations de culture.",
    'lancer une simulation': "Pour lancer une simulation, sélectionnez d'abord un champ, puis allez dans l'onglet 'Simulations'. Configurez vos paramètres (irrigation, fertilisation, climat) et cliquez sur 'Lancer la simulation'.",
    'tarifs': "Nous proposons 3 formules: Starter (Gratuit), Pro (29€/mois) et Enterprise (sur devis). Chaque formule est adaptée à vos besoins spécifiques.",
    'support': "Notre équipe support est disponible du lundi au vendredi de 9h à 18h. Vous pouvez aussi nous contacter par email à support@agritwin.com",
    'default': "Je suis là pour vous aider! Vous pouvez me poser des questions sur l'utilisation de la plateforme, les fonctionnalités disponibles, ou demander de l'aide technique."
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('champ') || message.includes('créer') || message.includes('parcelle')) {
      return botResponses['comment créer un champ'];
    } else if (message.includes('simulation') || message.includes('simuler')) {
      return botResponses['lancer une simulation'];
    } else if (message.includes('prix') || message.includes('tarif') || message.includes('abonnement') || message.includes('coût')) {
      return botResponses['tarifs'];
    } else if (message.includes('support') || message.includes('aide') || message.includes('problème') || message.includes('bug')) {
      return botResponses['support'];
    } else if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return "Bonjour! Ravi de vous aider. Que puis-je faire pour vous aujourd'hui?";
    } else if (message.includes('merci')) {
      return "Avec plaisir! N'hésitez pas si vous avez d'autres questions. 😊";
    } else {
      return botResponses['default'];
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply.text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-90' 
            : 'bg-gradient-to-br from-emerald-500 to-green-600 hover:shadow-xl hover:scale-110'
        }`}
        aria-label="Chat support"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
            1
          </span>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-white">
                  <h3 className="font-bold">AgriTwin Support</h3>
                  <p className="text-xs text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    En ligne
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-emerald-500'
                      : 'bg-white border-2 border-emerald-200'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <div
                  className={`max-w-[70%] ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  } flex flex-col gap-1`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-emerald-500 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 px-2">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-white border-2 border-emerald-200 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Réponses rapides:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <span>{reply.icon}</span>
                    <span>{reply.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ChatSupport;