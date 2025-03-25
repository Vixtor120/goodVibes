import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Home, Headphones, Mail, Radio, Youtube, Settings, Check, Info, CheckCheck, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrollActivo, setScrollActivo] = useState(false);
  const [notificaciones, setNotificaciones] = useState([
    { 
      id: 1,
      message: '¡Disfruta YA de nuestros primeros EPISODIOS!', 
      type: 'info',
      date: new Date(Date.now() - 60000).toISOString(), // Hace 1 minuto
      read: false,
      link: '/episodios'
    }
  ]);
  
  const [filteredNotifications, setFilteredNotifications] = useState(notificaciones);
  const [activeFilter, setActiveFilter] = useState('all');
  const notificacionesRef = useRef<HTMLDivElement>(null);
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [hayNotificaciones, setHayNotificaciones] = useState(true);
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

  // Calcular tiempo relativo para las notificaciones
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'Ayer' : `Hace ${diffDays} días`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? 'Hace 1 hora' : `Hace ${diffHours} horas`;
    } else if (diffMins > 0) {
      return diffMins === 1 ? 'Hace 1 minuto' : `Hace ${diffMins} minutos`;
    } else {
      return 'Ahora mismo';
    }
  };

  // Filtrar notificaciones
  const filterNotifications = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredNotifications(notificaciones);
    } else if (filter === 'unread') {
      setFilteredNotifications(notificaciones.filter(notif => !notif.read));
    }
  };

  // Marcar notificación como leída
  const markAsRead = (id: number) => {
    const updatedNotifications = notificaciones.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotificaciones(updatedNotifications);
    setFilteredNotifications(
      activeFilter === 'all' 
        ? updatedNotifications 
        : updatedNotifications.filter(notif => !notif.read)
    );
  };

  // Marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    const updatedNotifications = notificaciones.map(notif => ({ ...notif, read: true }));
    setNotificaciones(updatedNotifications);
    setFilteredNotifications(
      activeFilter === 'all' 
        ? updatedNotifications 
        : []
    );
    setHayNotificaciones(false);
  };

  // Obtener ícono según el tipo de notificación
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'info':
        return <Info size={16} className="text-blue-400" />;
      case 'success':
        return <Check size={16} className="text-green-400" />;
      case 'new':
        return <Volume2 size={16} className="text-purple-400" />;
      default:
        return <Bell size={16} className="text-blue-400" />;
    }
  };

  // Obtener color de fondo según el tipo de notificación
  const getNotificationBg = (type: string) => {
    switch(type) {
      case 'info':
        return 'bg-blue-500/20';
      case 'success':
        return 'bg-green-500/20';
      case 'new':
        return 'bg-purple-500/20';
      default:
        return 'bg-blue-500/20';
    }
  };

  // Cerrar notificaciones cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificacionesRef.current && !notificacionesRef.current.contains(event.target as Node)) {
        setNotificacionesAbiertas(false);
      }
    }
    
    if (notificacionesAbiertas) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificacionesAbiertas]);

  // Actualizar contador de notificaciones no leídas
  useEffect(() => {
    setHayNotificaciones(notificaciones.some(notif => !notif.read));
    setFilteredNotifications(
      activeFilter === 'all' 
        ? notificaciones 
        : notificaciones.filter(notif => !notif.read)
    );
  }, [notificaciones, activeFilter]);

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
              
              {/* Notifications Button - Improved version */}
              <div className="hidden sm:block relative" ref={notificacionesRef}>
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

                {/* Enhanced Notifications Panel */}
                <AnimatePresence>
                  {notificacionesAbiertas && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-800/60 overflow-hidden z-20"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header with filters */}
                      <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-800/70 border-b border-gray-700/60">
                        <div className="flex justify-between items-center">
                          <h3 className="text-white text-sm font-medium flex items-center">
                            <Bell size={14} className="mr-2 text-purple-400" />
                            Notificaciones
                          </h3>
                          <div className="flex space-x-1 text-xs">
                            <button 
                              className={`px-2 py-1 rounded transition-colors ${activeFilter === 'all' ? 'bg-purple-600/40 text-white' : 'text-gray-400 hover:text-white'}`}
                              onClick={() => filterNotifications('all')}
                            >
                              Todas
                            </button>
                            <button 
                              className={`px-2 py-1 rounded transition-colors ${activeFilter === 'unread' ? 'bg-purple-600/40 text-white' : 'text-gray-400 hover:text-white'}`}
                              onClick={() => filterNotifications('unread')}
                            >
                              No leídas
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Notification list */}
                      <div className="max-h-[60vh] overflow-y-auto">
                        {filteredNotifications.length > 0 ? (
                          <div className="divide-y divide-gray-800/30">
                            {filteredNotifications.map((notificacion) => (
                              <motion.div 
                                key={notificacion.id} 
                                className={`p-3 hover:bg-gray-800/40 transition-colors ${notificacion.read ? 'opacity-70' : ''}`}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Link 
                                  to={notificacion.link || '#'} 
                                  className="flex gap-3"
                                  onClick={() => {
                                    markAsRead(notificacion.id);
                                    setNotificacionesAbiertas(false);
                                  }}
                                >
                                  <div className={`${getNotificationBg(notificacion.type)} p-2 rounded-full flex-shrink-0`}>
                                    {getNotificationIcon(notificacion.type)}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`text-sm ${notificacion.read ? 'text-gray-300' : 'text-white font-medium'}`}>
                                      {notificacion.message}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                      <p className="text-xs text-gray-500">
                                        {getRelativeTime(notificacion.date)}
                                      </p>
                                      {!notificacion.read && (
                                        <button 
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            markAsRead(notificacion.id);
                                          }}
                                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
                                        >
                                          <CheckCheck size={12} className="mr-1" />
                                          Marcar como leída
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-8 text-center">
                            <div className="bg-gray-800/50 mx-auto rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                              <CheckCheck size={24} className="text-green-400" />
                            </div>
                            <p className="text-gray-400 text-sm">No tienes notificaciones {activeFilter === 'unread' ? 'no leídas' : ''}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Footer with actions */}
                      {filteredNotifications.length > 0 && (
                        <div className="p-2 border-t border-gray-800/50 flex justify-center">
                          <button 
                            onClick={markAllAsRead}
                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center py-1.5 px-3 rounded-full hover:bg-purple-500/10 transition-colors"
                          >
                            <CheckCheck size={14} className="mr-1.5" />
                            Marcar todas como leídas
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
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

        {/* Mobile Menu - Adding YouTube button and notifications */}
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
                
                {/* Mobile YouTube Button - Moved inside hamburger menu */}
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
                
                {/* Enhanced Mobile Notifications */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4"
                >
                  <div className="px-2 pt-1 pb-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-semibold flex items-center">
                        <Bell size={14} className="mr-2 text-purple-400" />
                        Notificaciones
                      </h3>
                      
                      {hayNotificaciones && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
                        >
                          <CheckCheck size={12} className="mr-1" />
                          Marcar todas como leídas
                        </button>
                      )}
                    </div>
                    
                    {notificaciones.filter(n => !n.read).length > 0 ? (
                      <div className="space-y-2">
                        {notificaciones.filter(n => !n.read).map((notificacion) => (
                          <motion.div 
                            key={notificacion.id}
                            className="p-3 bg-gray-800/60 rounded-lg"
                          >
                            <Link 
                              to={notificacion.link || '#'} 
                              className="flex gap-3 items-start"
                              onClick={() => {
                                markAsRead(notificacion.id);
                                setMenuAbierto(false);
                              }}
                            >
                              <div className={`${getNotificationBg(notificacion.type)} p-1.5 rounded-full flex-shrink-0`}>
                                {getNotificationIcon(notificacion.type)}
                              </div>
                              <div>
                                <p className="text-sm text-gray-200">{notificacion.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{getRelativeTime(notificacion.date)}</p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center bg-gray-800/40 rounded-lg">
                        <p className="text-gray-400 text-sm">No tienes notificaciones nuevas</p>
                      </div>
                    )}
                  </div>
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
