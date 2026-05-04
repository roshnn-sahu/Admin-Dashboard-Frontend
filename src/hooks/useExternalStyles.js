import { useEffect } from 'react';

const useExternalStyles = (styles) => {
  useEffect(() => {
    const links = styles.map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.className = 'dynamic-style';
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach((link) => {
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [styles]);
};

export default useExternalStyles;
