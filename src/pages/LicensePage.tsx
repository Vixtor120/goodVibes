import { motion } from 'framer-motion';
import { Copyright, ExternalLink } from 'lucide-react';

const LicensePage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-4">          <Copyright size={40} className="text-summer-accent" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-summer-accent to-summer-turquoise">Licencias Creative Commons</h1>
        <p className="text-white max-w-2xl mx-auto">
          Información sobre las licencias aplicadas a nuestro contenido
        </p>
      </motion.div>      {/* Explicación simplificada */}
      <motion.div 
        className="mb-10 bg-white rounded-xl p-6 border border-summer-accent/30 text-summer-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">¿Qué son las licencias Creative Commons?</h2>
        <p className="text-gray-300 mb-4">
          Las licencias Creative Commons son herramientas legales que permiten a los creadores compartir su trabajo
          mientras definen cómo otros pueden usar, compartir y modificar ese trabajo.
        </p>
        <p className="text-gray-300">
          En GoodVibes Podcast utilizamos estas licencias para promover la cultura de compartir de manera responsable.
        </p>
      </motion.div>

      {/* Nuestras licencias - Simplificado */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Nuestras Licencias</h2>
        
        <div className="grid gap-6">
          {/* Todas las licencias en un solo panel */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-4">Contenido del Podcast</h3>
            
            <div className="flex items-center mb-4">
              <img 
                src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png" 
                alt="CC BY-NC-ND 4.0" 
                className="h-8 mr-3"
              />
              <div>
                <p className="text-white font-medium">Licencia CC BY-NC-ND 4.0</p>
                <p className="text-sm text-gray-300">Atribución-NoComercial-SinDerivadas</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-3">
              Esta licencia permite a otros descargar y compartir nuestro contenido siempre que:
            </p>
            
            <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-1">
              <li>Se dé crédito apropiado a GoodVibes Podcast</li>
              <li>No se utilice el material con fines comerciales</li>
              <li>No se creen obras derivadas (no se puede modificar nuestro contenido)</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Atribuciones simplificadas */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Atribuciones a terceros</h2>
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-xl font-semibold text-white mb-4">Fotografías e imágenes</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <strong>Imagen principal de la página de inicio:</strong> "Fotografía bokeh del micrófono de condensador" por Israel Palacio 
              vía Unsplash. <a href="https://unsplash.com/es/fotos/fotografia-bokeh-del-microfono-de-condensador-Y20JJ_ddy9M" 
              className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">Ver original</a>
            </li>
            <li>
              <strong>Imágenes de episodios:</strong> Diversas imágenes obtenidas de Unsplash y Pexels 
              bajo sus respectivas licencias gratuitas
            </li>
            <li>
              <strong>Iconos:</strong> Proporcionados por Lucide React bajo licencia MIT
            </li>
          </ul>
          
          {/* Información específica sobre licencia Unsplash */}
          <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">Acerca de la Licencia Unsplash</h4>
            <p className="text-sm text-gray-300 mb-3">
              Las imágenes de Unsplash se pueden utilizar libremente, según su licencia:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1 mb-3">
              <li>Todas las imágenes se pueden descargar y usar gratuitamente</li>
              <li>Permitido para fines comerciales y no comerciales</li>
              <li>No se requiere permiso (aunque se agradece la atribución)</li>
            </ul>
            <p className="text-sm text-gray-400">
              <strong>Restricciones:</strong> Las imágenes no se pueden vender sin modificaciones significativas, 
              ni se pueden recopilar imágenes de Unsplash para replicar un servicio similar o competitivo.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Enlaces externos */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-6 rounded-xl border border-purple-800/30">
          <p className="text-gray-300 mb-4">
            Para más información sobre las licencias Creative Commons:
          </p>
          
          <a 
            href="https://creativecommons.org/licenses/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            <ExternalLink size={16} className="mr-2" />
            Visitar Creative Commons
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LicensePage;
