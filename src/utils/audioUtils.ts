/**
 * Utility function to get the duration of an audio file
 * @param audioUrl URL of the audio file
 * @returns Promise that resolves to the formatted duration string (MM:SS)
 */
export const getAudioDuration = (audioUrl: string): Promise<string> => {
  if (!audioUrl) {
    console.error('Invalid audio URL provided (empty or undefined)');
    return Promise.reject(new Error('Invalid audio URL provided'));
  }

  console.log(`Starting getAudioDuration for: ${audioUrl}`);
  
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    
    // Set a timeout to prevent hanging forever
    const timeoutId = setTimeout(() => {
      console.error('Audio duration calculation timed out for:', audioUrl);
      reject(new Error(`Timeout calculating duration for: ${audioUrl}`));
    }, 10000); // 10 seconds timeout
    
    // Add all event listeners before setting src
    audio.addEventListener('loadedmetadata', () => {
      clearTimeout(timeoutId);
      
      // Check if duration is a valid number
      if (isNaN(audio.duration) || !isFinite(audio.duration)) {
        console.error('Invalid audio duration for:', audioUrl, audio.duration);
        reject(new Error(`Invalid duration value: ${audio.duration}`));
        return;
      }
      
      // Get duration in seconds
      const durationInSeconds = Math.floor(audio.duration);
      
      // Convert to minutes and seconds
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      
      // Format as MM:SS with leading zeros
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      console.log(`Duration calculated successfully for ${audioUrl}: ${formattedDuration}`);
      resolve(formattedDuration);
    });
    
    // Handle errors properly
    audio.addEventListener('error', (e) => {
      clearTimeout(timeoutId);
      console.error('Error loading audio file:', audioUrl, e);
      
      // Type cast to HTMLAudioElement to access the error property
      const audioElement = e.currentTarget as HTMLAudioElement;
      const errorMessage = audioElement?.error?.message || 'Unknown error';
      
      reject(new Error(`Failed to load audio: ${errorMessage}`));
    });
    
    // Handle cases where metadata might not load
    audio.addEventListener('canplay', () => {
      // If we haven't received loadedmetadata, but the audio can play,
      // we can try to get the duration anyway
      if (audio.duration && isFinite(audio.duration) && !isNaN(audio.duration)) {
        clearTimeout(timeoutId);
        const durationInSeconds = Math.floor(audio.duration);
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        console.log(`Duration calculated on canplay for ${audioUrl}: ${formattedDuration}`);
        resolve(formattedDuration);
      }
    });
    
    // Ensure we have a real URL to work with
    try {
      // Make sure to handle relative URLs properly by using the full URL if needed
      let fullUrl = audioUrl;
      if (audioUrl.startsWith('/')) {
        fullUrl = `${window.location.origin}${audioUrl}`;
      }
      
      // Add a cache-busting parameter to avoid browser caching
      const cacheBuster = `?t=${Date.now()}`;
      fullUrl = fullUrl.includes('?') ? `${fullUrl}&_cb=${Date.now()}` : `${fullUrl}${cacheBuster}`;
      
      console.log(`Loading audio for duration calculation: ${fullUrl}`);
      audio.preload = 'metadata';  // Only load metadata for faster calculation
      audio.src = fullUrl;
      audio.load();
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Error setting audio source:', err);
      reject(new Error(`Failed to set audio source: ${err instanceof Error ? err.message : String(err)}`));
    }
  });
};

/**
 * Updates episode data with actual audio durations
 * @param episodes Array of episode objects
 * @returns Promise that resolves to episodes with updated durations
 */
export const updateEpisodesDuration = async (episodes: any[]): Promise<any[]> => {
  if (!episodes || episodes.length === 0) {
    console.warn('No episodes provided to updateEpisodesDuration');
    return [];
  }

  try {
    // Use sequential processing instead of Promise.all to avoid too many simultaneous requests
    const updatedEpisodes = [];
    
    for (const episode of episodes) {
      try {
        // Only calculate if the episode has a video/audio URL
        if (episode.videoUrl) {
          console.log(`Calculating duration for episode ${episode.id}: ${episode.videoUrl}`);
          const duration = await getAudioDuration(episode.videoUrl);
          console.log(`Episode ${episode.id} duration calculated: ${duration} (was: ${episode.duration})`);
          
          // Create a new object with the updated duration
          updatedEpisodes.push({ ...episode, duration });
        } else {
          updatedEpisodes.push(episode);
        }
      } catch (error) {
        console.error(`Error calculating duration for episode ${episode.id}:`, error);
        updatedEpisodes.push(episode); // Keep original duration as fallback
      }
    }
    
    console.log('All episode durations updated:', updatedEpisodes);
    return updatedEpisodes;
  } catch (error) {
    console.error('Error updating episodes duration:', error);
    return episodes; // Return original episodes as fallback
  }
};
