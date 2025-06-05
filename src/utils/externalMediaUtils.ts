// Utility functions for external media services (YouTube)

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param url YouTube URL in any format
 * @returns YouTube video ID or null if not a valid YouTube URL
 */
export const extractYoutubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle already parsed IDs (just the ID itself)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  
  // Standard YouTube URL formats
  const youtubeRegex = /(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  
  return match ? match[1] : null;
};

/**
 * Generates a YouTube embed URL from a YouTube video ID or URL
 * @param urlOrId YouTube URL or video ID
 * @param options Additional options for the embed URL
 * @returns Embeddable YouTube URL
 */
export const getYoutubeEmbedUrl = (urlOrId: string, options: {
  autoplay?: boolean,
  controls?: boolean,
  showInfo?: boolean,
  isAudioOnly?: boolean
} = {}): string => {
  const videoId = extractYoutubeVideoId(urlOrId);
  if (!videoId) return '';
  
  const params = new URLSearchParams();
  
  // Set default parameters
  if (options.autoplay !== undefined) params.set('autoplay', options.autoplay ? '1' : '0');
  if (options.controls !== undefined) params.set('controls', options.controls ? '1' : '0');
  if (options.showInfo !== undefined) params.set('showinfo', options.showInfo ? '1' : '0');
  
  // For audio-only, we can hide the video and only show controls
  if (options.isAudioOnly) {
    params.set('modestbranding', '1');
    params.set('showinfo', '0');
    // For audio-only content, we can use picture-in-picture or background playback
    params.set('playsinline', '1');
  }
  
  // Enable JS API for interaction
  params.set('enablejsapi', '1');
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return `https://www.youtube.com/embed/${videoId}${queryString}`;
};

/**
 * Checks if a URL is a YouTube URL
 * @param url URL to check
 * @returns true if YouTube URL
 */
export const isYoutubeUrl = (url: string): boolean => {
  return extractYoutubeVideoId(url) !== null;
};

/**
 * Handles both audio and video YouTube URLs, creating appropriate embed URLs
 * @param url YouTube URL
 * @param isAudio Whether this is an audio track (will optimize player accordingly)
 * @param autoplay Whether to autoplay the media
 * @returns Properly configured YouTube embed URL
 */
export const getYoutubeMediaUrl = (url: string, isAudio = false, autoplay = false): string => {
  return getYoutubeEmbedUrl(url, {
    autoplay,
    controls: true,
    showInfo: !isAudio,
    isAudioOnly: isAudio
  });
};

/**
 * Determines if a source is external (YouTube, Archive.org) or local
 * @param src Source URL
 * @returns true if external source
 */
export const isExternalSource = (src: string): boolean => {
  if (!src) return false;
  return src.startsWith('http') || src.startsWith('https');
};
