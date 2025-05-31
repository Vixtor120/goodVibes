import { Youtube, Mail, Copyright, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
    return (
    <footer className="footer-summer relative bg-summer-dark">
      {/* Gradiente superior con efecto de brillo */}
      <motion.div 
        className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-yellow-400/10 via-yellow-400/60 to-yellow-400/10"
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%'],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "mirror" 
        }}
        style={{ backgroundSize: '200% 100%' }}
      ></motion.div>
  

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Primera columna */}
          <div className="col-span-1">            <motion.div 
              className="mb-6 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <motion.span 
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%'],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
                style={{ backgroundSize: '200% 100%' }}
              >
                GoodVibes
              </motion.span>
            </motion.div>
            
            <p className="text-white text-sm max-w-md leading-relaxed font-medium relative pl-4 border-l-2 border-yellow-400/50">
              Un podcast donde compartimos buenas vibras, conversaciones interesantes
              y momentos que te inspirarán a vivir cada día con más energía positiva.
            </p>
  
          </div>          {/* Segunda columna */}
          <div className="relative">
            <motion.h3 
              className="text-white font-semibold mb-6 text-lg relative inline-block"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              Enlaces Rápidos
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400/0"
                whileHover={{ scaleX: 1.1, originX: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.h3>
  
            
            <ul className="space-y-4 relative">
              <li>
                <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link to="/" className="text-white hover:text-yellow-400 transition-all duration-300 text-sm flex items-center group font-medium">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></span>
                    Inicio
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link to="/episodios" className="text-white hover:text-yellow-400 transition-all duration-300 text-sm flex items-center group font-medium">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></span>
                    Episodios
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link to="/contacto" className="text-white hover:text-yellow-400 transition-all duration-300 text-sm flex items-center group font-medium">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></span>
                    Contacto
                  </Link>
                </motion.div>
              </li>              <li>
                <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/licencias" 
                    className="flex items-center text-white hover:text-yellow-400 transition-all duration-300 text-sm group font-medium"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></span>
                    <Copyright size={14} className="mr-2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                    <span>Licencias Creative Commons</span>
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>

          {/* Tercera columna */}
          <div className="relative">
            <motion.h3 
              className="text-white font-semibold mb-6 text-lg relative inline-block"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              Síguenos
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400/0"
                whileHover={{ scaleX: 1.1, originX: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.h3>
  
            
            <div className="flex flex-wrap gap-3 mb-6">
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                <a 
                  href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 p-2.5 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-700/20 group"
                >
                  <Youtube size={20} className="text-white group-hover:animate-pulse" />
                </a>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 p-2.5 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-pink-500/20 group"
                >
                  <Instagram size={20} className="text-white group-hover:animate-pulse" />
                </a>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                <a 
                  href="https://www.linkedin.com/in/vichidsan/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 p-2.5 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/20 group"
                >
                  <Linkedin size={20} className="text-white group-hover:animate-pulse" />
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-8 relative z-10"
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-5 bg-summer-dark/90 rounded-[1rem] border border-yellow-400/20 hover:border-yellow-400/30 transition-all duration-300 group hover:shadow-lg hover:shadow-yellow-400/10">
                <h4 className="text-white text-sm font-medium mb-3 flex items-center">
                  <div className="p-2 bg-yellow-400/20 rounded-full mr-3 group-hover:bg-yellow-400/30 transition-colors">
                    <Mail size={14} className="text-yellow-400" />
                  </div>
                  Contáctanos
                </h4>
                <p className="text-gray-300 text-sm ml-10">goodvibespodcasts@gmail.com</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>      {/* Simple divider */}
      <div className="relative h-2">
        <div className="absolute w-full h-[1px] bg-yellow-400/20"></div>
      </div>
      
      <div className="border-t border-yellow-400/10 relative">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between flex-col md:flex-row items-center">            <motion.div
              className="flex items-center mb-3 md:mb-0"
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} GoodVibes. Todos los derechos reservados.
              </p>
            </motion.div>
            
            <motion.p 
              className="text-gray-500 text-xs"
              whileHover={{ scale: 1.05 }}
            >
              Contenido bajo licencia <a href="/licencias" className="text-yellow-500 hover:text-yellow-400 transition-colors">CC BY-NC-ND 4.0</a>
            </motion.p>
          </div>
        </div>
  
      </div>
    </footer>
  );
};

export default Footer;
