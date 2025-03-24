export interface Episode {
  id: number; // id del episodio
  title: string; // titulo del episodio 
  description: string; // descripcion del episodio
  duration: string; // duracion del episodio
  date: string; //fecha de publicacion del episodio
  imageUrl: string; // imagen del episodio
  videoUrl: string; //episodio en mp3 en el el usuario podra escuchar el podcast
  label?: string[]; //etiquetas para los episodios
}
