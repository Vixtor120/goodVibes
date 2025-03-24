/**
 * Utility function to get the duration of an audio file
 * @param audioUrl URL of the audio file
 * @returns Promise that resolves to the formatted duration string (MM:SS)
 */
export const getAudioDuration = (audioUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    
    audio.addEventListener('loadedmetadata', () => {
      // Get duration in seconds
      const durationInSeconds = Math.floor(audio.duration);
      
      // Convert to minutes and seconds
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      
      // Format as MM:SS with leading zeros
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      resolve(formattedDuration);
    });
    
    // Handle errors properly
    audio.addEventListener('error', (e) => {
      console.error('Error loading audio file:', audioUrl, e);
      reject(new Error(`Failed to load audio: ${audioUrl}`));
    });
    
    // Set the source and load the audio
    try {
      // Make sure to handle relative URLs properly by using the full URL if needed
      if (audioUrl.startsWith('/')) {
        audio.src = `${window.location.origin}${audioUrl}`;
      } else {
        audio.src = audioUrl;
      }
      
      audio.load();
    } catch (err) {
      console.error('Error setting audio source:', err);
      reject(new Error(`Failed to set audio source: ${audioUrl}`));
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
