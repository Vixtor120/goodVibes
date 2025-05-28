import { Youtube, Mail, Headphones, Copyright } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-summer relative">
      {/* Gradiente superior con efecto de brillo */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-summer-secondary/0 via-summer-secondary to-summer-secondary/0 blur-[0.5px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Primera columna */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="bg-yellow-400/20 p-2.5 rounded-full group-hover:bg-yellow-400/30 transition-all duration-300 backdrop-blur-sm shadow-inner">
                <Headphones size={22} className="text-summer-secondary group-hover:text-yellow-400 transition-colors" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-summer-secondary to-yellow-400">GoodVibes</span>
            </div>
              <p className="text-white text-sm max-w-md leading-relaxed font-medium">
              Un podcast donde compartimos buenas vibras, conversaciones interesantes
              y momentos que te inspirarán a vivir cada día con más energía positiva.
            </p>
          </div>

          {/* Segunda columna */}
          <div>
            <h3 className="text-white font-medium mb-6 text-lg relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-summer-secondary to-summer-secondary/0"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-white hover:text-summer-secondary transition-all duration-300 text-sm flex items-center group font-medium">
                  <span className="w-1.5 h-1.5 bg-summer-secondary rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/episodios" className="text-white hover:text-summer-secondary transition-all duration-300 text-sm flex items-center group font-medium">
                  <span className="w-1.5 h-1.5 bg-summer-secondary rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></span>
                  Episodios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-white hover:text-summer-secondary transition-all duration-300 text-sm flex items-center group font-medium">
                  <span className="w-1.5 h-1.5 bg-summer-secondary rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></span>
                  Contacto
                </Link>
              </li>
              <li>
                <Link 
                  to="/licencias" 
                  className="flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm group"
                >
                  <Copyright size={14} className="mr-2.5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  <span>Licencias Creative Commons</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tercera columna */}
          <div>
            <h3 className="text-white font-medium mb-6 text-lg relative inline-block">
              Síguenos
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-summer-secondary to-summer-secondary/0"></span>
            </h3>
            <div className="mb-8">
              <a 
                href="https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-br from-red-600/90 to-red-700/90 hover:from-red-500 hover:to-red-600 px-5 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-700/20 hover:-translate-y-0.5 group"
                aria-label="Canal de YouTube"
              >
                <Youtube size={18} className="text-white mr-3 group-hover:animate-pulse" />
                <span className="text-white text-sm font-medium">Canal de YouTube</span>
              </a>
            </div>
            
            <div className="mt-8">
              <div className="p-5 bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-purple-900/50 transition-all duration-300 group hover:shadow-md hover:shadow-purple-900/10">
                <h4 className="text-white text-sm font-medium mb-3 flex items-center">
                  <div className="p-2 bg-purple-900/20 rounded-full mr-3 group-hover:bg-purple-900/30 transition-colors">
                    <Mail size={14} className="text-purple-400" />
                  </div>
                  Contáctanos
                </h4>
                <p className="text-gray-400 text-sm ml-10">goodvibespodcasts@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/20 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between flex-col md:flex-row items-center">
            <p className="text-gray-500 text-sm mb-3 md:mb-0">
              &copy; {currentYear} GoodVibes Podcast. Todos los derechos reservados.
            </p>
            <p className="text-gray-600 text-xs">
              Contenido bajo licencia <a href="/licencias" className="text-purple-500 hover:text-purple-400 transition-colors">CC BY-NC-ND 4.0</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
