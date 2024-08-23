// src/hooks/useScreenDimensions.ts
import { useState, useEffect } from 'react';

const useScreenDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set initial dimensions
      handleResize();

      window.addEventListener('resize', handleResize);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return dimensions;
};

export default useScreenDimensions;
