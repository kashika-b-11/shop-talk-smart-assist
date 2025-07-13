
import { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
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
      // Simulate voice recognition
      setTimeout(() => {
        const sampleQueries = [
          "Show me wireless headphones",
          "Find groceries on sale",
          "Search for home decor items",
          "Looking for fitness equipment"
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
        className={`w-full ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
      >
        {isListening ? <MicOff size={14} /> : <Mic size={14} />}
        <span className="ml-1 text-xs">{isListening ? 'Stop' : 'Voice'}</span>
      </Button>
    );
  }

  return (
    <Card className="p-6 text-center">
      <div className="space-y-4">
        <Volume2 className="w-12 h-12 mx-auto text-[#0071CE]" />
        <h3 className="font-semibold text-lg">Voice Search</h3>
        <p className="text-sm text-gray-600">
          {isListening ? 'Listening...' : 'Click to start voice search'}
        </p>
        
        {transcript && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">"{transcript}"</p>
          </div>
        )}
        
        <Button
          onClick={toggleListening}
          size="lg"
          variant={isListening ? "destructive" : "default"}
          className={`w-full ${isListening ? 'animate-pulse' : ''}`}
        >
          {isListening ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
          {isListening ? 'Stop Listening' : 'Start Voice Search'}
        </Button>
      </div>
    </Card>
  );
};

export default VoiceInput;
