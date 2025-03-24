export const shareEpisode = async (episodeId: number, title: string): Promise<boolean> => {
  // Use the hardcoded production URL
  const baseUrl = "https://good-vibes-tau.vercel.app"; // Hardcoded production URL
  const url = `${baseUrl}/episodios/${episodeId}`;
  
  // Check if the Web Share API is available (mainly on mobile devices)
  // Fix the TypeScript error by using 'in' operator for feature detection
  if ('share' in navigator) {
    try {
      await navigator.share({
        title: title,
        text: `Escucha "${title}" en GoodVibes Podcast`,
        url: url,
      });
      return true;
    } catch (error) {
      console.error("Error sharing:", error);
      return false;
    }
  } else {
    // Fallback to clipboard copy for desktop
    // Use type assertion to properly type the navigator.clipboard
    if ('clipboard' in navigator && (navigator as Navigator).clipboard) {
      try {
        await ((navigator as Navigator).clipboard as Clipboard).writeText(url);
        return true;
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
    
    // Extra fallback for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (e) {
      console.error("Fallback copy error:", e);
      return false;
    }
  }
};
