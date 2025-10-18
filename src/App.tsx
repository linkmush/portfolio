import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { Menu } from './pages/Menu'
import { Gallery } from './pages/Gallery'
import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import HyperSplash from './components/hypersplash'

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      // simulera API / assets loading
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setDataLoaded(true);
    }
    loadData();
  }, []);

  return (
    <Router>
      <HyperSplash active={!dataLoaded} />
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
