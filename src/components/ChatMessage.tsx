
import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  // Format bullet points for bot messages
  const formattedText = isBot 
    ? message.text.split('\n').map((line, i) => (
        <div key={i} className="mb-1">
          {line.startsWith('•') ? (
            <div className="flex">
              <span className="mr-2">{line.substring(0, 1)}</span>
              <span>{line.substring(1)}</span>
            </div>
          ) : (
            line
          )}
        </div>
      ))
    : message.text;

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          isBot 
            ? 'bg-white text-gray-800 shadow-sm' 
            : 'bg-ocean-blue text-white'
        }`}
      >
        <div className="text-sm">{formattedText}</div>
        <div 
          className={`text-xs mt-1 ${
            isBot ? 'text-gray-500' : 'text-blue-100'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
