import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Home, Headphones, Mail, Radio, Youtube, Settings} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrollActivo, setScrollActivo] = useState(false);
  const [notificaciones] = useState([
    { message: '¡Disfruta YA de nuestros primeros EPISODIOS!', type: 'info' },
  ]);
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [hayNotificaciones, setHayNotificaciones] = useState(true);
  const location = useLocation();

  useEffect(() => {
    function detectarScroll() {
      if (window.scrollY > 20) {
        setScrollActivo(true);
      } else {
        setScrollActivo(false);
      }
    }

    window.addEventListener('scroll', detectarScroll);
    
    return () => {
      window.removeEventListener('scroll', detectarScroll);
    };
  }, []);

  // Cerrar menús cuando cambia la ruta
  useEffect(() => {
    setMenuAbierto(false);
    setNotificacionesAbiertas(false);
  }, [location.pathname]);

  function toggleMenu() {
    setMenuAbierto(!menuAbierto);
    if (notificacionesAbiertas) setNotificacionesAbiertas(false);
  }

  function toggleNotificaciones() {
    setNotificacionesAbiertas(!notificacionesAbiertas);
    if (!notificacionesAbiertas) {
      setHayNotificaciones(false);
    }
    if (menuAbierto) setMenuAbierto(false);
  }

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrollActivo 
          ? "bg-black/90 backdrop-blur-md shadow-md shadow-purple-900/10" 
          : menuAbierto 
            ? "bg-black/80 backdrop-blur-sm" 
            : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo con transición y animación mejorada */}
            <motion.a 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center bg-gradient-to-r from-purple-700 to-purple-600 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md shadow-lg shadow-purple-900/10 group-hover:shadow-purple-600/20 transition-all duration-300">
                <Radio size={14} className="text-white mr-1 sm:mr-1.5 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Podcast</span>
              </div>
              <motion.div 
                className="h-auto w-28 xs:w-32 sm:w-36 md:w-40 lg:w-44 transition-all duration-300"
                whileHover={{ x: 3 }}
              >
                <img 
                  src="/images/logo3_edit.png" 
                  alt="GoodVibes Logo" 
                  className="h-auto w-full"
                />
              </motion.div>
            </motion.a>

            {/* Navegación desktop con diseño moderno */}
            <nav className="hidden md:flex space-x-1 lg:space-x-3">
              {[
                { path: '/', icon: <Home size={16} className="mr-1.5" />, label: 'Home' },
                { path: '/episodios', icon: <Headphones size={16} className="mr-1.5" />, label: 'Episodios' },
                { path: '/produccion', icon: <Settings size={16} className="mr-1.5" />, label: 'Producción' },
                { path: '/contacto', icon: <Mail size={16} className="mr-1.5" />, label: 'Contacto' }
              ].map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                >
                  <Link 
                    to={item.path} 
                    className={`group flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-300 relative ${
                      location.pathname === item.path 
                        ? 'text-white bg-gradient-to-br from-purple-900/40 to-purple-800/20' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon} 
                      <span className="text-sm whitespace-nowrap">{item.label}</span>
                    </div>
                    <div className={`h-0.5 bg-gradient-to-r from-purple-500 to-purple-400 mt-1 transition-all duration-300 rounded-full ${
                      location.pathname === item.path ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`}></div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Acciones de la derecha - Adaptable a tamaño de la pantalla */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* YouTube Button - Adaptable */}
              <motion.div 
                className="hidden lg:block"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <a 
                  href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-3 py-1.5 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-700/20 group"
                >
                  <Youtube size={16} className="text-white mr-1.5 group-hover:animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">YouTube</span>
                </a>
              </motion.div>
              
              {/* YouTube icon only para pantallas small-medium */}
              <motion.div
                className="hidden sm:block lg:hidden"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <a 
                  href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl text-white transition-all duration-300 shadow-md"
                >
                  <Youtube size={18} />
                </a>
              </motion.div>
              
              {/* Notifications Button - Desktop y Tablet */}
              <div className="hidden sm:block relative">
                <motion.button 
                  onClick={toggleNotificaciones}
                  className="p-2 rounded-xl bg-gray-800/70 hover:bg-gray-700/90 text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell size={18} className="text-gray-300 hover:text-white" />
                  {hayNotificaciones && (
                    <motion.div 
                      className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-gray-800/70"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  )}
                </motion.button>

                {/* Notificaciones panel mejorado */}
                <AnimatePresence>
                  {notificacionesAbiertas && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-800/60 overflow-hidden z-20"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-800/70 border-b border-gray-700/60">
                        <h3 className="text-white text-sm font-medium flex items-center">
                          <Bell size={14} className="mr-2 text-purple-400" />
                          Notificaciones
                        </h3>
                      </div>
                      <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-800/30">
                        {notificaciones.map((notificacion, index) => (
                          <motion.div 
                            key={index} 
                            className="p-3 hover:bg-blue-500/10 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex gap-3">
                              <div className="bg-blue-500/20 p-2 rounded-full flex-shrink-0">
                                <Bell size={16} className="text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-200">{notificacion.message}</p>
                                <p className="text-xs text-gray-500 mt-1">Ahora</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Botón de menú móvil mejorado */}
              <motion.button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-xl bg-gray-800/70 hover:bg-gray-700/90 text-white transition-all duration-300"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {menuAbierto ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menú móvil moderno y con mejor animación */}
        <AnimatePresence>
          {menuAbierto && (
            <motion.div 
              className="md:hidden bg-gradient-to-b from-gray-900/95 to-gray-900/95 backdrop-blur-md pb-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 py-2 space-y-1">
                {/* Enlaces de navegación móvil */}
                {[
                  { path: '/', icon: <Home size={18} className="mr-2.5" />, label: 'Home' },
                  { path: '/episodios', icon: <Headphones size={18} className="mr-2.5" />, label: 'Episodios' },
                  { path: '/produccion', icon: <Settings size={18} className="mr-2.5" />, label: 'Producción' },
                  { path: '/contacto', icon: <Mail size={18} className="mr-2.5" />, label: 'Contacto' }
                ].map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link 
                      to={item.path} 
                      className={`flex items-center py-3 px-4 rounded-xl transition-all duration-300 ${
                        location.pathname === item.path 
                          ? 'text-white bg-gradient-to-r from-purple-800/70 to-purple-700/70' 
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                      }`}
                      onClick={() => setMenuAbierto(false)}
                    >
                      {item.icon} <span className="text-base">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Separador con gradiente */}
                <div className="my-2 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700/70 to-transparent"></div>
                  </div>
                </div>
                
                {/* Notificaciones móviles */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 mb-3"
                >
                  <div className="flex items-center justify-between px-4 py-2">
                    <h3 className="text-sm font-medium text-white flex items-center">
                      <Bell size={14} className="mr-1.5 text-purple-400" />
                      Notificaciones
                    </h3>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    {notificaciones.map((notificacion, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="flex items-start gap-3 px-4 py-2.5 bg-blue-500/10 rounded-lg mx-2"
                      >
                        <div className="bg-blue-500/20 p-1.5 rounded-full">
                          <Bell size={14} className="text-blue-400" />
                        </div>
                        <p className="text-sm text-gray-300">{notificacion.message}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* YouTube Button para móvil */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="px-4 pt-2"
                >
                  <a 
                    href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg"
                    onClick={() => setMenuAbierto(false)}
                  >
                    <Youtube size={18} className="mr-2" />
                    <span className="font-medium">Visita nuestro canal</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Línea inferior con animación */}
        <div className="w-full">
          <motion.div 
            className="h-[1px] bg-gradient-to-r from-purple-500/10 via-purple-500/60 to-purple-500/10"
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
        </div>
      </header>
      
      {/* Spacer para el header fijo */}
      <div className="h-16 sm:h-18 md:h-20"></div>
    </>
  );
}

export default Navbar;