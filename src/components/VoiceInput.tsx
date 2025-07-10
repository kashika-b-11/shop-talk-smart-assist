
import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
}

const VoiceInput = ({ onVoiceInput }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check browser support
    const checkSupport = () => {
      const isWebSpeechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      setIsSupported(isWebSpeechSupported);
      if (!isWebSpeechSupported) {
        setError('Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
      }
    };

    checkSupport();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      setError(null);
      return true;
    } catch (err) {
      setHasPermission(false);
      setError('Microphone access denied. Please allow microphone permission and try again.');
      return false;
    }
  };

  const startListening = async () => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Check microphone permission first
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      setIsLoading(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setIsLoading(false);
        setError(null);
        console.log('Voice recognition started');
        speakText("I'm listening...");
        
        // Set a timeout to stop listening after 10 seconds
        timeoutRef.current = setTimeout(() => {
          stopListening();
          setError('Listening timeout. Please try again.');
        }, 10000);
      };

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          console.log('Final transcript:', transcript);
          
          if (transcript.trim()) {
            // Provide voice confirmation
            speakText(`Searching for ${transcript}`);
            onVoiceInput(transcript);
          } else {
            setError('No speech detected. Please try again.');
          }
          
          setTranscript('');
          
          // Clear timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript('');
        setIsLoading(false);
        console.log('Voice recognition ended');
        
        // Clear timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setTranscript('');
        setIsLoading(false);
        
        // Clear timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        // Handle specific errors
        switch (event.error) {
          case 'no-speech':
            setError("I didn't hear anything. Please try again and speak clearly.");
            speakText("I didn't hear anything. Please try again.");
            break;
          case 'network':
            setError("Network error. Please check your internet connection and try again.");
            speakText("Network error. Please check your connection.");
            break;
          case 'not-allowed':
            setError("Microphone access denied. Please allow microphone permission.");
            setHasPermission(false);
            break;
          case 'audio-capture':
            setError("No microphone found. Please check your audio settings.");
            break;
          case 'aborted':
            setError("Voice recognition was cancelled.");
            break;
          default:
            setError("Sorry, I couldn't understand. Please try again.");
            speakText("Sorry, I couldn't understand. Please try again.");
        }
      };

      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError('Failed to start voice recognition. Please try again.');
      setIsListening(false);
      setIsLoading(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
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

  const retryVoiceRecognition = () => {
    setError(null);
    startListening();
  };

  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Voice Shopping Assistant</h3>
        <p className="text-sm text-gray-600">
          Tap the mic and say: "Find Redmi Note 13 under 15k" or "Show me kurtas"
        </p>
        
        {error && (
          <Alert className="text-left">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              {hasPermission === false && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={checkMicrophonePermission}
                  className="ml-2"
                >
                  Retry
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {!isSupported && (
          <Alert>
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              Voice recognition not supported. Please use a modern browser like Chrome, Edge, or Safari.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={isListening ? stopListening : startListening}
            size="lg"
            disabled={!isSupported || isLoading}
            className={`rounded-full w-16 h-16 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-[#0071CE] hover:bg-blue-700'
            } ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : isListening ? (
              <MicOff size={24} />
            ) : (
              <Mic size={24} />
            )}
          </Button>
          
          <Button
            onClick={handleDemoSpeak}
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16"
            title="Hear voice examples"
            disabled={isLoading}
          >
            <Volume2 size={24} />
          </Button>

          {error && hasPermission !== false && (
            <Button
              onClick={retryVoiceRecognition}
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16"
              title="Retry voice recognition"
              disabled={isLoading}
            >
              <Wifi size={24} />
            </Button>
          )}
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

        {hasPermission === null && isSupported && (
          <div className="text-xs text-gray-500">
            Click the microphone to start. You may be asked for permission to use your microphone.
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceInput;
