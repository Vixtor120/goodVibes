import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Headphones, Mail, Radio, Youtube, Settings, Linkedin, Instagram } from 'lucide-react';
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

  return (
    <>
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 navbar-summer ${
        scrollActivo 
          ? "bg-summer-dark shadow-md shadow-summer-shadow-sm" 
          : menuAbierto 
            ? "bg-summer-dark" 
            : "bg-summer-dark"
      }`}>
        <div className="relative">
          <motion.div 
            className="h-[1px] bg-gradient-to-r from-yellow-400/10 via-yellow-400/60 to-yellow-400/10"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
              {/* Logo */}
              <motion.a 
                href="/" 
                className="flex items-center gap-0 group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md shadow-lg shadow-yellow-400/20 group-hover:shadow-yellow-400/30 transition-all duration-300 z-10">
                  <Radio size={14} className="text-summer-dark mr-1 sm:mr-1.5 animate-pulse" />
                  <span className="text-summer-dark text-xs font-bold uppercase tracking-wider">Podcast</span>
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
              </motion.a>              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1 lg:space-x-3">
                { [
                  { path: '/', icon: <Home size={16} className="mr-1.5" />, label: 'Home' },
                  { path: '/episodios', icon: <Headphones size={16} className="mr-1.5" />, label: 'Episodios' },
                  { path: '/contacto', icon: <Mail size={16} className="mr-1.5" />, label: 'Contacto' }
                ].map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -2 }}                  >
                  <Link 
                    to={item.path} 
                    className={`group flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-300 relative ${
                      location.pathname === item.path 
                        ? 'text-yellow-400 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10' 
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800/30'
                    }`}
                  >                    <div className="flex items-center">
                      {item.icon} 
                      <span className="text-sm whitespace-nowrap">{item.label}</span>
                    </div>
                    <div className={`h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mt-1 transition-all duration-300 rounded-full ${
                      location.pathname === item.path ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`}></div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right-side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* YouTube Button - Large screens */}              <div className="hidden lg:flex items-center space-x-2">
                <motion.div 
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <a 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 p-2 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-pink-500/20 group"
                  >
                    <Instagram size={20} className="text-white group-hover:animate-pulse" />
                  </a>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <a 
                    href="https://www.linkedin.com/in/vichidsan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 p-2 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/20 group"
                  >
                    <Linkedin size={20} className="text-white group-hover:animate-pulse" />
                  </a>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <a 
                    href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 p-2 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-700/20 group"
                  >
                    <Youtube size={20} className="text-white group-hover:animate-pulse" />
                  </a>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <motion.button 
                  className="text-white p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors relative focus:outline-none"
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  aria-expanded={menuAbierto}
                  aria-label="Menu principal"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence>
                    {!menuAbierto ? (
                      <motion.div
                        key="menu-cerrado"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu-abierto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuAbierto && (
            <motion.div 
              className="md:hidden bg-summer-dark pb-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 py-2 space-y-3">
                {/* Navigation Links */}                {[
                  { path: '/', icon: <Home size={18} className="mr-2.5" />, label: 'Home' },
                  { path: '/episodios', icon: <Headphones size={18} className="mr-2.5" />, label: 'Episodios' },
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
                          ? 'bg-yellow-400/20 text-yellow-400' 
                          : 'text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400'
                      }`}
                      onClick={() => setMenuAbierto(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* YouTube Button - Mobile */}                <div className="flex items-center space-x-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <a 
                      href="https://www.instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-pink-500/90 to-purple-500/90 text-white hover:from-pink-600/90 hover:to-purple-600/90 transition-all duration-300"
                    >
                      <Instagram size={20} className="animate-pulse" />
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <a 
                      href="https://www.linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white hover:from-blue-500/90 hover:to-blue-600/90 transition-all duration-300"
                    >
                      <Linkedin size={20} className="animate-pulse" />
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <a 
                      href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-red-600/90 to-red-700/90 text-white hover:from-red-500/90 hover:to-red-600/90 transition-all duration-300"
                    >
                      <Youtube size={20} className="animate-pulse" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}        </AnimatePresence>
        </div>
      </header>
      
      <div className="h-16 sm:h-18 md:h-20"></div>
    </>
  );
}

export default Navbar;
