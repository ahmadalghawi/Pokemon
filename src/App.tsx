import { Routes, Route } from 'react-router-dom';
import PokemonList from './assets/components/PokemonList'
import './App.css'
import PokemonDetail from './assets/components/PokemonDetail';
import logo from './image/Pokémon_logo.svg';


function App() {
  

  return (
    <>
      <div className="container">
        <img src={logo} alt="Logo" className="logo" /> 
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
      </div>
    </>
  )
}

export default App
