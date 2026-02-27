import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Features from './pages/Features.tsx'
import ClientDetail from './pages/ClientDetail.tsx'
import Admin from './pages/Admin.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/client/:clientId" element={<ClientDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
