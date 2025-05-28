import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { emitMediaPlayEvent, listenToMediaPlayEvents } from '../utils/mediaEvents';
import { useId } from 'react';

interface AudioPlayerProps {
  src: string;
  autoplay?: boolean;
  onPlayStateChange?: (playing: boolean) => void; // Add this prop definition
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, autoplay = false, onPlayStateChange }) => {
  const playerUniqueId = useId(); // ID único para este reproductor
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);

  // Efecto para manejar el autoplay cuando el componente se monta
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && autoplay) {
      // Intentar reproducir y manejar posibles restricciones del navegador
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            emitMediaPlayEvent(playerUniqueId);
          })
          .catch(error => {
            console.warn('Autoplay prevented by browser:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [autoplay, playerUniqueId]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      if (audio && !isDraggingProgress) {
        setCurrentTime(audio.currentTime);
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateTime);
      }
    };
  }, [isDraggingProgress]);

  // Escuchar eventos de reproducción de otros players
  useEffect(() => {
    const removeListener = listenToMediaPlayEvents(playerUniqueId, () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    });
    
    // Cleanup
    return removeListener;
  }, [playerUniqueId, isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        // Notificar a otros reproductores
        emitMediaPlayEvent(playerUniqueId);
      }
      setIsPlaying(!isPlaying);
      
      // Notify parent component of play state change
      if (onPlayStateChange) {
        onPlayStateChange(!isPlaying);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleProgressMouseDown = () => {
    setIsDraggingProgress(true);
  };

  const handleProgressMouseUp = () => {
    setIsDraggingProgress(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = (currentTime / duration) * 100 || 0;
  
  // Make sure to also update the useEffect that handles play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [onPlayStateChange]);
  return (
    <div className="player-summer p-5 rounded-xl shadow-md relative overflow-hidden">
      {/* Progress Bar - Simplified and elegant */}
      <div className="relative mt-1 mb-5">
        <div className="flex items-center justify-between text-xs font-medium text-summer-dark mb-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <div className="relative h-1.5 progress-summer rounded-full overflow-hidden group">          <div 
            ref={progressBarRef}
            className="absolute h-full bg-gradient-to-r from-summer-turquoise to-summer-secondary"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          
          {/* Minimalist progress handle */}
          <div 
            className="absolute h-3 w-3 bg-summer-secondary rounded-full shadow-sm top-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{ 
              left: `${progressPercentage}%`, 
              transform: `translateX(-50%) translateY(-50%)`,
              boxShadow: '0 0 5px rgba(255, 209, 102, 0.5)'
            }}
          ></div>
          
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleProgressMouseDown}
            onMouseUp={handleProgressMouseUp}
            onTouchStart={handleProgressMouseDown}
            onTouchEnd={handleProgressMouseUp}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Controls - Clean and centered */}
      <div className="flex items-center justify-between">
        {/* Play/Pause Button - Larger and centered */}
        <button 
          onClick={togglePlayPause}
          className="focus:outline-none transition-all duration-300 hover:scale-105 transform"
          aria-label={isPlaying ? "Pause" : "Play"}
        >          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
            isPlaying 
              ? 'bg-summer-secondary text-summer-dark hover:bg-summer-secondary/90' 
              : 'bg-summer-secondary text-summer-dark hover:bg-summer-secondary/90'
          } shadow-md transition-all duration-300`}>
            {isPlaying ? 
              <Pause size={20} /> : 
              <Play size={20} className="ml-0.5" />
            }
          </div>
        </button>

        {/* Volume Control - Sleek and minimal */}
        <div className="flex items-center space-x-2 bg-gray-700/70 px-3 py-1.5 rounded-full">          <button 
            onClick={() => setVolume(volume > 0 ? 0 : 1)}
            className="text-black hover:text-summer-dark transition-colors"
            aria-label={volume > 0 ? "Mute" : "Unmute"}
          >
            {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <div className="relative w-20 h-1 bg-gray-600 rounded-full overflow-hidden group">
            <div 
              className="h-full bg-summer-secondary"
              style={{ width: `${volume * 100}%` }}
            ></div>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Ajustar volumen"
            />
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default AudioPlayer;