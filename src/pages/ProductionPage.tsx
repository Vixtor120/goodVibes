import { motion } from 'framer-motion';
import { Mic, Headphones, Sparkles, Volume2, Palette } from 'lucide-react';

const ProductionPage = () => {
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

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Detrás de Escenas</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Descubre cómo creamos cada episodio de Good Vibes Podcast, desde la idea inicial hasta la publicación final.
        </p>
      </motion.div>

      {/* Proceso Creativo */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestro Proceso Creativo</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Paso 1: Elección del Tema */}
          <motion.div 
            className="bg-gray-800/70 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-700/30 p-3 rounded-full mr-4">
                <Sparkles className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Elección del Tema</h3>
            </div>
            <p className="text-gray-300">
              Seleccionamos temas que nos apasionan o que creemos que serán interesantes para nuestra audiencia. 
              ¡Nada de guiones rígidos, solo ideas y puntos clave para mantener la charla fluida!
            </p>
          </motion.div>

          {/* Paso 2: Grabación */}
          <motion.div 
            className="bg-gray-800/70 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-700/30 p-3 rounded-full mr-4">
                <Mic className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Grabación</h3>
            </div>
            <p className="text-gray-300">
              Nos sentamos frente al micrófono en un ambiente cómodo y grabamos la conversación de manera natural. 
              Lo importante es el contenido y la autenticidad.
            </p>
          </motion.div>

          {/* Paso 3: Edición y Publicación */}
          <motion.div 
            className="bg-gray-800/70 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-700/30 p-3 rounded-full mr-4">
                <Headphones className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Edición y Publicación</h3>
            </div>
            <p className="text-gray-300">
              Después de una edición sencilla con Audacity para mejorar la calidad del audio, 
              subimos el episodio y lo compartimos con nuestra comunidad. ¡Lo auténtico es lo que importa!
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Herramientas que Utilizamos */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Herramientas que Utilizamos</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Audacity */}
          <motion.div 
            className="bg-gray-800/70 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-700/30 p-3 rounded-full mr-4">
                <Volume2 className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Audacity</h3>
            </div>
            <p className="text-gray-300">
              Software gratuito de código abierto para grabación y edición de audio. 
              Lo usamos para grabar, limpiar el ruido, ecualizar y mezclar el audio de nuestros episodios, 
              asegurando una experiencia auditiva de calidad para nuestros oyentes.
            </p>
          </motion.div>

          {/* Canva */}
          <motion.div 
            className="bg-gray-800/70 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-700/30 p-3 rounded-full mr-4">
                <Palette className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Canva</h3>
            </div>
            <p className="text-gray-300">
              Plataforma de diseño gráfico intuitiva que utilizamos para crear todo nuestro contenido visual,
              como logos, portadas de episodios, publicaciones para redes sociales y material promocional.
              Nos permite mantener una identidad visual coherente y atractiva.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductionPage;