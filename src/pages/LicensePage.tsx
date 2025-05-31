import { motion } from 'framer-motion';
import { Copyright, ExternalLink } from 'lucide-react';

const LicensePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}      
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-4">
          <motion.div 
            className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-full"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Copyright size={40} className="text-white" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
          Licencias Creative Commons
        </h1>
        <p className="text-summer-dark max-w-2xl mx-auto font-medium">
          Información sobre las licencias aplicadas a nuestro contenido
        </p>
      </motion.div>

      {/* Explicación simplificada */}
      <motion.div 
        className="mb-10 bg-gradient-to-br from-white to-orange-50 rounded-xl p-8 border border-orange-200 shadow-lg hover:shadow-orange-200/50 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -5 }}
      >
        <h2 className="text-2xl font-bold text-summer-dark mb-4">¿Qué son las licencias Creative Commons?</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
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
        <h2 className="text-2xl font-bold text-summer-dark mb-6">Nuestras Licencias</h2>
        
        <div className="grid gap-6">
          <motion.div 
            className="bg-gradient-to-br from-white to-yellow-50 p-8 rounded-xl border border-yellow-200 shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-summer-dark mb-4">Contenido del Podcast</h3>
            
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
          </motion.div>
        </div>
      </motion.div>

      {/* Atribuciones simplificadas */}      
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-summer-dark mb-6">Atribuciones a terceros</h2>
        
        <motion.div 
          className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-xl border border-orange-200 shadow-lg"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-summer-dark mb-4">Fotografías e imágenes</h3>
          <ul className="space-y-3 text-gray-600">
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
          <div className="mt-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50">
            <h4 className="font-medium text-summer-dark mb-2">Acerca de la Licencia Unsplash</h4>
            <p className="text-sm text-gray-600 mb-3">
              Las imágenes de Unsplash se pueden utilizar libremente, según su licencia:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mb-3">
              <li>Todas las imágenes se pueden descargar y usar gratuitamente</li>
              <li>Permitido para fines comerciales y no comerciales</li>
              <li>No se requiere permiso (aunque se agradece la atribución)</li>
            </ul>
            <p className="text-sm text-gray-400">
              <strong>Restricciones:</strong> Las imágenes no se pueden vender sin modificaciones significativas, 
              ni se pueden recopilar imágenes de Unsplash para replicar un servicio similar o competitivo.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Enlaces externos */}      
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-xl border border-orange-200 shadow-lg"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 mb-4 font-medium">
            Para más información sobre las licencias Creative Commons:
          </p>
          
          <motion.a 
            href="https://creativecommons.org/licenses/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <ExternalLink size={16} className="mr-2" />
            Visitar Creative Commons
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LicensePage;
