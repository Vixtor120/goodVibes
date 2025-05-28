import { useState } from 'react';
import { Send, Mic, Headphones, Mail, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    wantParticipate: false
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, ingresa tu nombre';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, ingresa tu correo electrónico';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Por favor, selecciona un asunto';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, escribe tu mensaje';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Tu mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envío (reemplazar con lógica real de envío)
    try {
      // Simulando una demora en la red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Éxito simulado
      setSubmitResult({
        success: true,
        message: '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.'
      });
      
      // Reiniciar formulario después del éxito
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        wantParticipate: false
      });
    } catch (error) {
      // Error simulado
      setSubmitResult({
        success: false,
        message: 'Lo sentimos, hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Ocultar mensaje después de 8 segundos (increased from 5 for better user experience)
      setTimeout(() => {
        setSubmitResult(null);
      }, 8000);
    }
  };

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
    <div className="container mx-auto px-4 py-16 max-w-6xl">      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-summer-accent to-summer-turquoise drop-shadow-md">Contáctanos</h1>
        <p className="text-white max-w-2xl mx-auto text-lg font-semibold drop-shadow-sm">
          Estamos deseando escuchar tus ideas, sugerencias o incluso darte la oportunidad de participar en nuestro podcast.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Información de contacto */}
        <motion.div 
          className="md:col-span-1"
          variants={fadeInUp}
        >
          <div className="bg-summer-dark/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-summer-accent/30 h-full">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center drop-shadow-md">
              <Headphones className="mr-2 text-summer-accent" size={24} />
              Good Vibes Podcast
            </h2>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gray-700/50 p-3 rounded-full">
                  <Mail size={20} className="text-summer-accent" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Correo electrónico</h3>
                  <p className="text-gray-400">goodvibespodcasts@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gray-700/50 p-3 rounded-full">
                  <Mic size={20} className="text-summer-accent" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Participa en el Podcast</h3>
                  <p className="text-gray-400">Completa el formulario y marca la casilla para participar como invitado.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-r from-summer-accent/20 to-summer-turquoise/20 p-6 rounded-lg border-l-4 border-summer-accent mt-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-medium text-white mb-2">¿Tienes algo interesante para compartir?</h3>
                <p className="text-gray-300 text-sm">
                  Si tienes una historia inspiradora, conocimientos especializados o simplemente quieres compartir tu perspectiva, nos encantaría que participaras como invitado en nuestro podcast.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Formulario de contacto */}
        <motion.div 
          className="md:col-span-2"
          variants={fadeInUp}
        >          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-summer-accent/30 text-summer-text-dark">
            <h2 className="text-2xl font-semibold text-summer-dark mb-6 drop-shadow-sm">Envíanos un mensaje</h2>
            
            {submitResult && (
              <motion.div 
                className={`mb-6 p-4 rounded-lg flex items-start ${
                  submitResult.success ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {submitResult.success ? 
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} /> : 
                  <AlertCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" size={20} />
                }
                <p className={submitResult.success ? 'text-green-200' : 'text-red-200'}>
                  {submitResult.message}
                </p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nombre */}
                <motion.div variants={fadeInUp}>                  <label htmlFor="name" className="block text-sm font-bold text-summer-dark mb-1.5">
                    Nombre completo
                  </label><input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white border ${
                      errors.name ? 'border-red-500' : 'border-summer-dark/30'
                    } rounded-lg px-4 py-3 text-summer-text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-summer-accent/50 font-medium`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </motion.div>
                
                {/* Correo electrónico */}
                <motion.div variants={fadeInUp}>                  <label htmlFor="email" className="block text-sm font-bold text-summer-dark mb-1.5">
                    Correo electrónico
                  </label><input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white border ${
                      errors.email ? 'border-red-500' : 'border-summer-dark/30'
                    } rounded-lg px-4 py-3 text-summer-text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-summer-accent/50 font-medium`}
                    placeholder="tu.correo@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </motion.div>
              </div>
              
              {/* Asunto */}
              <motion.div variants={fadeInUp}>                <label htmlFor="subject" className="block text-sm font-bold text-summer-dark mb-1.5">
                  Asunto
                </label><select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-white border ${
                    errors.subject ? 'border-red-500' : 'border-summer-dark/30'
                  } rounded-lg px-4 py-3 text-summer-text-dark focus:outline-none focus:ring-2 focus:ring-summer-accent/50 font-medium`}
                >
                  <option value="" disabled>Selecciona un asunto</option>
                  <option value="sugerencia">Sugerencia para el podcast</option>
                  <option value="tema">Propuesta de tema</option>
                  <option value="participacion">Quiero participar como invitado</option>
                  <option value="colaboracion">Propuesta de colaboración</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                )}
              </motion.div>
              
              {/* Mensaje */}
              <motion.div variants={fadeInUp}>                <label htmlFor="message" className="block text-sm font-bold text-summer-dark mb-1.5">
                  Mensaje
                </label><textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-white border ${
                    errors.message ? 'border-red-500' : 'border-summer-dark/30'
                  } rounded-lg px-4 py-3 text-summer-text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-summer-accent/50 font-medium`}
                  placeholder="Describe tu idea, sugerencia o consulta..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </motion.div>
              
              {/* Checkbox para participar */}
              <motion.div 
                className="flex items-start space-x-3"
                variants={fadeInUp}
              >
                <input
                  type="checkbox"
                  id="wantParticipate"
                  name="wantParticipate"
                  checked={formData.wantParticipate}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 bg-gray-100 border-summer-accent/50 rounded checked:bg-summer-accent focus:ring-summer-accent focus:ring-offset-summer-light focus:ring-2 mt-0.5"
                />                <label htmlFor="wantParticipate" className="text-summer-dark font-medium">
                  Me gustaría participar como invitado en Good Vibes Podcast
                </label>
              </motion.div>
              
              {/* Botón Enviar */}
              <motion.div 
                className="pt-2"
                variants={fadeInUp}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}                  className={`w-full md:w-auto bg-gradient-to-r from-summer-accent to-summer-accent-hover hover:from-summer-accent-hover hover:to-summer-accent text-white py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-summer-accent/20'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;