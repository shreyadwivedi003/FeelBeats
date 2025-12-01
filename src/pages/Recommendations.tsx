import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Share2, Music } from "lucide-react";
import { toast } from "sonner";

type EmotionType = "happy" | "sad" | "calm" | "energetic" | "romantic" | "neutral";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  emotion: EmotionType;
  url: string;
}

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emotion = (location.state?.emotion as EmotionType) || "happy";
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Playlist data with Hindi and English songs
  const playlists: Record<EmotionType, Song[]> = {
    happy: [
      { id: 1, title: "Happy", artist: "Pharrell Williams", duration: "3:53", emotion: "happy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: 2, title: "Gallan Goodiyaan", artist: "Yashita Sharma", duration: "3:42", emotion: "happy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: 3, title: "Good Vibrations", artist: "The Beach Boys", duration: "3:36", emotion: "happy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: 4, title: "Badtameez Dil", artist: "Benny Dayal", duration: "4:12", emotion: "happy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { id: 5, title: "Don't Stop Me Now", artist: "Queen", duration: "3:29", emotion: "happy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: 6, title: "Senorita", artist: "Zindagi Na Milegi Dobara", duration: "3:45", emotion: "happy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    ],
    sad: [
      { id: 7, title: "Someone Like You", artist: "Adele", duration: "4:45", emotion: "sad", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: 8, title: "Channa Mereya", artist: "Arijit Singh", duration: "4:49", emotion: "sad", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: 9, title: "The Night We Met", artist: "Lord Huron", duration: "3:28", emotion: "sad", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: 10, title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:22", emotion: "sad", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { id: 11, title: "Agar Tum Saath Ho", artist: "Alka Yagnik, Arijit Singh", duration: "5:42", emotion: "sad", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: 12, title: "Mad World", artist: "Gary Jules", duration: "3:08", emotion: "sad", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    ],
    calm: [
      { id: 13, title: "Weightless", artist: "Marconi Union", duration: "8:09", emotion: "calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: 14, title: "Kabira", artist: "Tochi Raina, Rekha Bhardwaj", duration: "5:09", emotion: "calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: 15, title: "Clair de Lune", artist: "Claude Debussy", duration: "5:21", emotion: "calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: 16, title: "Pehla Nasha", artist: "Udit Narayan, Sadhana Sargam", duration: "5:39", emotion: "calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { id: 17, title: "Holocene", artist: "Bon Iver", duration: "5:36", emotion: "calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: 18, title: "Tujhe Dekha To", artist: "Kumar Sanu", duration: "4:52", emotion: "calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    ],
    energetic: [
      { id: 19, title: "Eye of the Tiger", artist: "Survivor", duration: "4:04", emotion: "energetic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: 20, title: "Malhari", artist: "Vishal Dadlani", duration: "4:31", emotion: "energetic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: 21, title: "Thunder", artist: "Imagine Dragons", duration: "3:07", emotion: "energetic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: 22, title: "Apna Time Aayega", artist: "Ranveer Singh", duration: "3:46", emotion: "energetic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { id: 23, title: "Can't Stop", artist: "Red Hot Chili Peppers", duration: "4:29", emotion: "energetic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: 24, title: "Zinda", artist: "Siddharth Mahadevan", duration: "4:09", emotion: "energetic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    ],
    romantic: [
      { id: 25, title: "Perfect", artist: "Ed Sheeran", duration: "4:23", emotion: "romantic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: 26, title: "Tum Se Hi", artist: "Mohit Chauhan", duration: "5:43", emotion: "romantic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: 27, title: "All of Me", artist: "John Legend", duration: "4:29", emotion: "romantic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: 28, title: "Jeene Laga Hoon", artist: "Atif Aslam, Shreya Ghoshal", duration: "4:36", emotion: "romantic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { id: 29, title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41", emotion: "romantic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: 30, title: "Raabta", artist: "Arijit Singh", duration: "4:02", emotion: "romantic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    ],
    neutral: [
      { id: 31, title: "Radioactive", artist: "Imagine Dragons", duration: "3:06", emotion: "neutral", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: 32, title: "Ilahi", artist: "Arijit Singh", duration: "4:57", emotion: "neutral", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: 33, title: "Counting Stars", artist: "OneRepublic", duration: "4:17", emotion: "neutral", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: 34, title: "Khairiyat", artist: "Arijit Singh", duration: "4:40", emotion: "neutral", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { id: 35, title: "Riptide", artist: "Vance Joy", duration: "3:24", emotion: "neutral", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: 36, title: "Shayad", artist: "Arijit Singh", duration: "3:58", emotion: "neutral", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    ],
  };

  const currentPlaylist = playlists[emotion];

  const emotionConfig = {
    happy: { color: "emotion-happy", emoji: "😊", label: "Happy Vibes" },
    sad: { color: "emotion-sad", emoji: "😢", label: "Melancholic Mood" },
    calm: { color: "emotion-calm", emoji: "😌", label: "Peaceful Vibes" },
    energetic: { color: "emotion-energetic", emoji: "🔥", label: "High Energy" },
    romantic: { color: "emotion-romantic", emoji: "💖", label: "Love Songs" },
    neutral: { color: "emotion-neutral", emoji: "😐", label: "Balanced Mix" },
  };

  const config = emotionConfig[emotion];

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentSong < currentPlaylist.length - 1) {
        setCurrentSong(currentSong + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, currentPlaylist.length]);

  // Load and play song when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentPlaylist[currentSong].url;
    audio.volume = volume;
    
    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
        toast.error("Failed to play audio");
      });
    }
  }, [currentSong, currentPlaylist, volume, isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      toast.success("Paused");
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        toast.success("Playing");
      }).catch(() => {
        toast.error("Failed to play audio");
      });
    }
  };

  const handleNext = () => {
    if (currentSong < currentPlaylist.length - 1) {
      setCurrentSong(currentSong + 1);
      setIsPlaying(true);
      toast.success("Next song");
    }
  };

  const handlePrevious = () => {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1);
      setIsPlaying(true);
      toast.success("Previous song");
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    toast.success("Added to favorites!");
  };

  const handleShare = () => {
    toast.success("Playlist link copied!");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <audio ref={audioRef} />
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">{config.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {config.label}
          </h1>
          <p className="text-lg text-muted-foreground">
            Music perfectly matched to your {emotion} mood
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="gradient-card p-8 shadow-card">
              {/* Now Playing */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-2">Now Playing</p>
                <h2 className="text-3xl font-bold mb-2">{currentPlaylist[currentSong].title}</h2>
                <p className="text-xl text-muted-foreground">{currentPlaylist[currentSong].artist}</p>
              </div>

              {/* Album Art Placeholder */}
              <div className={`w-full aspect-square rounded-3xl bg-gradient-to-br from-${config.color} to-primary mb-8 flex items-center justify-center shadow-glow`}>
                <Music className="w-32 h-32 text-white/50" />
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2 cursor-pointer"
                     onClick={(e) => {
                       const audio = audioRef.current;
                       if (!audio || !duration) return;
                       const bounds = e.currentTarget.getBoundingClientRect();
                       const x = e.clientX - bounds.left;
                       const percentage = x / bounds.width;
                       audio.currentTime = percentage * duration;
                     }}>
                  <div
                    className={`h-full bg-${config.color} transition-smooth`}
                    style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  disabled={currentSong === 0}
                  className="hover:scale-110 transition-bounce"
                >
                  <SkipBack className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handlePlayPause}
                  className="w-16 h-16 rounded-full"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentSong === currentPlaylist.length - 1}
                  className="hover:scale-110 transition-bounce"
                >
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={handleLike}>
                  <Heart className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-muted-foreground" />
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden cursor-pointer"
                       onClick={(e) => {
                         const bounds = e.currentTarget.getBoundingClientRect();
                         const x = e.clientX - bounds.left;
                         const percentage = x / bounds.width;
                         handleVolumeChange(percentage);
                       }}>
                    <div className="h-full bg-primary" style={{ width: `${volume * 100}%` }} />
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-1">
            <Card className="gradient-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Playlist</h3>
                <span className="text-sm text-muted-foreground">{currentPlaylist.length} songs</span>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {currentPlaylist.map((song, index) => (
                  <button
                    key={song.id}
                    onClick={() => setCurrentSong(index)}
                    className={`w-full p-4 rounded-xl text-left transition-smooth hover:bg-muted/50 ${
                      index === currentSong ? 'bg-gradient-emotion' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${config.color} to-primary flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{song.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{song.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => navigate('/detect')}
            >
              Analyze Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
