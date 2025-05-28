import { Link } from 'react-router-dom';
import { Play, ChevronRight, Headphones, Mic, Film, Gamepad2, Sparkles, Clock, Calendar } from 'lucide-react';
import Episode from '../components/Episode';
import episodesData from '../json/episodios.json';
import { Episode as EpisodeType } from '../interfaces/Episode';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/animations.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAudioDuration } from '../utils/audioUtils';

const HomePage = () => {
  const [featuredEpisodes, setFeaturedEpisodes] = useState<EpisodeType[]>([]);
  const latestEpisode = episodesData[episodesData.length - 1]; // Actualizado: usamos el último episodio del array
  const navigate = useNavigate();
  const [latestDuration, setLatestDuration] = useState<string>('Calculando...');
  const [isLoadingDuration, setIsLoadingDuration] = useState<boolean>(true);

  useEffect(() => {
    // Sort episodes by ID in descending order (newest first)
    const sortedEpisodes = [...episodesData].sort((a, b) => b.id - a.id);
    // Get the 3 most recent episodes
    setFeaturedEpisodes(sortedEpisodes.slice(0, 3));
    // Calculate duration for latest episode
    if (latestEpisode && latestEpisode.audioUrl) {
      setIsLoadingDuration(true);
      getAudioDuration(latestEpisode.audioUrl)
        .then(duration => setLatestDuration(duration))
        .catch(() => setLatestDuration('--:--'))
        .finally(() => setIsLoadingDuration(false));
    }
  }, [latestEpisode]);

  // This function is now used for both the latest episode play button and any featured episode
  const handlePlayEpisode = (id: number) => {
    navigate(`/episodios/${id}?autoplay=true`);
  };

  // Variantes para animaciones mejoradas
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section - Modern and clean */}
      <motion.div 
        className="flex flex-col md:flex-row items-center mb-20 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >          <motion.span 
            className="bg-yellow-400 text-summer-dark font-bold text-xs px-3 py-1.5 rounded-full inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              border: '1.5px solid #003459',
              boxShadow: '2px 2px 0 #003459'
            }}
          >
            Podcast Personal
          </motion.span><motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-summer-dark mb-6 leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >            Opiniones sinceras con <motion.span 
              className="bg-yellow-400 text-summer-dark font-black px-4 py-2 rounded-md inline-block"
              initial={{ scale: 0.95 }}
              animate={{ 
                scale: [0.98, 1.02, 0.98],
                rotate: [-1, 1, -1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ 
                border: '3px solid #003459',
                boxShadow: '4px 4px 0 #003459',
                letterSpacing: '1px',
                backgroundColor: '#FFD166',
                textShadow: '1px 1px 0 rgba(255,255,255,0.5)'
              }}
            >
              Good Vibes
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-black mb-8 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Un podcast casero donde compartimos nuestras opiniones personales sobre películas, videojuegos, tecnología y más. Sin pretensiones, solo buenas vibras.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >            <Link 
              to="/episodios"              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 px-7 rounded-full flex items-center font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/30 transform hover:-translate-y-1"
            >
              <Play size={18} className="mr-2" />
              Escuchar episodios
            </Link>
            <Link 
              to="/contacto" 
              className="bg-transparent hover:bg-white/10 border-2 border-yellow-400 text-yellow-400 py-3 px-7 rounded-full flex items-center font-medium transition-all duration-300 transform hover:-translate-y-1"
            >
              Contáctanos
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 mt-10 md:mt-0 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 90 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <motion.img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              className="w-full relative z-10 transform transition-transform duration-700 hover:scale-105"
              alt="Micrófono de condensador por Israel Palacio en Unsplash"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 to-blue-900/40 z-20 mix-blend-overlay"></div>
          </div>
          
          {/* Image attribution - More subtle */}
          <div className="mt-2 text-right">
            <a 
              href="https://unsplash.com/es/fotos/fotografia-bokeh-del-microfono-de-condensador-Y20JJ_ddy9M" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-white font-medium hover:text-summer-secondary transition-colors"
            >
              Imagen: Israel Palacio vía Unsplash
            </a>
          </div>
          
          {/* Decorative elements - More subtle */}
          <motion.div 
            className="absolute -top-6 -right-6 w-40 h-40 bg-purple-600/15 rounded-full blur-3xl z-0"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 6, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-600/15 rounded-full blur-3xl z-0"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 7, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          ></motion.div>
        </motion.div>
      </motion.div>

      {/* Latest Episode Section - Summer themed */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Title area */}
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-summer-dark flex items-center gap-2">
            <div className="relative flex items-center gap-3">
              <span className="inline-block">Último episodio</span>
              <motion.div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-summer-dark px-3 py-1 rounded-md uppercase tracking-wide font-bold text-xs"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                ¡Nuevo!
              </motion.div>
            </div>
          </h2>
          <Link 
            to="/episodios" 
            className="text-summer-dark hover:text-summer-dark/80 transition-colors duration-300 flex items-center text-sm font-medium"
          >
            Ver todos los episodios
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </motion.div>

        <motion.div 
          className="overflow-hidden rounded-2xl shadow-lg border border-yellow-400/30 bg-gradient-to-br from-[#FFF6E5] via-[#FFEFD4] to-[#FFF6E5]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row">
            <motion.div 
              className="md:w-2/5 relative aspect-video md:aspect-auto overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={latestEpisode.imageUrl}
                alt={latestEpisode.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-summer-dark/40 via-summer-dark/20 to-transparent"></div>
            </motion.div>
            
            <div className="md:w-3/5 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-summer-dark text-sm flex items-center font-medium">
                  <Calendar size={14} className="mr-1.5 text-summer-accent"/> 
                  {new Date(latestEpisode.date).toLocaleDateString()}
                </span>
                <span className="text-summer-dark text-sm flex items-center font-medium">
                  <Clock size={14} className="mr-1.5 text-summer-accent"/> 
                  {isLoadingDuration ? 'Calculando...' : latestDuration}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-summer-dark mb-4">{latestEpisode.title}</h3>
              
              {latestEpisode.label && latestEpisode.label.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {latestEpisode.label.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 text-sm rounded-full font-medium bg-yellow-400/10 text-summer-dark border border-yellow-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-summer-dark mb-6 leading-relaxed font-medium">{latestEpisode.description}</p>
              
              <div className="mb-6">
                <AudioPlayer 
                  src={latestEpisode.audioUrl} 
                />
              </div>

              <div className="flex items-center gap-4">
                <Link 
                  to={`/episodios/${latestEpisode.id}?autoplay=true`}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-summer-dark px-6 py-3 rounded-full flex items-center font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-1"
                >
                  <Play size={18} className="mr-2" />
                  Reproducir episodio
                </Link>
                <Link 
                  to={`/episodios/${latestEpisode.id}`} 
                  className="text-summer-dark hover:text-summer-dark/80 transition-all duration-300 flex items-center font-medium group"
                >
                  Ver detalles
                  <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Proceso Creativo Section - Summer themed, modern, and visually engaging */}        <motion.div 
        className="mb-20 rounded-2xl p-8 bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 border border-yellow-400/30 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-summer-dark mb-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 inline-block px-6 py-2 rounded-lg shadow-summer-secondary/10 shadow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-summer-dark drop-shadow">Nuestro Proceso Creativo</span>
          </motion.h2>
          <motion.p 
            className="text-summer-dark/80 max-w-2xl mx-auto text-lg font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Desde la inspiración hasta la grabación y edición, cada episodio es creado con pasión y dedicación bajo el sol del verano. ¡Descubre cómo convertimos ideas frescas en buenas vibras para ti!
          </motion.p>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-6">
          <div className="flex flex-col items-center bg-yellow-200/60 border border-yellow-400/30 rounded-xl p-6 shadow-md w-full md:w-1/3 transition-transform hover:scale-105">
            <Sparkles size={36} className="text-summer-accent mb-3" />
            <h3 className="text-lg font-bold text-summer-dark mb-2">Inspiración</h3>
            <p className="text-summer-dark/80 text-center">Buscamos temas frescos y actuales, inspirados en el verano y en las tendencias que nos apasionan.</p>
          </div>
          <div className="flex flex-col items-center bg-yellow-100/80 border border-yellow-400/30 rounded-xl p-6 shadow-md w-full md:w-1/3 transition-transform hover:scale-105">
            <Mic size={36} className="text-summer-secondary mb-3" />
            <h3 className="text-lg font-bold text-summer-dark mb-2">Grabación</h3>
            <p className="text-summer-dark/80 text-center">Grabamos en un ambiente relajado, con risas y buena compañía, para transmitir la mejor energía.</p>
          </div>
          <div className="flex flex-col items-center bg-yellow-50/90 border border-yellow-400/30 rounded-xl p-6 shadow-md w-full md:w-1/3 transition-transform hover:scale-105">
            <Headphones size={36} className="text-summer-mint mb-3" />
            <h3 className="text-lg font-bold text-summer-dark mb-2">Edición</h3>
            <p className="text-summer-dark/80 text-center">Editamos cada episodio con atención al detalle, asegurando calidad y frescura en cada minuto.</p>
          </div>
        </div>      </motion.div>

      {/* Temas que exploramos - Modern chip-like design */}      
      <motion.div 
        className="mb-20 p-6 bg-gradient-to-br from-summer-dark/10 to-summer-dark/5 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h3 
          className="text-xl font-bold text-summer-dark mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Temas que exploramos
        </motion.h3>
          
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
            {/* Temas con animación staggered */}          <motion.div
            className="flex items-center bg-white/70 px-4 py-2.5 rounded-full border border-summer-accent/30"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Film size={18} className="text-summer-accent mr-2" />
            <span className="text-black font-medium">Películas</span>
          </motion.div>
          <motion.div
            className="flex items-center bg-white/70 px-4 py-2.5 rounded-full border border-summer-turquoise/30"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Gamepad2 size={18} className="text-summer-turquoise mr-2" />
            <span className="text-black font-medium">Videojuegos</span>
          </motion.div>
          <motion.div
            className="flex items-center bg-white/70 px-4 py-2.5 rounded-full border border-summer-mint/30"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Headphones size={18} className="text-summer-mint mr-2" />
            <span className="text-black font-medium">Tecnología</span>
          </motion.div>
          <motion.div
            className="flex items-center bg-white/70 px-4 py-2.5 rounded-full border border-summer-secondary/30"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Sparkles size={18} className="text-summer-secondary mr-2" />
            <span className="text-black font-medium">Y mucho más</span>
          </motion.div>        </motion.div>
      </motion.div>

      {/* Featured Episodes Section - Modern grid */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-summer-dark">Episodios destacados</h2>          <Link 
            to="/episodios" 
            className="text-summer-secondary hover:text-summer-secondary/80 transition-colors duration-300 flex items-center text-sm font-medium"
          >
            Ver todos
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {featuredEpisodes.map((episode, index) => (
            <motion.div 
              key={episode.id}
              variants={fadeInUp}
              custom={index}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => handlePlayEpisode(episode.id)}
              style={{ cursor: 'pointer' }}
              className="bg-gradient-to-br from-[#FFF6E5] via-[#FFEFD4] to-[#FFF6E5] rounded-xl overflow-hidden border border-yellow-400/30 hover:border-yellow-500/30 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20"
            >
              <Episode 
                id={episode.id}
                title={episode.title}
                description={episode.description}
                duration={episode.duration}
                date={episode.date}
                imageUrl={episode.imageUrl}
                label={episode.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;