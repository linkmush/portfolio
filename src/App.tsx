// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { Home } from './pages/Home'
// import { Contact } from './pages/Contact'
// import { Menu } from './pages/Menu'
// import { Header } from './components/Header'
// import { useState } from 'react'
// import { StarRain } from './components/starloading'
// import { DotNavigation } from './components/dotnavigation'

// function App() {
//   const [dataLoaded, setDataLoaded] = useState(false)

//   return (
//     <Router>
//       <StarRain active={!dataLoaded} />
//       {dataLoaded && <Header />} 
//       <DotNavigation dots={3}>
//         <Routes>
//           <Route path="/" element={<Home onLoaded={() => setDataLoaded(true)} />} />
//           <Route path="/aboutme" element={<Menu onLoaded={() => setDataLoaded(true)} />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </DotNavigation>
//     </Router>
//   )
// }

// export default App


import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { Menu } from './pages/Menu'
import { Header } from './components/Header'
import { useState } from 'react'
import { StarRain } from './components/starloading'
import { DotNavigation } from './components/dotnavigation'

function App() {
  const [dataLoaded, setDataLoaded] = useState(false)

  return (
    <Router>
      <StarRain active={!dataLoaded} />
      {dataLoaded && <Header />}

      <Routes>
        {/* ⭐ Endast Home får dotnavigation */}
        <Route
          path="/"
          element={
            <DotNavigation dots={4}>
              <Home onLoaded={() => setDataLoaded(true)} />
            </DotNavigation>
          }
        />

        {/* ❌ Dessa visar ingen DotNavigation */}
        <Route path="/aboutme" element={<Menu onLoaded={() => setDataLoaded(true)} />} />
        <Route path="/contact" element={<Contact onLoaded={() => setDataLoaded(true)} />} />
      </Routes>
    </Router>
  )
}

export default App
