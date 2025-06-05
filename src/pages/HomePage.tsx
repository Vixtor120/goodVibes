import { Link } from 'react-router-dom';
import { Play, ChevronRight, Headphones, Mic, Film, Gamepad2, Sparkles, Clock, Calendar, Tag } from 'lucide-react';
import Episode from '../components/Episode';
import episodesData from '../json/episodios.json';
import { Episode as EpisodeType } from '../interfaces/Episode';
import { getTagStyle } from '../utils/tagStyles';
import '../styles/animations.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {  const [featuredEpisodes, setFeaturedEpisodes] = useState<EpisodeType[]>([]);
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
        >          <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-[100%] md:max-w-[100%] mx-auto">            <motion.img 
              src="https://plus.unsplash.com/premium_photo-1677155842676-8e13e7053844?auto=format&fit=crop&w=800&q=80" 
              className="w-full relative z-10 transform transition-transform duration-700 hover:scale-105"
              alt="Micrófono de podcast y auriculares, Unsplash"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 to-yellow-400/40 z-20 mix-blend-overlay"></div>
          </div>
          {/* Image attribution - More subtle */}          <div className="mt-2 text-right">
            <a 
              href="https://unsplash.com/es/fotos/un-microfono-anticuado-en-un-soporte-sobre-un-fondo-amarillo-PrBuMyKauvM" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-summer-dark font-medium hover:text-summer-secondary transition-colors"
            >
              Imagen: Pramod Tiwari vía Unsplash
            </a>
          </div>
          {/* Decorative elements - More subtle */}          <motion.div 
            className="absolute -top-6 -right-6 w-40 h-40 bg-yellow-300/10 rounded-full z-0"
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
          ></motion.div>          <motion.div 
            className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-400/10 rounded-full z-0"
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
                </span>                <span className="text-summer-dark text-sm flex items-center font-medium">
                  <Clock size={14} className="mr-1.5 text-summer-accent"/> 
                  {latestEpisode.duration}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-summer-dark mb-4">{latestEpisode.title}</h3>
              
              {latestEpisode.label && latestEpisode.label.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {latestEpisode.label.map((tag: string, index: number) => (                    <motion.span 
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
                </div>
              )}
                <p className="text-summer-dark mb-6 leading-relaxed font-medium">{latestEpisode.description}</p>
              
              <div className="flex items-center gap-4">
                <Link 
                  to={`/episodios/${latestEpisode.id}?autoplay=true`}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-summer-dark px-6 py-3 rounded-full flex items-center font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-1"
                >
                  <Play size={18} className="mr-2" />
                  Ver episodio completo
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
      </motion.div>      {/* Proceso Creativo Section - Ultra modern summer vibes */}      <motion.div 
        className="mb-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-orange-100 -z-10"></div>
          {/* Content Container */}
        <div className="bg-white shadow-md p-8 md:p-12 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          ><motion.span
                className="block text-sm font-bold tracking-widest uppercase text-orange-500 mb-2"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                NUESTRO MÉTODO
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-black mb-6 relative inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="relative inline-block">
                El Proceso Creativo 
                <svg className="absolute -bottom-2 w-full" height="6" viewBox="0 0 200 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,3 C50,0 150,6 200,3" stroke="#f97316" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-black/80 max-w-2xl mx-auto text-lg font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >              Desde la chispa de la inspiración hasta el toque final, cada episodio cobra vida con creatividad y pasión.
              Un viaje lleno de ideas y buenas vibras que queremos compartir contigo.
            </motion.p>
          </motion.div>
          
          {/* Cards Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Card 1 */}            <motion.div 
              className="bg-orange-50 p-6 lg:p-8 border-l-4 border-orange-400 shadow-md relative overflow-hidden group"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 to-orange-500"></div>
                <div className="relative">                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-orange-500 to-orange-600 p-3.5 shadow-lg inline-flex justify-center items-center"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 } 
                    }}
                  >
                    <Sparkles size={30} className="text-white" />
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >                  <h3 className="text-xl font-bold text-black mb-3">Inspiración</h3>
                  <p className="text-black/80">Capturamos nuevas ideas en cada tema, buscando siempre contenido fresco y relevante que te haga conectar con nuestras conversaciones y reflexiones.</p>
                  
                  <div className="mt-4 inline-flex items-center text-orange-500 font-semibold text-sm">
                    <span>01</span>
                    <div className="h-px w-8 bg-orange-500 mx-2"></div>
                    <span>IDEA</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Card 2 */}            <motion.div 
              className="bg-yellow-50 p-6 lg:p-8 border-l-4 border-yellow-400 shadow-md relative overflow-hidden group"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
                <div className="relative">                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3.5 shadow-lg inline-flex justify-center items-center"
                    whileHover={{ 
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.5 } 
                    }}
                  >
                    <Mic size={30} className="text-white" />
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >                  <h3 className="text-xl font-bold text-black mb-3">Grabación</h3>
                  <p className="text-black/80">Creamos un ambiente distendido y lleno de energía positiva, donde las ideas fluyen libremente. El resultado es auténtico, fresco y lleno de vida.</p>
                  
                  <div className="mt-4 inline-flex items-center text-yellow-500 font-semibold text-sm">
                    <span>02</span>
                    <div className="h-px w-8 bg-yellow-500 mx-2"></div>
                    <span>CREACIÓN</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Card 3 */}            <motion.div 
              className="bg-blue-50 p-6 lg:p-8 border-l-4 border-blue-400 shadow-md relative overflow-hidden group"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 to-blue-500"></div>
                <div className="relative">                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-500 to-blue-600 p-3.5 shadow-lg inline-flex justify-center items-center"
                    whileHover={{ 
                      rotate: 360,
                      transition: { duration: 0.5, ease: "easeInOut" } 
                    }}
                  >
                    <Headphones size={30} className="text-white" />
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >                  <h3 className="text-xl font-bold text-black mb-3">Edición</h3>
                  <p className="text-black/80">Pulimos cada detalle con precisión artesanal, asegurando que cada minuto de audio tenga la mejor calidad y sea una experiencia agradable para nuestros oyentes.</p>
                  
                  <div className="mt-4 inline-flex items-center text-blue-500 font-semibold text-sm">
                    <span>03</span>
                    <div className="h-px w-8 bg-blue-500 mx-2"></div>
                    <span>REFINAMIENTO</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>      {/* Temas que exploramos - Ultra modern design */}      
      <motion.div 
        className="mb-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-purple-100 -z-10"></div>
          {/* Content Container */}
        <div className="bg-white shadow-md p-8 md:p-12 relative z-10">
          <div className="text-center mb-8">
            <motion.span
                className="block text-sm font-bold tracking-widest uppercase text-purple-600 mb-2"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                EXPLORA CON NOSOTROS
            </motion.span>
            
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-black mb-6 relative inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >              <span className="relative">
                Temas que exploramos
                <svg className="absolute -bottom-2 w-full" height="6" viewBox="0 0 240 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,3 C60,0 180,6 240,3" stroke="#8b5cf6" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </motion.h3>
              <motion.p 
              className="text-black/80 max-w-2xl mx-auto mb-10 text-lg font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Nuestras conversaciones abarcan un amplio espectro de temas, siempre con una perspectiva fresca y opiniones sinceras para acompañarte en cualquier momento.
            </motion.p>
          </div>
            <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >{/* Películas */}            <motion.div
              className="flex flex-col items-center p-5 bg-red-50 border-l-4 border-red-400 shadow-md overflow-hidden group relative"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-300 to-red-500"></div>              <div className="flex justify-center mb-4">
                <motion.div 
                  className="bg-gradient-to-br from-red-500 to-red-600 p-3.5 shadow-lg inline-flex justify-center items-center"
                  whileHover={{ 
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.5 } 
                  }}
                >
                  <Film size={24} className="text-white" />
                </motion.div>
              </div>
              <h4 className="font-bold text-black text-center">Películas</h4>
              <p className="text-xs text-black/70 text-center mt-2">Análisis, críticas y recomendaciones</p>
            </motion.div>
              {/* Videojuegos */}            <motion.div
              className="flex flex-col items-center p-5 bg-green-50 border-l-4 border-green-400 shadow-md overflow-hidden group relative"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-500"></div>              <div className="flex justify-center mb-4">
                <motion.div 
                  className="bg-gradient-to-br from-green-500 to-green-600 p-3.5 shadow-lg inline-flex justify-center items-center"
                  whileHover={{ 
                    rotate: [-5, 5, -5, 0],
                    transition: { duration: 0.5 } 
                  }}
                >
                  <Gamepad2 size={24} className="text-white" />
                </motion.div>
              </div>
              <h4 className="font-bold text-black text-center">Videojuegos</h4>
              <p className="text-xs text-black/70 text-center mt-2">Experiencias y novedades gaming</p>
            </motion.div>
              {/* Tecnología */}            <motion.div
              className="flex flex-col items-center p-5 bg-blue-50 border-l-4 border-blue-400 shadow-md overflow-hidden group relative"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 to-blue-500"></div>              <div className="flex justify-center mb-4">
                <motion.div 
                  className="bg-gradient-to-br from-blue-500 to-blue-600 p-3.5 shadow-lg inline-flex justify-center items-center"
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.7, ease: "easeInOut" } 
                  }}
                >
                  <Headphones size={24} className="text-white" />
                </motion.div>
              </div>
              <h4 className="font-bold text-black text-center">Tecnología</h4>
              <p className="text-xs text-black/70 text-center mt-2">Gadgets e innovaciones tech</p>
            </motion.div>
              {/* Y más */}            <motion.div
              className="flex flex-col items-center p-5 bg-purple-50 border-l-4 border-purple-400 shadow-md overflow-hidden group relative"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-300 to-purple-500"></div>              <div className="flex justify-center mb-4">
                <motion.div 
                  className="bg-gradient-to-br from-purple-500 to-purple-600 p-3.5 shadow-lg inline-flex justify-center items-center"
                  whileHover={{ 
                    scale: [1, 1.1, 1],
                    filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                    transition: { duration: 0.5 } 
                  }}
                >
                  <Sparkles size={24} className="text-white" />
                </motion.div>
              </div>
              <h4 className="font-bold text-black text-center">Y mucho más</h4>
              <p className="text-xs text-black/70 text-center mt-2">Tendencias y tópicos del momento</p>
            </motion.div>
          </motion.div>
        </div>
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
                videoUrl={episode.videoUrl}
                isYoutubeContent={episode.isYoutubeContent}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;