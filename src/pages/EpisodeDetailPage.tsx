import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import episodesData from '../json/episodios.json';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from '../components/VideoPlayer';
import { Calendar, Clock, Share2, Tag, Loader, Music, Video } from 'lucide-react';
import { shareEpisode } from '../utils/shareUtils';
import { getAudioDuration } from '../utils/audioUtils';

const EpisodeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const shouldAutoplay = searchParams.get('autoplay') === 'true';
  const audioRef = useRef<HTMLDivElement>(null);
  const [showShareFeedback, setShowShareFeedback] = useState(false);
  const [episodeDuration, setEpisodeDuration] = useState<string | null>(null);
  const [isLoadingDuration, setIsLoadingDuration] = useState(true);
  const [isVideoMode, setIsVideoMode] = useState(false);
  
  const episode = episodesData.find(ep => ep.id === parseInt(id || '', 10));

  // Load actual audio duration when episode changes
  useEffect(() => {
    if (episode && episode.videoUrl) {
      setIsLoadingDuration(true);
      getAudioDuration(episode.videoUrl)
        .then(duration => {
          setEpisodeDuration(duration);
          setIsLoadingDuration(false);
        })
        .catch(error => {
          console.error("Error getting audio duration:", error);
          setEpisodeDuration(null); // Don't use fallback, show loading error instead
          setIsLoadingDuration(false);
        });
    }
  }, [episode]);

  // Get a color based on the label string for consistent coloring
  const getLabelColor = (label: string): string => {
    const colors = [
      'bg-summer-accent/80 text-white border-summer-accent',
      'bg-summer-turquoise/80 text-white border-summer-turquoise',
      'bg-summer-mint/80 text-white border-summer-mint',
      'bg-summer-secondary/80 text-white border-summer-secondary',
      'bg-summer-accent/60 text-white border-summer-accent/60',
      'bg-summer-turquoise/60 text-white border-summer-turquoise/60',
      'bg-summer-mint/60 text-white border-summer-mint/60',
      'bg-summer-secondary/60 text-white border-summer-secondary/60'
    ];
    // Use the sum of character codes to determine a consistent color
    const sum = label.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Efecto para hacer scroll al reproductor y autoplay si es necesario
  useEffect(() => {
    if (shouldAutoplay && audioRef.current) {
      // Scroll al reproductor
      audioRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Dar tiempo para que el AudioPlayer se monte completamente
      const timer = setTimeout(() => {
        // Enviar evento de clic al botón de reproducción dentro del AudioPlayer
        const playButton = audioRef.current?.querySelector('button');
        if (playButton && !playButton.classList.contains('playing')) {
          playButton.click();
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldAutoplay]);

  // Animaciones reutilizables
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  if (!episode) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">Episodio no encontrado</h2>
          <p className="text-gray-400">El episodio que estás buscando no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (episode) {
      const success = await shareEpisode(episode.id, episode.title);
      if (success) {
        setShowShareFeedback(true);
        setTimeout(() => setShowShareFeedback(false), 2000);
      }
    }
  };

  // When rendering duration, use calculated duration instead of the placeholder
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <motion.div 
        className="mb-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-summer-accent to-summer-turquoise">{episode.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-white gap-4 mb-6">
          <span className="flex items-center">
            <Calendar size={16} className="mr-1 text-summer-accent" /> 
            {episode.date}
          </span>
          <span className="flex items-center">
            <Clock size={16} className="mr-1 text-purple-400" /> 
            {isLoadingDuration ? (
              <span className="flex items-center">
                <Loader size={12} className="animate-spin mr-1" />
                Calculando...
              </span>
            ) : (
              episodeDuration || episode.duration
            )}
          </span>
        </div>

        {/* Tags/Labels */}
        {episode.label && episode.label.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {episode.label.map((tag: string, index: number) => (
              <motion.span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getLabelColor(tag)} flex items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Tag size={12} className="mr-1.5 opacity-80" />
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Toggle for Audio/Video */}
        <div className="absolute top-0 right-0 flex items-center space-x-2">
          <button
            onClick={() => setIsVideoMode(false)}
            className={`p-2 rounded-full flex items-center justify-center ${
              !isVideoMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            aria-label="Switch to Audio"
          >
            <Music size={20} />
          </button>
          <button
            onClick={() => setIsVideoMode(true)}
            className={`p-2 rounded-full flex items-center justify-center ${
              isVideoMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            aria-label="Switch to Video"
          >
            <Video size={20} />
          </button>
        </div>
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="md:col-span-2">
          {/* Cover Image */}
          {!isVideoMode && (
            <motion.img 
              src={episode.imageUrl} 
              alt={episode.title} 
              className="w-full aspect-video object-cover rounded-xl shadow-lg mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          )}
          
          {/* Media Player */}
          <motion.div 
            ref={audioRef} 
            className="mb-8"
            variants={fadeInUp}
          >
            {isVideoMode ? (
              <VideoPlayer src={episode.videoUrl} autoplay={shouldAutoplay} />
            ) : (
              <AudioPlayer src={episode.audioUrl} autoplay={shouldAutoplay} />
            )}
          </motion.div>
          
          {/* Description */}          <motion.div 
            className="bg-white/90 rounded-xl p-6 mb-6 shadow-lg border border-summer-accent/20"
            variants={fadeInUp}
          >
            <h2 className="text-xl font-semibold text-summer-text-dark mb-4 border-b border-summer-accent/30 pb-2">Descripción del episodio</h2>
            <p className="text-summer-text-medium leading-relaxed font-medium">{episode.description}</p>
          </motion.div>
          
          {/* Share Section */}          <motion.div 
            className="flex flex-wrap gap-4 justify-between items-center bg-summer-dark/80 p-4 rounded-xl border border-summer-accent/30"
            variants={fadeInUp}
          >
            <div className="flex items-center">
              <motion.button 
                className="bg-gradient-to-r from-summer-accent to-summer-accent-hover hover:from-summer-accent-hover hover:to-summer-accent text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300 relative font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
              >
                <Share2 size={16} className="mr-2" />
                Compartir episodio
                {showShareFeedback && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    {'share' in navigator ? '¡Compartido!' : '¡Enlace copiado!'}
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Sidebar */}
        <motion.div 
          className="md:col-span-1"
          variants={fadeInUp}
        >          <div className="bg-white/90 rounded-xl p-6 sticky top-24 border border-summer-accent/20 shadow-lg">
            <h3 className="text-lg font-semibold text-summer-text-dark mb-4 border-b border-summer-accent/30 pb-2">Más episodios</h3>
            
            <div className="space-y-4">
              {episodesData.filter(ep => ep.id !== parseInt(id || '', 10)).slice(0, 3).map((ep, index) => (
                <motion.a 
                  key={ep.id} 
                  href={`/episodios/${ep.id}`}
                  className="flex items-start space-x-3 group hover:bg-summer-accent/10 p-2 rounded-lg transition-all"
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <img 
                    src={ep.imageUrl} 
                    alt={ep.title}
                    className="w-16 h-16 object-cover rounded-lg group-hover:brightness-110 transition-all" 
                  />
                  <div>                  <h4 className="text-summer-text-dark font-medium line-clamp-2 group-hover:text-summer-accent transition-colors">{ep.title}</h4>
                    <p className="text-xs text-summer-text-medium font-medium">{ep.date}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EpisodeDetailPage;