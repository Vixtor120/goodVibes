export interface Episode {
  id: number; // id del episodio
  title: string; // titulo del episodio 
  description: string; // descripcion del episodio
  duration: string; // duracion del episodio
  date: string; //fecha de publicacion del episodio
  imageUrl: string; // imagen del episodio
  videoUrl: string; // URL de YouTube para el episodio
  label?: string[]; //etiquetas para los episodios
  isYoutubeContent?: boolean; // Indicador si el contenido está en YouTube
}
