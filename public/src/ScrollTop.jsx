import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop(props) {
  const location = useLocation(); 
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll al principio de la página al montar o cambiar de componente
      }, [location]);
    
      return <>{props.children}</>;
}

export default ScrollToTop;