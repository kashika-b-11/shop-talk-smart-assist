
import { useState } from 'react';
import { Mic, MicOff, Volume2, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
  compact?: boolean;
}

const VoiceInput = ({ onVoiceInput, compact = false }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      if (transcript) {
        onVoiceInput(transcript);
        setTranscript('');
      }
    } else {
      setIsListening(true);
      // Simulate voice recognition with sample queries
      setTimeout(() => {
        const sampleQueries = [
          "Show me wireless headphones under ₹5000",
          "Find groceries on sale",
          "I need a laptop for work",
          "Looking for kitchen appliances",
          "Show me trending electronics",
          "Find affordable fashion items"
        ];
        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
        setTranscript(randomQuery);
        setTimeout(() => {
          setIsListening(false);
          onVoiceInput(randomQuery);
          setTranscript('');
          toast({
            title: "Voice command processed",
            description: `Searching for: ${randomQuery}`,
          });
        }, 2000);
      }, 500);
    }
  };

  if (compact) {
    return (
      <Button
        onClick={toggleListening}
        variant={isListening ? "default" : "outline"}
        size="sm"
        className={`w-full ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : ''}`}
      >
        {isListening ? <MicOff size={14} /> : <Mic size={14} />}
        <span className="ml-1 text-xs">{isListening ? 'Listening...' : 'Voice Search'}</span>
      </Button>
    );
  }

  return (
    <Card className="p-6 text-center h-[600px] flex flex-col justify-center">
      <div className="space-y-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-[#0071CE] to-blue-600 rounded-full flex items-center justify-center">
          <Volume2 className="w-10 h-10 text-white" />
        </div>
        
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-2">Voice Search</h3>
          <p className="text-gray-600">
            {isListening ? 'Listening for your command...' : 'Click to start voice search'}
          </p>
        </div>
        
        {transcript && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg max-w-sm mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <Headphones className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Heard:</span>
            </div>
            <p className="text-sm text-blue-700 font-medium">"{transcript}"</p>
          </div>
        )}
        
        <div className="space-y-4">
          <Button
            onClick={toggleListening}
            size="lg"
            variant={isListening ? "destructive" : "default"}
            className={`w-full py-4 text-lg font-semibold ${
              isListening ? 'animate-pulse bg-red-500 hover:bg-red-600' : 'bg-[#0071CE] hover:bg-blue-700'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-6 h-6 mr-3" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="w-6 h-6 mr-3" />
                Start Voice Search
              </>
            )}
          </Button>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Try saying:</p>
            <p>"Show me laptops under ₹50000"</p>
            <p>"Find kitchen appliances on sale"</p>
            <p>"I need wireless headphones"</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VoiceInput;
