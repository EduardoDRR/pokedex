import React, { Fragment, useState } from 'react'
import "./pokemones.css"
import DetallePokemon from './DetallePokemon'
import Buscador from './Buscador'
import usePokemones from '../hooks/usePokemones'
import InfiniteScroll from 'react-infinite-scroll-component'
import Cargando from './Cargando'


function Pokemon({id, nombre, imgagen: imagen, verPokemon}) {
    return (
        <div className="pokemon-card" onClick={verPokemon}>
            <img src={imagen} alt={nombre} className='pokemon-imagen'/>
            <p className='pokemon-titulo'>
            <span className='color'>#{id}</span>
            <span> {nombre}</span>
            </p>   
        </div>
    )
}

function Pokemones() {
    const {pokemones, masPokemones, verMas, searchPokemon} = usePokemones();
    const [mostrar, setMostrar] =  useState({ mostrar:false,pokemon:{} })
    const [busqueda,setBusqueda] = useState("");

    const verPokemon = (pokemon) => {setMostrar( {mostrar:true, pokemon})}
    
    const noVerPokemon = () => {
        setMostrar( {mostrar:false, pokemon: {}})
        setBusqueda('')
    }

    const buscarPokemon = async (e) => {
        e.preventDefault()

        if(!busqueda) return

        const pokemon =  await searchPokemon(busqueda)
        setMostrar({mostrar: true, pokemon})

    }
    
  return (
    <>
        <DetallePokemon {...mostrar} cerrar={noVerPokemon}/>
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon}/>
        
        <InfiniteScroll 
            dataLength={pokemones.length}
            next={masPokemones}
            hasMore={verMas}
            loader = {<Cargando/>}
            endMessage={
                <h3 className='titulo' style={{gridColumn: '1/6'}}>Lo siento, no hay mas Pokémones para mostrar</h3>
            }
            className='pokemon-container'
        >
            {pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)}/> )}
      </InfiniteScroll>  
     
        
    </>
  )
}

export default Pokemones
