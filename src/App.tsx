import React, { useEffect } from 'react';
import Layout from "./layouts/Layout";
import "./App.css";

const App: React.FC = () => {
  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Arena God Tracker',
      'description': 'Track your Arena God progress, achievements, and champions',
      'applicationCategory': 'Game Tracker',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <Layout />;
};

export default App;
