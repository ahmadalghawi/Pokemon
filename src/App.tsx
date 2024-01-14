import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './assets/components/PokemonList'
import './App.css'
import PokemonDetail from './assets/components/PokemonDetail';
import logo from './image/Pokémon_logo.svg';


function App() {
  

  return (
    <>
      <Router>
      <div className="container">
        <img src={logo} alt="Logo" className="logo" /> 
      <Routes>
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/" element={<PokemonList />} />
      </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
