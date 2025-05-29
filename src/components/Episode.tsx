import { Link } from 'react-router-dom';
import { Share2, Clock, Calendar, ChevronRight, Loader } from 'lucide-react';
import { Episode as EpisodeType } from '../interfaces/Episode';
import { useState, useEffect } from 'react';
import { shareEpisode } from '../utils/shareUtils';
import { getAudioDuration } from '../utils/audioUtils';
import { motion } from 'framer-motion';

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
  // Navigation is now only handled through Link component
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
  // Get a color based on the label string for consistent coloring with summer vibes
  const getLabelColor = (label: string): string => {
    const colors = [
      'bg-gradient-to-r from-yellow-400/90 to-amber-400/80 text-summer-dark',
      'bg-gradient-to-r from-orange-400/90 to-amber-400/80 text-summer-dark',
      'bg-gradient-to-r from-blue-400/90 to-cyan-400/80 text-white',
      'bg-gradient-to-r from-cyan-400/90 to-teal-400/80 text-summer-dark',
      'bg-gradient-to-r from-lime-400/90 to-green-400/80 text-summer-dark',
      'bg-gradient-to-r from-rose-400/90 to-pink-400/80 text-white'
    ];
    
    // Define specific colors for common tags
    const tagColors: Record<string, string> = {
      'Charlando': 'bg-gradient-to-r from-yellow-400/90 to-amber-400/80 text-summer-dark',
      'Introducción': 'bg-gradient-to-r from-blue-400/90 to-cyan-400/80 text-white',
      'Tech': 'bg-gradient-to-r from-indigo-500/90 to-purple-400/80 text-white',
      'Películas': 'bg-gradient-to-r from-red-500/90 to-rose-400/80 text-white',
      'Videojuegos': 'bg-gradient-to-r from-emerald-500/90 to-green-400/80 text-summer-dark',
      'Debate': 'bg-gradient-to-r from-amber-500/90 to-orange-400/80 text-summer-dark',
      'Música': 'bg-gradient-to-r from-rose-400/90 to-pink-400/80 text-white',
    };
    
    // Return specific color if the tag is in our predefined list, otherwise use algorithm
    if (tagColors[label]) {
      return tagColors[label];
    }
    
    // Use the sum of character codes to determine a consistent color
    const sum = label.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };
  // Play functionality removed as requested

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
      className="card-summer rounded-[1.25rem] overflow-hidden h-[460px] shadow-xl transition-all duration-300 flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 248, 255, 0.97))',
        boxShadow: '0 15px 35px rgba(0, 119, 182, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.8)'
      }}
    >
      {/* Decorative summer elements */}
      <div className="absolute top-2 right-2 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl z-0"></div>
      <div className="absolute bottom-10 left-5 w-16 h-16 bg-blue-400/10 rounded-full blur-xl z-0"></div>
      
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" 
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=GoodVibes';
          }}
        />
        {/* Gradient overlay without wave */}        <div 
          className="absolute inset-0 bg-gradient-to-t from-summer-dark/80 via-summer-dark/40 to-transparent flex items-end pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 52, 89, 0.85) 0%, rgba(0, 52, 89, 0.4) 50%, rgba(0, 52, 89, 0.1) 100%)'
          }}        >          <div className="p-6 w-full relative z-20">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {isLoadingDuration ? (
                <span className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                  <Loader size={14} className="mr-1.5 text-summer-accent animate-spin" />
                  <span className="font-medium">Calculando...</span>
                </span>
              ) : (
                <span className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm transition-all duration-300 group-hover:bg-summer-secondary/90">
                  <Clock size={14} className="mr-1.5 text-summer-accent" />
                  <span className="font-medium">{displayDuration || "--:--"}</span>
                </span>
              )}
              {date && (
                <span className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm transition-all duration-300 group-hover:bg-white/90">
                  <Calendar size={14} className="mr-1.5 text-summer-accent" />
                  <span className="font-medium">{date}</span>
                </span>
              )}
            </div>
          </div>
        </div>      </div>      <div className="p-6 pt-5 flex-1 flex flex-col relative z-10">
        <h3 className="text-xl font-bold text-summer-dark mb-3 line-clamp-2 leading-tight border-b border-summer-secondary/30 pb-2.5 group-hover:text-summer-accent transition-colors duration-300">{title}</h3>
        {label && label.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {label.map((tag: string, index: number) => (
              <span 
                key={index} 
                className={`px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${getLabelColor(tag)} transition-all duration-300 hover:scale-105`}
                style={{
                  boxShadow: '0 2px 8px rgba(255, 209, 102, 0.15)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-summer-dark text-sm line-clamp-3 leading-relaxed flex-grow font-medium relative">
          {description}
          
          {/* Glowing effect at the end of the text */}
          <span className="absolute bottom-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent"></span>
        </p>
        
        <div className="flex justify-between items-center pt-4 mt-auto border-t border-summer-secondary/20">
          <Link 
            to={`/episodios/${id}`} 
            className="text-summer-accent hover:text-summer-accent-hover transition-all duration-300 text-sm font-bold flex items-center group"
            style={{
              textShadow: '0 1px 2px rgba(255, 107, 53, 0.1)'
            }}
          >
            Ver detalles
            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <button 
            className="text-summer-dark hover:text-summer-accent p-2.5 rounded-full hover:bg-summer-accent/5 transition-all duration-300 relative"
            onClick={handleShare}
            title="Compartir episodio"
            style={{
              border: '1px solid transparent',
              borderImageSlice: 1,
              borderImageSource: isHovered ? 'linear-gradient(to right, rgba(255, 107, 53, 0.3), rgba(255, 209, 102, 0.3))' : 'none'
            }}
          >
            <Share2 size={17} />
            {showShareFeedback && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-9 -left-12 bg-summer-dark/90 backdrop-blur-md text-white text-xs py-2 px-3.5 rounded-lg whitespace-nowrap z-10 shadow-lg border border-summer-accent/20"
              >
                {'share' in navigator ? '¡Compartido!' : '¡Enlace copiado!'}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Episode;