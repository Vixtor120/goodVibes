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

  const progressPercentage = (currentTime / duration) * 100 || 0;
  return (
    <div className="player-summer p-5 rounded-xl shadow-md relative overflow-hidden">
      {/* Video Element */}
      <div className="relative group">
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-lg"
          style={{ display: 'block' }}
        />
      </div>

      {/* Progress Bar */}
      <div className="relative mt-4 mb-5">
        <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="relative h-1.5 bg-gray-700 rounded-full overflow-hidden group">
          <div
            className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-400"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div
            className="absolute h-3 w-3 bg-white rounded-full shadow-sm top-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{
              left: `${progressPercentage}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
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

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="focus:outline-none transition-all duration-300 hover:scale-105 transform"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isPlaying
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'bg-purple-600 text-white hover:bg-purple-500'
            } shadow-md transition-all duration-300`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </div>
        </button>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 bg-gray-700/70 px-3 py-1.5 rounded-full">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 1)}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label={volume > 0 ? 'Mute' : 'Unmute'}
          >
            {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <div className="relative w-20 h-1 bg-gray-600 rounded-full overflow-hidden group">
            <div
              className="h-full bg-purple-500"
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
              aria-label="Adjust volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
