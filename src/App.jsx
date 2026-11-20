import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import Historia from './pages/Historia.jsx'
import CartaAno from './pages/CartaAno.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/historia/:ano/:parte?" element={<CartaAno />} />
      <Route path="*" element={<Inicio />} />
    </Routes>
  )
}
