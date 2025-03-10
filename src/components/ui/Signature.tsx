import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SignatureBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`signature-banner ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="signature-text">
        <div className="made-with">Made with <Heart size={20}/> by </div>
        <div className="author-name"></div>
      </div>
    </div>
  );
};

export default SignatureBanner;