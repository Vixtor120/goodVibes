import { useEffect, useState } from 'react';
import Episode from '../components/Episode';
import episodesData from '../json/episodios.json';
import { Episode as EpisodeType } from '../interfaces/Episode';
import { Play, Filter, ChevronDown, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { updateEpisodesDuration } from '../utils/audioUtils';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<EpisodeType[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Extract all unique tags from episodes
  const allTags = [...new Set(
    episodesData.flatMap(episode => episode.label || [])
  )].sort();

  useEffect(() => {
    const loadEpisodes = async () => {
      setIsLoading(true);
      try {
        // Create a safe copy of the episodes data
        const episodesCopy = JSON.parse(JSON.stringify(episodesData));
        
        // Update episode durations with actual audio duration
        const episodesWithDuration = await updateEpisodesDuration(episodesCopy);
        
        // Sort episodes by ID in descending order
        const sortedEpisodes = episodesWithDuration.sort((a, b) => b.id - a.id);
        
        setEpisodes(sortedEpisodes);
        setFilteredEpisodes(sortedEpisodes);
      } catch (error) {
        console.error("Error loading episodes:", error);
        // Fallback to using episodes without duration calculation
        const sortedEpisodes = [...episodesData].sort((a, b) => b.id - a.id);
        setEpisodes(sortedEpisodes);
        setFilteredEpisodes(sortedEpisodes);
      } finally {
        setIsLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  // Filter episodes when tag changes
  useEffect(() => {
    if (!selectedTag) {
      setFilteredEpisodes(episodes);
      return;
    }

    const filtered = episodes.filter(episode => 
      episode.label && episode.label.includes(selectedTag)
    );
    
    setFilteredEpisodes(filtered);
  }, [selectedTag, episodes]);

  // Obtener el último episodio y los episodios restantes (from filtered results)
  const latestEpisode = filteredEpisodes.length > 0 ? filteredEpisodes[0] : null;
  const otherEpisodes = filteredEpisodes.length > 0 ? filteredEpisodes.slice(1) : [];

  const handlePlayLatestEpisode = () => {
    if (latestEpisode) {
      navigate(`/episodios/${latestEpisode.id}?autoplay=true`);
    }
  };

  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    setShowTagFilter(false);
  };

  // Animations
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600">
          Nuestros Episodios
        </h1>
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explora nuestra colección de episodios y filtra por temas que te interesen.
        </motion.p>
      </motion.div>
      
      {/* Loading indicator */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <Loader className="w-10 h-10 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-300">Calculando duración de los episodios...</p>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Topic Filter - Centered and Prominent */}
          <motion.div 
            className="max-w-md mx-auto mb-14"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <button 
                onClick={() => setShowTagFilter(!showTagFilter)}
                className={`flex items-center justify-between w-full py-4 px-5 rounded-xl shadow-md transition-all ${
                  selectedTag 
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/50' 
                    : 'bg-gray-800/70 text-gray-200 border border-gray-700/50 hover:border-purple-500/30'
                }`}
              >
                <div className="flex items-center">
                  <Filter size={20} className={`mr-3 ${selectedTag ? 'text-purple-400' : 'text-gray-400'}`} />
                  <span className="text-lg">{selectedTag || 'Filtrar por tema'}</span>
                </div>
                <motion.div
                  animate={{ rotate: showTagFilter ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
              </button>
              
              {/* Tag Filter Dropdown */}
              <AnimatePresence>
                {showTagFilter && (
                  <motion.div 
                    className="absolute z-20 mt-2 w-full bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="max-h-[300px] overflow-y-auto py-1 divide-y divide-gray-700/30">
                      <button 
                        onClick={() => handleTagFilter(null)}
                        className="w-full px-5 py-3 text-left text-gray-200 hover:bg-purple-600/20 transition-colors flex items-center"
                      >
                        <span className="w-4 h-4 mr-3 rounded-full border-2 border-gray-500 flex items-center justify-center">
                          {!selectedTag && <span className="w-2 h-2 bg-purple-500 rounded-full"></span>}
                        </span>
                        Todos los temas
                      </button>
                      
                      {allTags.map((tag, index) => (
                        <motion.button 
                          key={tag}
                          onClick={() => handleTagFilter(tag)}
                          className={`w-full px-5 py-3 text-left transition-colors flex items-center ${
                            selectedTag === tag 
                              ? 'bg-purple-600/30 text-white' 
                              : 'text-gray-200 hover:bg-purple-600/20'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <span className="w-4 h-4 mr-3 rounded-full border-2 border-gray-500 flex items-center justify-center">
                            {selectedTag === tag && <span className="w-2 h-2 bg-purple-500 rounded-full"></span>}
                          </span>
                          {tag}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Filter Status */}
            {selectedTag && (
              <motion.div 
                className="mt-3 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-purple-600/20 text-purple-300 rounded-full px-4 py-1 text-sm flex items-center">
                  <span>Filtrando: <span className="font-medium">{selectedTag}</span></span>
                  <button 
                    onClick={() => setSelectedTag(null)}
                    className="ml-2 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Results Count */}
            <motion.div 
              className="mt-3 text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {filteredEpisodes.length} episodio{filteredEpisodes.length !== 1 ? 's' : ''} encontrado{filteredEpisodes.length !== 1 ? 's' : ''}
            </motion.div>
          </motion.div>
          
          {/* No Results Message */}
          {filteredEpisodes.length === 0 && (
            <motion.div 
              className="text-center py-16 bg-gradient-to-b from-gray-800/40 to-gray-900/40 rounded-2xl mb-14 border border-gray-700/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block p-4 bg-gray-700/30 rounded-full mb-5">
                <Filter className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No se encontraron episodios</h3>
              <p className="text-gray-300 max-w-lg mx-auto mb-6">
                No hay episodios que coincidan con el tema seleccionado. Prueba con otro tema o explora todos nuestros episodios.
              </p>
              <button 
                onClick={() => setSelectedTag(null)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg hover:shadow-purple-700/30"
              >
                Ver todos los episodios
              </button>
            </motion.div>
          )}
          
          {/* Latest Episode Featured Section */}
          {latestEpisode && (
            <AnimatePresence>
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div 
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                    {!selectedTag && (
                      <motion.span 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-md mr-3 text-sm"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        ÚLTIMO
                      </motion.span>
                    )}
                    {selectedTag ? 'Episodio destacado' : 'Episodio más reciente'}
                  </h2>
                </motion.div>
                
                <motion.div 
                  className="overflow-hidden rounded-2xl shadow-lg border border-gray-700/30 hover:border-purple-500/30 transition-all duration-500 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.25)" 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto">
                      <img 
                        src={latestEpisode.imageUrl}
                        alt={latestEpisode.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:bg-gradient-to-t md:from-black/80 md:to-transparent"></div>
                      
                      <div className="absolute bottom-6 left-6 md:hidden">
                        <motion.button 
                          onClick={handlePlayLatestEpisode}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3.5 rounded-full shadow-lg shadow-purple-900/40 flex items-center justify-center"
                          whileHover={{ scale: 1.1, boxShadow: "0 10px 15px -3px rgba(124, 58, 237, 0.4)" }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play size={24} className="ml-0.5" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <span className="bg-gradient-to-r from-purple-600/20 to-purple-600/30 text-purple-300 text-xs px-3 py-1 rounded-full mb-3 inline-block">
                          {new Date(latestEpisode.date).toLocaleDateString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'})}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 leading-tight">{latestEpisode.title}</h3>
                        <div className="flex items-center text-sm text-gray-400 mb-4">
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {latestEpisode.duration}
                          </span>
                        </div>
                        
                        {/* Episode Tags */}
                        {latestEpisode.label && latestEpisode.label.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {latestEpisode.label.map((tag: string, index: number) => {
                              // Generate tag colors
                              const colors = [
                                'bg-purple-500/70 text-purple-100',
                                'bg-blue-500/70 text-blue-100',
                                'bg-green-500/70 text-green-100',
                                'bg-red-500/70 text-red-100',
                                'bg-yellow-500/70 text-yellow-100'
                              ];
                              const sum = tag.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
                              const colorClass = colors[sum % colors.length];
                              
                              // Highlight selected tag
                              const isSelected = tag === selectedTag;
                              
                              return (
                                <span 
                                  key={index} 
                                  className={`px-3 py-1 text-xs rounded-full font-medium ${colorClass} ${
                                    isSelected ? 'ring-2 ring-white ring-opacity-60' : ''
                                  }`}
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        
                        <p className="text-gray-300 leading-relaxed line-clamp-3 md:line-clamp-4">{latestEpisode.description}</p>
                      </div>
                      
                      <div className="mt-8 hidden md:block">
                        <motion.button 
                          onClick={handlePlayLatestEpisode}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-7 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-700/30 flex items-center"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Play size={18} className="mr-2 ml-0.5" />
                          Reproducir episodio
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
          
          {/* Previous Episodes Grid */}
          {otherEpisodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center">
                {selectedTag ? (
                  <span>Más episodios de <span className="text-purple-400">{selectedTag}</span></span>
                ) : (
                  'Episodios anteriores'
                )}
              </h2>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {otherEpisodes.map((episode, index) => (
                  <motion.div 
                    key={episode.id}
                    variants={fadeInUp}
                    custom={index}
                    transition={{ delay: index * 0.08 }}
                    className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl overflow-hidden border border-gray-700/40 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
                    whileHover={{ 
                      y: -8, 
                      transition: { duration: 0.2 },
                      boxShadow: "0 15px 30px -10px rgba(124, 58, 237, 0.2)"
                    }}
                    onClick={() => navigate(`/episodios/${episode.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Episode 
                      id={episode.id}
                      title={episode.title}
                      description={episode.description}
                      duration={episode.duration}
                      date={episode.date}
                      imageUrl={episode.imageUrl}
                      label={episode.label}
                      videoUrl={episode.videoUrl} // Pass videoUrl for duration calculation
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default EpisodesPage;