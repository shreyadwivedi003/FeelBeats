import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Camera, MessageSquare, Upload, Play, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type EmotionType = "happy" | "sad" | "calm" | "energetic" | "romantic" | "neutral";

interface EmotionResult {
  emotion: EmotionType;
  confidence: number;
  description: string;
  emoji: string;
}

const EmotionDetection = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);

  // Mock emotion detection - replace with actual AI API calls
  const analyzeEmotion = (type: "audio" | "video" | "text") => {
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const emotions: EmotionResult[] = [
        { emotion: "happy", confidence: 0.87, description: "You're feeling joyful and upbeat!", emoji: "😊" },
        { emotion: "sad", confidence: 0.72, description: "You seem a bit down today", emoji: "😢" },
        { emotion: "calm", confidence: 0.91, description: "You're in a peaceful, relaxed state", emoji: "😌" },
        { emotion: "energetic", confidence: 0.84, description: "You're full of energy and excitement!", emoji: "🔥" },
        { emotion: "romantic", confidence: 0.79, description: "You're feeling loving and tender", emoji: "💖" },
        { emotion: "neutral", confidence: 0.65, description: "You're in a balanced, neutral mood", emoji: "😐" },
      ];
      
      const randomResult = emotions[Math.floor(Math.random() * emotions.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
      toast.success(`Emotion detected: ${randomResult.emotion}!`);
    }, 2000);
  };

  const handleAudioRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.info("Recording started...");
      // Start recording logic here
    } else {
      setIsRecording(false);
      toast.info("Recording stopped. Analyzing...");
      analyzeEmotion("audio");
    }
  };

  const handleCameraToggle = () => {
    if (!isCameraActive) {
      setIsCameraActive(true);
      toast.info("Camera activated");
      // Start camera logic here
    } else {
      setIsCameraActive(false);
      toast.info("Analyzing video...");
      analyzeEmotion("video");
    }
  };

  const handleTextAnalysis = () => {
    if (textInput.trim().length < 10) {
      toast.error("Please enter at least 10 characters");
      return;
    }
    analyzeEmotion("text");
  };

  const handleSeeRecommendations = () => {
    if (result) {
      navigate('/recommendations', { state: { emotion: result.emotion } });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Emotion Detection
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your preferred method to analyze your emotions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Detection Methods */}
          <Card className="gradient-card p-8 shadow-card">
            <Tabs defaultValue="audio" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="audio" className="gap-2">
                  <Mic className="w-4 h-4" />
                  Audio
                </TabsTrigger>
                <TabsTrigger value="video" className="gap-2">
                  <Camera className="w-4 h-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="text" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Text
                </TabsTrigger>
              </TabsList>

              {/* Audio Tab */}
              <TabsContent value="audio" className="space-y-6">
                <div className="text-center py-8">
                  <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emotion-energetic to-emotion-happy flex items-center justify-center mb-6 ${isRecording ? 'animate-pulse-soft' : ''}`}>
                    <Mic className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Voice Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    {isRecording ? "Recording your voice..." : "Click to start recording"}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant={isRecording ? "destructive" : "emotion"}
                      size="lg"
                      onClick={handleAudioRecord}
                      disabled={isAnalyzing}
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-5 h-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          Start Recording
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="lg">
                      <Upload className="w-5 h-5" />
                      Upload Audio
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Video Tab */}
              <TabsContent value="video" className="space-y-6">
                <div className="text-center py-8">
                  <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emotion-calm to-emotion-sad flex items-center justify-center mb-6 ${isCameraActive ? 'animate-pulse-soft' : ''}`}>
                    <Camera className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Facial Expression Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    {isCameraActive ? "Camera is active..." : "Activate camera or upload video"}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant={isCameraActive ? "destructive" : "emotion"}
                      size="lg"
                      onClick={handleCameraToggle}
                      disabled={isAnalyzing}
                    >
                      {isCameraActive ? (
                        <>
                          <Square className="w-5 h-5" />
                          Stop Camera
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Activate Camera
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="lg">
                      <Upload className="w-5 h-5" />
                      Upload Video
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Text Tab */}
              <TabsContent value="text" className="space-y-6">
                <div className="py-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-emotion-romantic flex items-center justify-center mb-6">
                    <MessageSquare className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Text Sentiment Analysis</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Tell us how you're feeling
                  </p>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your thoughts here... How are you feeling today?"
                    className="w-full min-h-[150px] p-4 rounded-2xl border-2 border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                  />
                  <Button
                    variant="emotion"
                    size="lg"
                    onClick={handleTextAnalysis}
                    disabled={isAnalyzing}
                    className="w-full mt-4"
                  >
                    Analyze Text
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Results Panel */}
          <Card className="gradient-card p-8 shadow-card">
            <h2 className="text-2xl font-bold mb-6">Analysis Result</h2>
            
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse-soft mb-6" />
                <p className="text-lg text-muted-foreground">Analyzing your emotions...</p>
              </div>
            ) : result ? (
              <div className="space-y-6 animate-scale-in">
                {/* Emotion Display */}
                <div className="text-center py-8 gradient-emotion rounded-2xl">
                  <div className="text-8xl mb-4">{result.emoji}</div>
                  <h3 className="text-3xl font-bold capitalize mb-2">{result.emotion}</h3>
                  <p className="text-lg text-muted-foreground">{result.description}</p>
                </div>

                {/* Confidence Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Confidence Score</span>
                    <span className="text-sm font-bold">{Math.round(result.confidence * 100)}%</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-smooth"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSeeRecommendations}
                  className="w-full"
                >
                  See Music Recommendations
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Play className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-lg text-muted-foreground">
                  Select a method and start analyzing to see your results here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmotionDetection;
