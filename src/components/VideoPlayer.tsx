import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  autoplay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, autoplay = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);

  useEffect(() => {
    if (videoRef.current && autoplay) {
      videoRef.current.play().catch(error => {
        console.warn('Autoplay prevented by browser:', error);
      });
    }
  }, [autoplay]);

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      if (video && !isDraggingProgress) {
        setCurrentTime(video.currentTime);
      }
    };

    if (video) {
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', updateTime);
      }
    };
  }, [isDraggingProgress]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
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

  const progressPercentage = (currentTime / duration) * 100 || 0;  return (
    <div className="player-summer p-5 shadow-md relative overflow-hidden border-l-4 border-l-orange-500" role="region" aria-label="Reproductor de vídeo">
      {/* Top orange line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
      
      {/* Video Element */}
      <div className="relative group">
        <video
          ref={videoRef}
          src={src}
          className="w-full"
          style={{ display: 'block' }}
          preload="metadata"
          aria-label="Contenido de vídeo"
          playsInline
          controlsList="nodownload"
        />
      </div>

      {/* Progress Bar */}
      <div className="relative mt-4 mb-5">
        <div className="flex items-center justify-between text-sm font-medium text-summer-dark mb-1.5">
          <span aria-label="Tiempo actual">{formatTime(currentTime)}</span>
          <span aria-label="Duración total">{formatTime(duration)}</span>
        </div>
        <div className="relative h-2.5 bg-summer-dark/30 overflow-hidden group"
             role="progressbar" 
             aria-valuemin={0} 
             aria-valuemax={duration || 100}
             aria-valuenow={currentTime}
             aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}>
          <div
            className="absolute h-full bg-gradient-to-r from-orange-400 to-summer-turquoise"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div
            className="absolute h-3 w-3 bg-orange-400 top-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{
              left: `${progressPercentage}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)',
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
            aria-label="Buscar en la línea de tiempo de vídeo"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
          />
        </div>
        <p className="sr-only">Usa el deslizador para avanzar o retroceder en la reproducción</p>
      </div>      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Play/Pause Button */}        <button
          onClick={togglePlayPause}
          className="focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-300 hover:scale-105 transform"
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo'}
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          <div
            className={`flex items-center justify-center w-14 h-14 ${
              isPlaying
                ? 'bg-orange-400 text-white hover:bg-orange-500'
                : 'bg-summer-turquoise text-white hover:bg-summer-turquoise/90'
            } shadow-md transition-all duration-300 border-t-2 border-t-summer-accent`}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </div>
        </button>        {/* Volume Control */}
        <div className="flex items-center space-x-2 bg-summer-dark/50 px-4 py-2.5 border-t-2 border-t-summer-turquoise rounded-l">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 1)}
            className="text-summer-turquoise hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-summer-turquoise"
            aria-label={volume > 0 ? 'Silenciar audio' : 'Activar sonido'}
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
      
      {/* Hidden accessibility instructions */}
      <div className="sr-only">
        <p>Controles de teclado: Barra espaciadora para reproducir/pausar, flechas izquierda y derecha para avanzar o retroceder, M para silenciar</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
