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
  }, [onPlayStateChange]);  return (
    <div className="player-summer p-5 shadow-md relative overflow-hidden border-l-4 border-l-orange-500" role="region" aria-label="Reproductor de audio">
      {/* Top orange line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
      
      {/* Progress Bar - Simplified and elegant */}
      <div className="relative mt-1 mb-5">
        <div className="flex items-center justify-between text-sm font-medium text-summer-dark mb-1.5">
          <span aria-label="Tiempo actual">{formatTime(currentTime)}</span>
          <span aria-label="Duración total">{formatTime(duration)}</span>
        </div>
        
        <div className="relative h-2.5 progress-summer overflow-hidden group" 
             role="progressbar" 
             aria-valuemin={0} 
             aria-valuemax={duration || 100}
             aria-valuenow={currentTime}
             aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
        >
          <div 
            ref={progressBarRef}
            className="absolute h-full bg-gradient-to-r from-orange-400 to-summer-turquoise"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          
          {/* Minimalist progress handle */}
          <div 
            className="absolute h-3 w-3 bg-orange-400 top-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{ 
              left: `${progressPercentage}%`, 
              transform: `translateX(-50%) translateY(-50%)`,
              boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)'
            }}
          ></div>          <input
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
            aria-label="Buscar en la línea de tiempo de audio"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
          />
        </div>
        <p className="sr-only">Usa el deslizador para avanzar o retroceder en la reproducción</p>
      </div>

      {/* Controls - Clean and centered */}
      <div className="flex items-center justify-between">
        {/* Play/Pause Button - Larger and centered */}
        <button 
          onClick={togglePlayPause}
          className="focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:rounded transition-all duration-300 hover:scale-105 transform"
          aria-label={isPlaying ? "Pausar reproducción" : "Iniciar reproducción"}
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          <div className={`flex items-center justify-center w-14 h-14 ${
            isPlaying 
              ? 'bg-orange-400 text-white hover:bg-orange-500' 
              : 'bg-summer-turquoise text-white hover:bg-summer-turquoise/90'
          } shadow-md transition-all duration-300 border-t-2 border-t-summer-accent`}>
            {isPlaying ? 
              <Pause size={24} /> : 
              <Play size={24} className="ml-0.5" />
            }
          </div>
        </button>

        {/* Volume Control - Sleek and minimal */}        <div className="flex items-center space-x-2 bg-summer-dark/50 px-4 py-2.5 border-t-2 border-t-summer-turquoise rounded-l">
          <button 
            onClick={() => setVolume(volume > 0 ? 0 : 1)}
            className="text-summer-turquoise hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-summer-turquoise focus:rounded"
            aria-label={volume > 0 ? "Silenciar audio" : "Activar sonido"}
            title={volume > 0 ? "Silenciar" : "Activar sonido"}
          >
            {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <div className="relative w-24 h-2 bg-summer-dark/80 overflow-hidden group" 
               role="progressbar" 
               aria-valuemin={0} 
               aria-valuemax={1}
               aria-valuenow={volume}
               aria-valuetext={`Volumen: ${Math.round(volume * 100)}%`}>
            <div 
              className="h-full bg-summer-turquoise"
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
              title={`Volumen: ${Math.round(volume * 100)}%`}
            />          </div>
        </div>
      </div>

      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} preload="metadata" />
      
      {/* Hidden accessibility instructions */}
      <div className="sr-only">
        <p>Controles de teclado: Barra espaciadora para reproducir/pausar, flechas izquierda y derecha para avanzar o retroceder, M para silenciar</p>
      </div>
    </div>
  );
};

export default AudioPlayer;