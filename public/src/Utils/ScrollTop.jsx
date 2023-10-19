import { useEffect } from 'react';

function ScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll al principio de la página al montar o cambiar de componente
      }, []);
    
      return null;
}

export default ScrollToTop;