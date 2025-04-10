import { Link } from 'react-router-dom';
import { Play, ChevronRight, Headphones, Mic, Share2, Film, Gamepad2, Sparkles } from 'lucide-react';
import Episode from '../components/Episode';
import episodesData from '../json/episodios.json';
import { Episode as EpisodeType } from '../interfaces/Episode';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/animations.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [featuredEpisodes, setFeaturedEpisodes] = useState<EpisodeType[]>([]);
  const latestEpisode = episodesData[episodesData.length - 1]; // Actualizado: usamos el último episodio del array
  const navigate = useNavigate();

  useEffect(() => {
    // Sort episodes by ID in descending order (newest first)
    const sortedEpisodes = [...episodesData].sort((a, b) => b.id - a.id);
    // Get the 3 most recent episodes
    setFeaturedEpisodes(sortedEpisodes.slice(0, 3));
  }, []);

  // This function is now used for both the latest episode play button and any featured episode
  const handlePlayEpisode = (id: number) => {
    navigate(`/episodios/${id}?autoplay=true`);
  };

  // Get a color based on the label string for consistent coloring
  const getLabelColor = (label: string): string => {
    const colors = [
      'bg-purple-500/70 text-purple-100',
      'bg-blue-500/70 text-blue-100',
      'bg-green-500/70 text-green-100',
      'bg-red-500/70 text-red-100',
      'bg-yellow-500/70 text-yellow-100',
      'bg-indigo-500/70 text-indigo-100',
      'bg-pink-500/70 text-pink-100',
      'bg-teal-500/70 text-teal-100'
    ];
    // Use the sum of character codes to determine a consistent color
    const sum = label.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
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
        >
          <motion.span 
            className="bg-gradient-to-r from-purple-600/20 to-purple-600/40 text-purple-200 px-4 py-1.5 rounded-full text-sm font-medium mb-5 inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Podcast Personal
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Opiniones sinceras con <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 animate-pulse-slow">Good Vibes</span>
          </motion.h1>
          <motion.p 
            className="text-gray-300 mb-8 text-lg leading-relaxed"
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
          >
            <Link 
              to="/episodios" 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-7 rounded-full flex items-center font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 transform hover:-translate-y-1"
            >
              <Play size={18} className="mr-2" />
              Escuchar episodios
            </Link>
            <Link 
              to="/contacto" 
              className="bg-transparent hover:bg-gray-800/80 border border-purple-500 text-purple-400 py-3 px-7 rounded-full flex items-center font-medium transition-all duration-300 transform hover:-translate-y-1"
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
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
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

      {/* Latest Episode Section - Modernized prominent display */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <div className="relative">
              <span className="inline-block">Último episodio</span>
              <motion.span 
                className="absolute -top-2 -right-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-2 py-0.5 rounded-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                ¡NUEVO!
              </motion.span>
            </div>
          </h2>
          <Link 
            to="/episodios" 
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center text-sm font-medium"
          >
            Ver todos los episodios
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </motion.div>

        <motion.div 
          className="overflow-hidden rounded-2xl shadow-lg border border-gray-700/40 hover:border-purple-500/30 transition-all duration-500"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)",
            y: -5
          }}
        >
          <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90">
            <motion.div 
              className="md:w-2/5 relative aspect-video md:aspect-auto overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={latestEpisode.imageUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"}
                alt={latestEpisode.title}
                className="object-cover w-full h-full"
              />
            </motion.div>
            
            <div className="md:w-3/5 p-8">
              <div className="flex items-center mb-3">
                <span className="bg-gradient-to-r from-purple-600/20 to-purple-600/30 text-purple-300 text-xs px-3 py-1 rounded-full mr-3">
                  {new Date(latestEpisode.date).toLocaleDateString()}
                </span>
                <span className="text-gray-400 text-sm flex items-center">
                  <Headphones size={14} className="mr-1"/> {latestEpisode.duration}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 line-clamp-2">{latestEpisode.title}</h3>
              
              {/* Display labels for the latest episode */}
              {latestEpisode.label && latestEpisode.label.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {latestEpisode.label.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className={`px-2.5 py-1 text-xs rounded-full font-medium ${getLabelColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4 leading-relaxed">{latestEpisode.description}</p>
              
              {/* Media Player */}
              <div className="mt-auto">
                <AudioPlayer 
                  src={latestEpisode.audioUrl} 
                />
              </div>

              {/* Ver detalles button */}
              <div className="mt-4">
                <Link 
                  to={`/episodios/${latestEpisode.id}`} 
                  className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-1.5 rounded-full flex items-center font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 text-sm"
                >
                  Ver detalles
                  <ChevronRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Proceso Creativo Section - Simplified and modern */}
      <motion.div 
        className="mb-20 rounded-2xl p-8 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-gray-700/30"
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
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Nuestro Proceso Creativo
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Creamos contenido desde una perspectiva personal y dinámica, 
            sin pretender ser expertos. ¡Lo auténtico es lo que importa!
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Pasos del proceso creativo - Simplified cards */}
          <motion.div 
            className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(124, 58, 237, 0.15)" }}
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/30 p-3 rounded-full inline-block mb-4">
              <Sparkles className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Elegimos el tema</h3>
            <p className="text-gray-300 leading-relaxed">
              Conversamos sobre temas que nos apasionan, desde películas hasta videojuegos o tendencias tecnológicas.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(124, 58, 237, 0.15)" }}
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/30 p-3 rounded-full inline-block mb-4">
              <Mic className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Conversamos</h3>
            <p className="text-gray-300 leading-relaxed">
              Sin guiones rígidos, grabamos una conversación natural y fluida donde compartimos nuestras opiniones personales.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(124, 58, 237, 0.15)" }}
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/30 p-3 rounded-full inline-block mb-4">
              <Share2 className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Compartimos</h3>
            <p className="text-gray-300 leading-relaxed">
              Editamos con Audacity para mejorar la calidad del audio, creamos gráficos con Canva, y lo subimos para que puedas disfrutarlo.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Temas que exploramos - Modern chip-like design */}
        <motion.div 
          className="mt-10 p-6 bg-gradient-to-br from-gray-800/40 to-gray-800/20 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h3 
            className="text-xl font-bold text-white mb-5"
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
            {/* Temas con animación staggered */}
            <motion.div 
              className="flex items-center bg-gray-800/70 px-4 py-2.5 rounded-full border border-gray-700/50"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(31, 41, 55, 0.95)" }}
            >
              <Film size={18} className="text-purple-400 mr-2" />
              <span className="text-gray-200 font-medium">Películas</span>
            </motion.div>
            <motion.div 
              className="flex items-center bg-gray-800/70 px-4 py-2.5 rounded-full border border-gray-700/50"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(31, 41, 55, 0.95)" }}
            >
              <Gamepad2 size={18} className="text-purple-400 mr-2" />
              <span className="text-gray-200 font-medium">Videojuegos</span>
            </motion.div>
            <motion.div 
              className="flex items-center bg-gray-800/70 px-4 py-2.5 rounded-full border border-gray-700/50"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(31, 41, 55, 0.95)" }}
            >
              <Headphones size={18} className="text-purple-400 mr-2" />
              <span className="text-gray-200 font-medium">Tecnología</span>
            </motion.div>
            <motion.div 
              className="flex items-center bg-gray-800/70 px-4 py-2.5 rounded-full border border-gray-700/50"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(31, 41, 55, 0.95)" }}
            >
              <Sparkles size={18} className="text-purple-400 mr-2" />
              <span className="text-gray-200 font-medium">Y mucho más</span>
            </motion.div>
          </motion.div>
        </motion.div>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white">Episodios destacados</h2>
          <Link 
            to="/episodios" 
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center text-sm font-medium"
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
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl overflow-hidden border border-gray-700/40 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
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