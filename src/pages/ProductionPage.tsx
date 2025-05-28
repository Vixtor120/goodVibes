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
      >        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-summer-accent to-summer-turquoise">Detrás de Escenas</h1>
        <p className="text-white max-w-2xl mx-auto text-lg">
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-summer-accent to-summer-turquoise">Nuestro Proceso Creativo</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Paso 1: Elección del Tema */}          <motion.div 
            className="bg-white/80 p-6 rounded-xl border border-summer-accent/30 hover:border-summer-accent transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(255, 140, 102, 0.2)" }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-summer-accent/20 p-3 rounded-full mr-4">
                <Sparkles className="text-summer-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold text-summer-dark">Elección del Tema</h3>
            </div>
            <p className="text-summer-dark/80">
              Seleccionamos temas que nos apasionan o que creemos que serán interesantes para nuestra audiencia. 
              ¡Nada de guiones rígidos, solo ideas y puntos clave para mantener la charla fluida!
            </p>
          </motion.div>

          {/* Paso 2: Grabación */}          <motion.div 
            className="bg-white/80 p-6 rounded-xl border border-summer-turquoise/30 hover:border-summer-turquoise transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 180, 216, 0.2)" }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-summer-turquoise/20 p-3 rounded-full mr-4">
                <Mic className="text-summer-turquoise" size={24} />
              </div>
              <h3 className="text-xl font-bold text-summer-dark">Grabación</h3>
            </div>
            <p className="text-summer-dark/80">
              Nos sentamos frente al micrófono en un ambiente cómodo y grabamos la conversación de manera natural. 
              Lo importante es el contenido y la autenticidad.
            </p>
          </motion.div>

          {/* Paso 3: Edición y Publicación */}
          <motion.div            className="bg-white/80 p-6 rounded-xl border border-summer-mint/30 hover:border-summer-mint transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(6, 214, 160, 0.2)" }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-summer-mint/20 p-3 rounded-full mr-4">
                <Headphones className="text-summer-mint" size={24} />
              </div>
              <h3 className="text-xl font-bold text-summer-dark">Edición y Publicación</h3>
            </div>
            <p className="text-summer-dark/80">
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
          <motion.div            className="bg-white/80 p-6 rounded-xl border border-summer-accent/30 hover:border-summer-accent transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(255, 140, 102, 0.2)" }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-summer-accent/20 p-3 rounded-full mr-4">
                <Volume2 className="text-summer-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold text-summer-dark">Audacity</h3>
            </div>            <p className="text-summer-dark/80">
              Software gratuito de código abierto para grabación y edición de audio.
              Lo usamos para grabar, limpiar el ruido, ecualizar y mezclar el audio de nuestros episodios, 
              asegurando una experiencia auditiva de calidad para nuestros oyentes.
            </p>
          </motion.div>

          {/* Canva */}          <motion.div 
            className="bg-white/80 p-6 rounded-xl border border-summer-turquoise/30 hover:border-summer-turquoise transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >            <div className="flex items-center mb-4">
              <div className="bg-summer-turquoise/20 p-3 rounded-full mr-4">
                <Palette className="text-summer-turquoise" size={24} />
              </div>
              <h3 className="text-xl font-bold text-summer-dark">Canva</h3>
            </div>
            <p className="text-summer-dark/80">
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