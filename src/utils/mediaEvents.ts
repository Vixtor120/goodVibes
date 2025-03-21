/**
 * Sistema de eventos para coordinar reproducción de medios
 * Garantiza que solo un reproductor esté activo a la vez
 */

// Custom event system for media players to communicate with each other

// Define a custom event name
const MEDIA_PLAY_EVENT = 'goodvibes:media:play';

/**
 * Emit an event when a media player starts playing
 * @param playerId Unique ID of the player that started playing
 */
export const emitMediaPlayEvent = (playerId: string) => {
  // Create and dispatch a custom event
  const event = new CustomEvent(MEDIA_PLAY_EVENT, { 
    detail: { playerId } 
  });
  document.dispatchEvent(event);
};

/**
 * Listen for play events from other media players
 * @param currentPlayerId ID of the current player (to ignore its own events)
 * @param callback Function to execute when another player starts playing
 * @returns A function to remove the event listener
 */
export const listenToMediaPlayEvents = (
  currentPlayerId: string, 
  callback: () => void
) => {
  // Event handler function
  const handleMediaPlay = (event: Event) => {
    const customEvent = event as CustomEvent;
    const playingId = customEvent.detail.playerId;
    
    // Only pause if another player is playing (not this one)
    if (playingId !== currentPlayerId) {
      callback();
    }
  };
  
  // Add event listener
  document.addEventListener(MEDIA_PLAY_EVENT, handleMediaPlay);
  
  // Return a function to remove the listener
  return () => {
    document.removeEventListener(MEDIA_PLAY_EVENT, handleMediaPlay);
  };
};
