import { Mail, Instagram, Youtube, Linkedin, ExternalLink, MessageCircle, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/goodvibespodcast',
      color: 'from-pink-500 to-purple-500',
      description: 'Síguenos para contenido exclusivo y actualizaciones diarias'
    },    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/channel/UCiDrxNOf4aqtrDlkUmeKaZQ',
      color: 'from-red-500 to-red-600',
      description: 'Mira los episodios completos y contenido extra'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/vichidsan/',
      color: 'from-blue-600 to-blue-700',
      description: 'Conéctate conmigo en LinkedIn'
    }
  ];  const contactMethods = [
    {
      icon: Mail,
      title: "Email Directo",
      description: "La forma más rápida de contactarnos",
      action: {
        text: "goodvibespodcasts@gmail.com",
        url: "mailto:goodvibespodcasts@gmail.com"
      },
      color: "from-orange-400 to-red-500"
    },
    {
      icon: MessageCircle,
      title: "Invitado del Podcast",
      description: "¿Tienes una historia que contar? Nos encantaría escucharte",
      action: {
        text: "Proponer tema",
        url: "mailto:goodvibespodcasts@gmail.com?subject=Propuesta%20para%20el%20Podcast"
      },
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Coffee,
      title: "Colaboraciones",
      description: "Explora oportunidades de colaboración con nosotros",
      action: {
        text: "Iniciar conversación",
        url: "mailto:goodvibespodcasts@gmail.com?subject=Propuesta%20de%20Colaboración"
      },
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
          Contacta con Good Vibes Podcast
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          ¿Tienes una idea para compartir o quieres formar parte de nuestra comunidad? 
          Estamos aquí para escucharte.
        </p>
      </motion.div>

      {/* Contact Methods Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <div className={`p-6 bg-gradient-to-r ${method.color}`}>
              <method.icon className="h-8 w-8 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <a
                href={method.action.url}
                className="inline-flex items-center text-gray-900 font-medium hover:text-orange-500 transition-colors"
              >
                {method.action.text}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Social Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + (0.1 * index) }}
          >
            <div className={`p-6 bg-gradient-to-r ${social.color}`}>
              <social.icon className="h-8 w-8 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                {social.name}
              </h3>
              <p className="text-gray-600">{social.description}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;