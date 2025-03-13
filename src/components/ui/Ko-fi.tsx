import { Coffee } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface KofiBannerProps {
  kofiUrl: string;
}

const KofiBanner: React.FC<KofiBannerProps> = ({ kofiUrl }) => {
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
    <div className={`kofi-banner ${isVisible ? 'visible' : 'hidden'}`}>
      <a 
        href={kofiUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="kofi-link"
      >
        <div className="banner-content">
          <div className="banner-text">Tip a coppa <Coffee size={20} /> ? </div>
          <div className="banner-rope left"></div>
          <div className="banner-rope right"></div>
        </div>
      </a>
    </div>
  );
};

export default KofiBanner;