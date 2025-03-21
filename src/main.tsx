import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import NotFound from './components/ui/NotFound';
import { ChampionProvider } from './context/ChampionProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChampionProvider localStorageKey="arena-god-champions">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ChampionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
