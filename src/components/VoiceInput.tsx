
import { useState, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
}

const VoiceInput = ({ onVoiceInput }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        console.log('Voice recognition started');
      };

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          console.log('Final transcript:', transcript);
          onVoiceInput(transcript);
          setTranscript('');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript('');
        console.log('Voice recognition ended');
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setTranscript('');
      };

      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in this browser. Please try Chrome or Edge.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Voice Assistant</h3>
        <p className="text-sm text-gray-600">
          Tap and speak naturally: "I need barbecue sauce and hamburger buns"
        </p>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={isListening ? stopListening : startListening}
            size="lg"
            className={`rounded-full w-16 h-16 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-[#0071CE] hover:bg-blue-700'
            }`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>
          
          <Button
            onClick={() => speakText("Hi! I'm your Walmart shopping assistant. How can I help you find products today?")}
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16"
          >
            <Volume2 size={24} />
          </Button>
        </div>
        
        {transcript && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Listening:</span> {transcript}
            </p>
          </div>
        )}
        
        {isListening && (
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-8 bg-[#0071CE] rounded-full animate-pulse"></div>
            <div className="w-2 h-6 bg-[#0071CE] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-10 bg-[#0071CE] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-4 bg-[#0071CE] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceInput;
