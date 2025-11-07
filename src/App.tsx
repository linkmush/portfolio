import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { Menu } from './pages/Menu'
import { Gallery } from './pages/Gallery'
import { Header } from './components/Header'
import { useState } from 'react'
import { StarRain } from './components/starloading'
import { DotNavigation } from './components/dotnavigation'

function App() {
  const [dataLoaded, setDataLoaded] = useState(false)

  return (
    <Router>
      <StarRain active={!dataLoaded} />

      <DotNavigation>
        <div className="bg-background">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<Home onLoaded={() => setDataLoaded(true)} />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </DotNavigation>
    </Router>
  )
}

export default App
