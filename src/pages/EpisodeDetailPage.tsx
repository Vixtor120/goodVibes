import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import episodesData from '../json/episodios.json';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from '../components/VideoPlayer';
import { Calendar, Clock, Share2, Tag, Loader, Music, Video } from 'lucide-react';
import { shareEpisode } from '../utils/shareUtils';
import { getAudioDuration } from '../utils/audioUtils';

import { getTagStyle } from '../utils/tagStyles';

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
    }  }, [episode]);

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
      >
        <h1 className="text-3xl md:text-4xl font-bold text-summer-dark mb-4">{episode.title}</h1>
        
        <div className="flex flex-wrap items-center text-sm text-summer-dark gap-4 mb-6">
          <span className="flex items-center border-l-2 border-orange-400 pl-2">
            <Calendar size={16} className="mr-1 text-orange-400" /> 
            {episode.date}
          </span>
          <span className="flex items-center border-l-2 border-summer-turquoise pl-2">
            <Clock size={16} className="mr-1 text-summer-turquoise" /> 
            {isLoadingDuration ? (
              <span className="flex items-center">
                <Loader size={12} className="animate-spin mr-1 text-summer-accent" />
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
            {episode.label.map((tag: string, index: number) => (              <motion.span
                key={index}
                className={getTagStyle(index)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Tag size={14} className="opacity-70" />
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Media Toggle Controls */}
        <div className="absolute top-0 right-0 flex items-center rounded-bl-lg overflow-hidden shadow-lg">
          <button
            onClick={() => setIsVideoMode(false)}
            className={`p-2 flex items-center justify-center border-t-2 ${
              !isVideoMode 
                ? 'border-t-orange-500 bg-white text-orange-500 shadow-inner' 
                : 'border-t-transparent bg-gray-100 text-gray-600 hover:bg-white/90'
            } transition-all duration-300`}
            aria-label="Cambiar a Audio"
          >
            <Music size={20} />
          </button>
          <button
            onClick={() => setIsVideoMode(true)}
            className={`p-2 flex items-center justify-center border-t-2 ${
              isVideoMode 
                ? 'border-t-orange-500 bg-white text-orange-500 shadow-inner' 
                : 'border-t-transparent bg-gray-100 text-gray-600 hover:bg-white/90'
            } transition-all duration-300`}
            aria-label="Cambiar a Video"
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
          {/* Cover Image or Video */}
          {!isVideoMode && (
            <motion.div
              className="w-full aspect-video relative mb-6 border-t-4 border-orange-500 shadow-lg rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={episode.imageUrl} 
                alt={episode.title} 
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          )}

          {/* Description */}
          <motion.div 
            className="prose prose-lg max-w-none mb-8"
            variants={fadeInUp}
          >
            <p className="text-summer-dark leading-relaxed">{episode.description}</p>
          </motion.div>

          {/* Media Player */}
          <motion.div 
            ref={audioRef}
            className="mb-8 bg-white rounded-xl shadow-xl overflow-hidden"
            variants={fadeInUp}
          >
            {isVideoMode && episode.videoUrl ? (
              <VideoPlayer src={episode.videoUrl} autoplay={shouldAutoplay} />
            ) : episode.videoUrl ? (
              <AudioPlayer src={episode.videoUrl} autoplay={shouldAutoplay} />
            ) : (
              <div className="p-4 text-summer-dark text-center bg-orange-50">
                No hay contenido multimedia disponible
              </div>
            )}
          </motion.div>
        </div>

        {/* Share Section - Improved */}
        <motion.div 
          className="relative"
          variants={fadeInUp}
        >
          <div className="sticky top-4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-summer-accent/10">
              <h2 className="text-xl font-semibold text-summer-dark mb-4 flex items-center gap-2">
                <Share2 size={20} className="text-summer-accent" />
                Comparte este episodio
              </h2>
                <motion.button
                onClick={handleShare}
                className="w-full py-3.5 px-6 rounded-lg font-medium 
                         bg-gradient-to-r from-orange-500 to-orange-600
                         hover:from-orange-600 hover:to-orange-700
                         text-white
                         transition-all duration-300 
                         shadow-md hover:shadow-xl hover:shadow-orange-400/30
                         flex items-center justify-center gap-3 group"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 
                  size={20} 
                  className="group-hover:rotate-12 transition-transform duration-300" 
                />
                <span className="text-base font-medium">Compartir episodio</span>
              </motion.button>
              
              <AnimatePresence>
                {showShareFeedback && (
                  <motion.div 
                    className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">¡Enlace copiado correctamente!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Información adicional */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Comparte este episodio con tus amigos y ayúdanos a difundir las buenas vibraciones del verano.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EpisodeDetailPage;