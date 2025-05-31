import { Share2, Clock, Calendar, Tag } from 'lucide-react';
import { Episode as EpisodeType } from '../interfaces/Episode';
import { getTagStyle } from '../utils/tagStyles';
import { useState } from 'react';
import { shareEpisode } from '../utils/shareUtils';
import { motion } from 'framer-motion';



interface EpisodeProps extends Omit<EpisodeType, 'videoUrl'> {
  videoUrl?: string;
}

const Episode: React.FC<EpisodeProps> = ({ 
  id, 
  title, 
  description, 
  duration, 
  date,
  imageUrl,
  label = [],
}) => {
  const [showShareFeedback, setShowShareFeedback] = useState(false);

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
    <motion.article 
      className="card-summer overflow-hidden h-[460px] shadow-lg transition-all duration-300 flex flex-col rounded-2xl bg-white border border-summer-accent/10"
      whileHover={{ 
        y: -5,
        boxShadow: '0 15px 30px rgba(0, 119, 182, 0.15)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      role="article"
      aria-labelledby={`episode-title-${id}`}
    >
      <div className="relative h-[200px] overflow-hidden group" role="img" aria-label={`Imagen del episodio: ${title}`}>
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 z-20 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600" 
             role="presentation"></div>
        
        {/* Imagen con efecto hover */}
        <img 
          src={imageUrl} 
          alt={`Imagen de portada para el episodio: ${title}`} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105" 
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=GoodVibes';
          }}
        />
        
        {/* Overlay gradiente */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-summer-dark to-transparent flex items-end"
          style={{
            background: 'linear-gradient(to top, rgba(0, 52, 89, 0.9) 0%, rgba(0, 52, 89, 0.4) 60%, rgba(0, 52, 89, 0) 100%)'
          }}
          role="presentation">
          <div className="p-6 w-full relative z-20">
            {/* Meta información */}
            <div className="flex flex-wrap items-center gap-2 text-sm" aria-label="Duración y fecha del episodio">
              <motion.span 
                className="flex items-center bg-orange-50 text-orange-700 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Clock size={14} className="mr-1.5" aria-hidden="true" />
                <span className="font-medium">{duration}</span>
              </motion.span>              <motion.span 
                className="flex items-center bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 border border-teal-200/40 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm hover:shadow-md hover:border-teal-300/40 transition-all duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Calendar size={14} className="mr-1.5 text-teal-500" aria-hidden="true" />
                <span className="font-medium">{date}</span>
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-6 flex flex-col">
        {/* Título */}
        <motion.h2 
          id={`episode-title-${id}`} 
          className="text-xl font-bold mb-2 text-summer-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h2>

        {/* Descripción */}
        <motion.p 
          className="text-gray-600 mb-4 line-clamp-3" 
          aria-label="Descripción del episodio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {description}
        </motion.p>
        
        <div className="mt-auto">
          {/* Etiquetas  */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-4" 
            role="list" 
            aria-label="Etiquetas del episodio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {label.map((tag, index) => (              <motion.span
                key={index}
                className={getTagStyle(index)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Tag size={14} className="opacity-70" />
                {tag}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Botón compartir y feedback */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={handleShare}
              className="text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2 group"
              aria-label={`Compartir episodio: ${title}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
              <span className="font-medium">Compartir</span>
            </motion.button>
            
            {showShareFeedback && (
              <motion.div 
                className="absolute bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                role="alert"
                aria-live="polite"
              >
                ¡Enlace copiado!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default Episode;