import { Button } from "@/components/ui/button";
import { Music, Heart, Sparkles, Mic, Camera, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-emotion-music.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Emotion and Music Waves" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Music className="w-12 h-12 text-primary animate-float" />
              <Heart className="w-10 h-10 text-emotion-romantic animate-pulse-soft" />
              <Sparkles className="w-12 h-12 text-accent animate-float" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-emotion-romantic to-accent">
              FeelBeats
            </h1>
            
            <p className="text-2xl md:text-3xl text-foreground/80 font-light">
              Feel your emotions. Hear your music.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover music that matches your mood through advanced emotion detection. 
              Analyze your feelings via audio, video, or text and let us curate the perfect soundtrack.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate('/detect')}
                className="text-lg px-8 py-6"
              >
                Analyze My Emotion
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 border-2 hover:shadow-soft transition-smooth"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Audio Detection */}
            <div className="group">
              <div className="gradient-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-smooth hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emotion-energetic to-emotion-happy flex items-center justify-center mb-6 group-hover:scale-110 transition-bounce">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Audio Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Record your voice or upload audio. Our AI analyzes tone, pitch, and patterns to detect your emotional state.
                </p>
              </div>
            </div>

            {/* Video Detection */}
            <div className="group">
              <div className="gradient-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-smooth hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emotion-calm to-emotion-sad flex items-center justify-center mb-6 group-hover:scale-110 transition-bounce">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Facial Recognition</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Use your camera or upload a video. Advanced facial analysis reads your expressions to understand how you feel.
                </p>
              </div>
            </div>

            {/* Text Analysis */}
            <div className="group">
              <div className="gradient-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-smooth hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emotion-romantic flex items-center justify-center mb-6 group-hover:scale-110 transition-bounce">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Text Sentiment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Type how you're feeling. Natural language processing detects emotions from your words and writing style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="gradient-main rounded-3xl p-12 md:p-16 text-center shadow-card">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to discover your soundtrack?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands who've found their perfect music match through emotion-powered discovery.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/detect')}
              className="text-lg px-8 py-6 hover:scale-105 transition-bounce shadow-soft"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
