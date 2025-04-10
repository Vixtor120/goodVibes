import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Headphones, Mail, Radio, Youtube, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrollActivo, setScrollActivo] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function detectarScroll() {
      setScrollActivo(window.scrollY > 20);
    }

    window.addEventListener('scroll', detectarScroll);
    return () => {
      window.removeEventListener('scroll', detectarScroll);
    };
  }, []);

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  function toggleMenu() {
    setMenuAbierto(!menuAbierto);
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
            {/* Logo */}
            <motion.a 
              href="/" 
              className="flex items-center gap-0 group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center bg-gradient-to-r from-purple-700 to-purple-600 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md shadow-lg shadow-purple-900/10 group-hover:shadow-purple-600/20 transition-all duration-300 z-10">
                <Radio size={14} className="text-white mr-1 sm:mr-1.5 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Podcast</span>
              </div>
              <motion.div 
                className="h-auto w-28 xs:w-32 sm:w-36 md:w-40 lg:w-44 transition-all duration-300 -ml-2 sm:-ml-3"
                whileHover={{ x: 3 }}
              >
                <img 
                  src="/images/logo.png" 
                  alt="GoodVibes Logo" 
                  className="h-auto w-full"
                />
              </motion.div>
            </motion.a>

            {/* Desktop Navigation */}
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

            {/* Right-side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* YouTube Button - Large screens */}
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
              
              {/* YouTube icon only for Medium screens */}
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
              
              {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuAbierto && (
            <motion.div 
              className="md:hidden bg-gradient-to-b from-gray-900/95 to-gray-900/95 backdrop-blur-md pb-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 py-2 space-y-3">
                {/* Navigation Links */}
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
                
                {/* Divider */}
                <div className="my-3 border-t border-gray-700/30"></div>
                
                {/* Mobile YouTube Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-1"
                >
                  <a 
                    href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white transition-all duration-300 shadow-md"
                    onClick={() => setMenuAbierto(false)}
                  >
                    <Youtube size={18} className="mr-2" />
                    <span className="font-medium">Visitar canal de YouTube</span>
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
      
      <div className="h-16 sm:h-18 md:h-20"></div>
    </>
  );
}

export default Navbar;
