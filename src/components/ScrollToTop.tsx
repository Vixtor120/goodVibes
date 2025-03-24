import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que desplaza automáticamente la página hacia arriba
 * cuando el usuario navega entre diferentes rutas.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando cambia la ruta, desplaza hacia arriba
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Este componente no renderiza nada
};

export default ScrollToTop;
