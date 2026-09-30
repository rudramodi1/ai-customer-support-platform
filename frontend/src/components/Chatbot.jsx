import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, User, Bot, Loader2, AlertCircle } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI support assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: 'Guest', email: 'guest@example.com' }); // Mocked for now
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat/', {
        customer_name: userDetails.name,
        email: userDetails.email,
        message: userMessage
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
      
      if (response.data.ticket_created) {
        setMessages(prev => [...prev, { 
          role: 'system', 
          content: "Your support ticket has been created. Our team will contact you."
        }]);
      }
    } catch (error) {
       // If AI parsing errors or API drops entirely, fallback to manually creating the ticket 
      try {
         await axios.post('http://127.0.0.1:8000/api/tickets/', {
            customer_name: userDetails.name,
            email: userDetails.email,
            issue_description: userMessage
         });
         setMessages(prev => [...prev, { 
           role: 'assistant', 
           content: "I'm having trouble understanding right now. Let me create a support ticket for you."
         }]);
         setMessages(prev => [...prev, { 
           role: 'system', 
           content: "Your support ticket has been created. Our team will contact you."
         }]);
      } catch (fallbackError) {
         setMessages(prev => [...prev, { role: 'system', content: 'Connection failed entirely. Please try again later.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <h2 className="font-semibold text-lg">AI Support Agent</h2>
        </div>
        <div className="flex items-center gap-2 text-primary-100 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          Online
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : msg.role === 'system'
                  ? 'bg-orange-50 text-orange-800 border border-orange-200 w-full text-sm flex items-start gap-2'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.role === 'system' && <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
              <span className="text-gray-500 text-sm">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg px-4 py-2 transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
