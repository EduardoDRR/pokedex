import { useEffect, useState } from 'react';


const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'; //Listado de los pokemones
const URL_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

function usePokemones() {
    const [pokemones,setPokemones] = useState([]);
    const [siguienteUrl,setSiguienteUrl] = useState('');
    const [verMas, setVerMas] = useState(true);

    const fetchPokemones = async (url) =>  {
      const response = await fetch(url)
      const poke = await response.json()

      const abilities = poke.abilities.map(a => a.ability.name)
      const stats = poke.stats.map(s => {return { name: s.stat.name, base: s.base_stat }} )
      const types = poke.types.map(t => t.type.name)

      return {
        id: poke.id,
        nombre:poke.name,
        imgagen:poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
        abilities,
        stats,
        types
      }
    }
    
    const getPokemones =  async ( url = URL_DEFAULT) =>{
        const response = await fetch(url);
        const listaPokemones =  await response.json();
        const{next, results} = listaPokemones;
  
        //Ahora por cada result(pokemon), becesitamos obtener la informacion
        //Necesitamos esperar a que se resulvan todos (con el uso del async y await)
        //Por eso recurriomos al Promise.all
        const newPokemones = await Promise.all(
            results.map( (pokemon) => fetchPokemones(pokemon.url) )
        )
        return {next, newPokemones}
      }

    const obtenerPokemones  = async ()  => {
        const {next, newPokemones} = await getPokemones()
        setPokemones(newPokemones)
        setSiguienteUrl(next)
    } 

    const masPokemones = async ()  => {
        const {next, newPokemones} = await getPokemones(siguienteUrl)
        setPokemones(prev => [...prev, ...newPokemones])
        next == null && setVerMas(false)
        setSiguienteUrl(next)
    }

    const searchPokemon = async (busqueda) => {
      const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`
      return await fetchPokemones(url)
    }

    useEffect(() =>{ obtenerPokemones() }, [])

  return {pokemones, masPokemones, verMas, searchPokemon}
}

export default usePokemones;
