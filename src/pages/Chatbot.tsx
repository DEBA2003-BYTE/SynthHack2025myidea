import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Download, Mic, MicOff, Volume, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ChatMessage from '@/components/ChatMessage';
import MemoBotAvatar from '@/components/MemoBotAvatar';
import { callGeminiAPI } from '@/lib/gemini';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const name = sessionStorage.getItem('patientName') || '';
    const age = sessionStorage.getItem('patientAge') || '';
    const condition = sessionStorage.getItem('patientCondition') || '';

    setPatientName(name);
    setPatientAge(age);
    setPatientCondition(condition);

    const welcome = `Hello ${name} I am MemoBot your assistant You are ${age} and have ${condition} How can I help you`;
    setMessages([{
      id: 'welcome',
      text: welcome,
      sender: 'bot',
      timestamp: new Date()
    }]);

    if (isSpeechEnabled) {
      speakText(welcome);
    }

    synthRef.current = window.speechSynthesis;

    if ('webkitSpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => setIsListening(false);

      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
        toast({
          title: "Voice Error",
          description: "Could not use voice input",
          variant: "destructive"
        });
      };
    }

    return () => {
      synthRef.current?.cancel();
      recognitionRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      toast({ title: "Not supported", description: "Speech recognition not available", variant: "destructive" });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setInputMessage('');
    }
  };

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (isSpeaking) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
    }
  };

  const speakText = (text: string) => {
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botReply = await callGeminiAPI(inputMessage);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      if (isSpeechEnabled) speakText(botReply);
    } catch (error) {
      toast({
        title: "Error",
        description: "MemoBot could not respond",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = () => {
    toast({
      title: "Generating PDF",
      description: "Preparing your download..."
    });

    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Conversation report downloaded"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-soft-blue-50 to-soft-purple-100">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/patient-info" className="flex items-center text-ocean-blue hover:text-bright-blue transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-dark-purple">Memo Medi-Robot</h1>
          <Button variant="outline" size="sm" onClick={generatePDF}>
            <Download size={18} className="mr-1" /> Report
          </Button>
        </div>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 mb-4 overflow-hidden flex flex-col">
            <div className="bg-soft-yellow p-2 text-sm text-center border-b">
              <span className="font-semibold">Health News:</span> New research on recovery for common illnesses
            </div>

            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-center p-2">
                    <div className="animate-pulse text-ocean-blue">
                      MemoBot is thinking...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Button type="button" variant="outline" size="icon" onClick={toggleSpeechRecognition} className={isListening ? "bg-ocean-blue text-white" : ""}>
                  {isListening ? <Mic /> : <MicOff />}
                </Button>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isListening}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon" onClick={toggleSpeech}>
                  {isSpeechEnabled ? <Volume /> : <VolumeX />}
                </Button>
                <Button type="submit" disabled={!inputMessage.trim() && !isListening}>
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        <div className="md:w-64 flex flex-col gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-full aspect-square mb-4">
                <MemoBotAvatar
                  isListening={isListening}
                  isThinking={isLoading}
                  isSpeaking={isSpeaking}
                />
              </div>
              <h2 className="text-xl font-semibold text-center">MemoBot</h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                Your Personal Medical Assistant
              </p>
              <div className="w-full mt-4 text-sm">
                <div className="flex justify-between"><span className="font-medium">Patient:</span><span>{patientName}</span></div>
                <div className="flex justify-between mt-1"><span className="font-medium">Age:</span><span>{patientAge}</span></div>
                <div className="flex justify-between mt-1"><span className="font-medium">Condition:</span><span className="truncate max-w-[120px]" title={patientCondition}>{patientCondition}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
