import { Link, useNavigate } from 'react-router-dom';
import { Play, Share2, Clock, Calendar, ChevronRight, Loader } from 'lucide-react';
import { Episode as EpisodeType } from '../interfaces/Episode';
import { useState, useEffect } from 'react';
import { shareEpisode } from '../utils/shareUtils';
import { getAudioDuration } from '../utils/audioUtils';

interface EpisodeProps extends Omit<EpisodeType, 'videoUrl'> {
  // Include videoUrl for duration calculation but not required for rendering
  videoUrl?: string;
}

const Episode: React.FC<EpisodeProps> = ({ 
  id, 
  title, 
  description, 
  duration, // We'll ignore this and always calculate
  date,
  imageUrl,
  label = [],
  videoUrl,
}) => {
  const navigate = useNavigate();
  const [showShareFeedback, setShowShareFeedback] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [calculatedDuration, setCalculatedDuration] = useState<string | null>(null);
  const [isLoadingDuration, setIsLoadingDuration] = useState(false);

  // Always calculate duration when component mounts if videoUrl is available
  useEffect(() => {
    // Try to construct a videoUrl if none was provided
    const effectiveVideoUrl = videoUrl || `/audios/episodio${id}.mp3`;
    
    console.log(`Episode ${id}: Using URL for duration calculation: ${effectiveVideoUrl}`);
    setIsLoadingDuration(true);
    
    getAudioDuration(effectiveVideoUrl)
      .then(audioDuration => {
        console.log(`Episode ${id}: Duration calculation SUCCESS: ${audioDuration}`);
        setCalculatedDuration(audioDuration);
      })
      .catch(error => {
        console.error(`Episode ${id}: Duration calculation FAILED:`, error);
        // If calculation fails, fall back to the provided duration but don't use "0:00"
        if (duration && duration !== "0:00") {
          console.log(`Episode ${id}: Using fallback duration: ${duration}`);
          setCalculatedDuration(duration);
        } else {
          console.log(`Episode ${id}: Using placeholder duration`);
          setCalculatedDuration("--:--");
        }
      })
      .finally(() => {
        setIsLoadingDuration(false);
      });
  }, [id, videoUrl]); // Keep dependency array the same

  // Update this line to always show some duration
  const displayDuration = calculatedDuration || (isLoadingDuration ? "Calculando..." : (duration !== "0:00" ? duration : "--:--"));
  
  // Log the current state of the component for debugging
  useEffect(() => {
    console.log(`Episode ${id} state:`, { 
      videoUrl: videoUrl?.substring(0, 20) + "...", 
      originalDuration: duration,
      calculatedDuration, 
      displayDuration, 
      isLoadingDuration 
    });
  }, [id, videoUrl, calculatedDuration, displayDuration, isLoadingDuration, duration]);

  // Get a color based on the label string for consistent coloring
  const getLabelColor = (label: string): string => {
    const colors = [
      'bg-gradient-to-r from-purple-600/70 to-purple-500/70 text-white',
      'bg-gradient-to-r from-blue-600/70 to-blue-500/70 text-white',
      'bg-gradient-to-r from-green-600/70 to-green-500/70 text-white',
      'bg-gradient-to-r from-red-600/70 to-red-500/70 text-white',
      'bg-gradient-to-r from-yellow-600/70 to-yellow-500/70 text-white',
      'bg-gradient-to-r from-indigo-600/70 to-indigo-500/70 text-white',
      'bg-gradient-to-r from-pink-600/70 to-pink-500/70 text-white',
      'bg-gradient-to-r from-teal-600/70 to-teal-500/70 text-white'
    ];
    // Use the sum of character codes to determine a consistent color
    const sum = label.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const handlePlay = () => {
    navigate(`/episodios/${id}?autoplay=true`);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const success = await shareEpisode(id, title);
    if (success) {
      setShowShareFeedback(true);
      setTimeout(() => setShowShareFeedback(false), 2000);
    }
  };

  return (
    <div 
      className="backdrop-blur-sm bg-gray-900/80 rounded-2xl overflow-hidden h-[460px] shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex flex-col border border-gray-700/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(145deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.95))',
      }}
    >
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110" 
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=GoodVibes';
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)'
          }}
        >
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">{title}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-200">
              {isLoadingDuration ? (
                <span className="flex items-center backdrop-blur-sm bg-black/30 rounded-full px-3 py-1">
                  <Loader size={14} className="mr-1.5 text-purple-400 animate-spin" />
                  Calculando...
                </span>
              ) : (
                <span className="flex items-center backdrop-blur-sm bg-black/30 rounded-full px-3 py-1">
                  <Clock size={14} className="mr-1.5 text-purple-400" />
                  {displayDuration || "--:--"}
                </span>
              )}
              {date && (
                <span className="flex items-center backdrop-blur-sm bg-black/30 rounded-full px-3 py-1">
                  <Calendar size={14} className="mr-1.5 text-purple-400" />
                  {date}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <button 
            aria-label="Play episode" 
            className={`bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-3 rounded-full transition-all hover:shadow-lg hover:shadow-purple-500/30 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onClick={handlePlay}
            title="Reproducir episodio"
            style={{ transition: 'transform 0.3s ease' }}
          >
            <Play size={22} className="ml-0.5" fill="white" />
          </button>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        {label && label.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {label.map((tag: string, index: number) => (
              <span 
                key={index} 
                className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${getLabelColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed flex-grow">{description}</p>
        <div className="flex justify-between items-center pt-4 mt-auto border-t border-gray-700/30">
          <Link 
            to={`/episodios/${id}`} 
            className="text-purple-400 hover:text-purple-300 transition-all duration-300 text-sm font-medium flex items-center group"
          >
            Ver detalles
            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <button 
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-purple-500/10 transition-all duration-300 relative"
            onClick={handleShare}
            title="Compartir episodio"
          >
            <Share2 size={17} />
            {showShareFeedback && (
              <span className="absolute -top-9 -left-12 bg-black/80 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-md whitespace-nowrap z-10 shadow-md border border-gray-700/30">
                {'share' in navigator ? '¡Compartido!' : '¡Enlace copiado!'}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Episode;