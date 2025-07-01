
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
      recognitionRef.current.lang = 'en-IN'; // Changed to Indian English for better recognition

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        console.log('Voice recognition started');
        speakText("I'm listening...");
      };

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          console.log('Final transcript:', transcript);
          
          // Provide voice confirmation
          speakText(`Searching for ${transcript}`);
          
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
        
        if (event.error === 'no-speech') {
          speakText("I didn't hear anything. Please try again.");
        } else if (event.error === 'network') {
          speakText("Network error. Please check your connection.");
        } else {
          speakText("Sorry, I couldn't understand. Please try again.");
        }
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
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.lang = 'en-IN'; // Indian English accent
      speechSynthesis.speak(utterance);
    }
  };

  const handleDemoSpeak = () => {
    const demoMessages = [
      "Hi! I'm your Walmart shopping assistant. You can ask me to find products by saying things like:",
      "Find iPhone 13 under 50000",
      "Show me ethnic kurtas",
      "Search for basmati rice",
      "Add shampoo to cart",
      "What's in my cart?",
      "How can I help you shop today?"
    ];
    
    const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)];
    speakText(randomMessage);
  };

  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Voice Shopping Assistant</h3>
        <p className="text-sm text-gray-600">
          Tap the mic and say: "Find Redmi Note 13 under 15k" or "Show me kurtas"
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
            onClick={handleDemoSpeak}
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16"
            title="Hear voice examples"
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
          <div className="space-y-2">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-8 bg-[#0071CE] rounded-full animate-pulse"></div>
              <div className="w-2 h-6 bg-[#0071CE] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-10 bg-[#0071CE] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-4 bg-[#0071CE] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <p className="text-xs text-gray-500">Speak clearly and naturally...</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceInput;
