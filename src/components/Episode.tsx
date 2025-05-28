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
      'bg-gradient-to-r from-summer-secondary/90 to-summer-secondary/70 text-summer-dark',
      'bg-gradient-to-r from-summer-secondary/80 to-summer-secondary/60 text-summer-dark',
      'bg-gradient-to-r from-summer-secondary/70 to-summer-secondary/50 text-summer-dark',
      'bg-gradient-to-r from-summer-secondary/60 to-summer-secondary/40 text-summer-dark'
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
  };  return (
    <div 
      className="card-summer rounded-2xl overflow-hidden h-[460px] shadow-lg transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 248, 255, 0.9))',
        boxShadow: '0 8px 20px rgba(0, 52, 89, 0.15)'
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
        >          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-summer-dark mb-2 line-clamp-2">{title}</h3>            <div className="flex flex-wrap items-center gap-2 text-sm text-summer-dark">
              {isLoadingDuration ? (                <span className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">                  <Loader size={14} className="mr-1.5 text-summer-accent animate-spin" />
                  Calculando...
                </span>
              ) : (                <span className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-summer-dark">
                  <Clock size={14} className="mr-1.5 text-summer-accent" />
                  {displayDuration || "--:--"}
                </span>
              )}
              {date && (                <span className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-summer-dark">
                  <Calendar size={14} className="mr-1.5 text-summer-accent" />
                  {date}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 z-10">          <button 
            aria-label="Play episode" 
            className={`bg-gradient-to-br from-summer-secondary to-summer-secondary/80 text-summer-dark p-3 rounded-full transition-all hover:shadow-lg hover:shadow-summer-secondary/30 ${isHovered ? 'scale-110' : 'scale-100'}`}
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
        )}        <p className="text-summer-dark text-sm line-clamp-3 leading-relaxed flex-grow font-medium">{description}</p>        <div className="flex justify-between items-center pt-4 mt-auto border-t border-summer-secondary/20">
          <Link 
            to={`/episodios/${id}`} 
            className="text-summer-secondary hover:text-summer-secondary/80 transition-all duration-300 text-sm font-bold flex items-center group"
          >
            Ver detalles
            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <button 
            className="text-summer-dark hover:text-summer-secondary p-2 rounded-full hover:bg-summer-secondary/10 transition-all duration-300 relative"
            onClick={handleShare}
            title="Compartir episodio"
          >
            <Share2 size={17} />
            {showShareFeedback && (              <span className="absolute -top-9 -left-12 bg-black/80 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-md whitespace-nowrap z-10 shadow-md border border-black/30">
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