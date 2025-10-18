
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { Menu } from './pages/Menu'
import { Gallery } from './pages/Gallery'
import { Header } from './components/Header'

function App() {
  return (
    <Router>
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
  )
}

export default App
