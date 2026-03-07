import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Volume2, VolumeX, Mic, MicOff, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const speak = (text: string) => {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 0.95;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
};

const GREETING = `¡Hola! 💜✨ Soy Cibersegura, tu compañera virtual de seguridad digital. 

Estoy aquí para ayudarte a navegar el mundo digital de forma segura. Puedes preguntarme sobre:

🔐 Protección de contraseñas
📱 Privacidad en redes sociales  
⚠️ Cómo identificar estafas y phishing
🛡️ Ciberbullying y acoso digital
💬 Comunicación segura en línea
👥 Protección de datos personales

¿En qué puedo ayudarte hoy?`;

const QUICK_QUESTIONS = [
  { icon: '🔐', text: '¿Cómo crear una contraseña segura?' },
  { icon: '📱', text: '¿Cómo proteger mis redes sociales?' },
  { icon: '⚠️', text: '¿Qué es el phishing?' },
  { icon: '🛡️', text: '¿Qué hacer si sufro acoso digital?' },
];

const SecurityAvatar = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startListening = useCallback(() => {
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const texto = event.results[0][0].transcript;
      setInput(texto);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNewAssistantMessage = useCallback((text: string) => {
    if (ttsEnabled) speak(text);
  }, [ttsEnabled]);

  const sendMessage = async (customMessage?: string) => {
    const text = (customMessage || input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-security-chat', {
        body: { messages: allMessages.map(m => ({ role: m.role, content: m.content })) },
      });

      if (error) throw error;

      const reply = data?.reply || 'Lo siento, no pude procesar tu pregunta. ¿Podrías intentarlo de nuevo? 💜';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      handleNewAssistantMessage(reply);
    } catch (e) {
      console.error('Chat error:', e);
      const errMsg = 'Ups, algo salió mal. Por favor intenta de nuevo. 💜';
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="min-h-screen bg-background pb-24 font-body flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center rounded-full p-2 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-light to-primary flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-success-foreground" />
                </div>
              </div>
              <div>
                <span className="font-display text-lg font-bold text-foreground">Cibersegura</span>
                <p className="text-xs text-muted-foreground">Tu guía de seguridad digital</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => { setTtsEnabled(!ttsEnabled); if (ttsEnabled) speechSynthesis.cancel(); }}
            className="flex items-center justify-center rounded-full p-2 hover:bg-muted transition-colors"
            title={ttsEnabled ? 'Silenciar voz' : 'Activar voz'}
          >
            {ttsEnabled ? <Volume2 className="h-5 w-5 text-foreground" /> : <VolumeX className="h-5 w-5 text-muted-foreground" />}
          </button>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 mr-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-light to-primary flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-card border border-border text-foreground rounded-bl-md shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
            </div>
            {msg.role === 'assistant' && (
              <button
                onClick={() => speak(msg.content)}
                className="ml-1 self-end text-muted-foreground hover:text-foreground p-1 transition-colors"
                title="Escuchar"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-slide-up">
            <div className="flex-shrink-0 mr-2 mt-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-light to-primary flex items-center justify-center animate-pulse">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <div className="bg-card border border-border text-foreground rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-sm text-muted-foreground">Pensando...</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Questions - show only at start */}
        {messages.length === 1 && !loading && (
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-3 font-display font-semibold">Preguntas frecuentes:</p>
            <div className="grid grid-cols-1 gap-2">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q.text)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
                >
                  <span className="text-xl">{q.icon}</span>
                  <span className="text-sm text-foreground">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-md p-4 safe-area-bottom">
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            disabled={loading}
          />
          {SpeechRecognition && (
            <Button
              type="button"
              size="icon"
              variant={listening ? 'destructive' : 'outline'}
              onClick={listening ? stopListening : startListening}
              className="rounded-xl h-12 w-12"
              disabled={loading}
            >
              {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
          <Button 
            type="submit" 
            size="icon"
            disabled={!input.trim() || loading} 
            className="rounded-xl h-12 w-12 bg-primary text-primary-foreground"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          💜 Un espacio seguro para aprender sobre seguridad digital
        </p>
      </div>
    </div>
  );
};

export default SecurityAvatar;
