
import React, { useEffect, useState } from 'react';

const MemoBotAvatar = ({ 
  isListening = false,
  isThinking = false,
  isSpeaking = false
}) => {
  const [blinkState, setBlinkState] = useState(false);
  
  // Control random blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 200);
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Determine bot state and appropriate styles
  const getBotState = () => {
    if (isListening) return 'listening';
    if (isThinking) return 'thinking';
    if (isSpeaking) return 'speaking';
    return 'idle';
  };
  
  const botState = getBotState();
  
  return (
    <div className="w-full h-full relative bg-soft-blue-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
      {/* Robot face */}
      <div className="w-4/5 h-4/5 bg-white rounded-full flex flex-col items-center justify-center relative">
        {/* Eyes */}
        <div className="flex w-1/2 justify-between mb-2">
          <div className={`w-4 h-${blinkState ? '1' : '4'} rounded-full bg-dark-purple transition-all duration-200`}></div>
          <div className={`w-4 h-${blinkState ? '1' : '4'} rounded-full bg-dark-purple transition-all duration-200`}></div>
        </div>
        
        {/* Mouth based on state */}
        {botState === 'idle' && (
          <div className="w-10 h-1 bg-dark-purple rounded-full"></div>
        )}
        
        {botState === 'listening' && (
          <div className="w-8 h-8 rounded-full border-4 border-dark-purple animate-pulse"></div>
        )}
        
        {botState === 'thinking' && (
          <div className="w-10 h-3 flex items-center justify-center space-x-1">
            <span className="w-2 h-2 bg-dark-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-dark-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-dark-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        )}
        
        {botState === 'speaking' && (
          <div className="w-10 h-3 flex items-center justify-center">
            <div className="flex space-x-1">
              <span className="w-1 h-2 bg-dark-purple rounded-sm animate-sound" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1 h-4 bg-dark-purple rounded-sm animate-sound" style={{ animationDelay: '100ms' }}></span>
              <span className="w-1 h-3 bg-dark-purple rounded-sm animate-sound" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1 h-5 bg-dark-purple rounded-sm animate-sound" style={{ animationDelay: '250ms' }}></span>
              <span className="w-1 h-2 bg-dark-purple rounded-sm animate-sound" style={{ animationDelay: '75ms' }}></span>
            </div>
          </div>
        )}
      </div>
      
      {/* Antenna */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-1 h-6 bg-dark-purple"></div>
        <div className={`w-3 h-3 rounded-full ${botState === 'thinking' || botState === 'speaking' ? 'bg-ocean-blue animate-pulse' : 'bg-dark-purple'}`}></div>
      </div>
    </div>
  );
};

export default MemoBotAvatar;
