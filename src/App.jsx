import './App.css';
import Navbar from './componentes/Navbar';
import Pokemones from './componentes/Pokemones';

function App() {
  
  

  return (
    <>
      <Navbar />
      <Pokemones/>
      
    </>
  );
}

export default App;
//<p>{pokemon.name}</p>

/* 
{
        pokemones.map(pokemon =>{
          return (
            <div className='datospokemon'>
              <span className='color'>{pokemon.id}</span>
              <p>{pokemon.name}</p>
              <img src={pokemon.img} alt={pokemon.name}/>
            </div>  
          )
        } )
      }
*/