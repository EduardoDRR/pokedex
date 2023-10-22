import React from 'react'
import "./buscador.css"
import { Buscar } from "./Icons"

function Buscador({busqueda, setBusqueda, buscarPokemon}) {
  return (
    <>
        <h3 className='titulo'>Mas de 400 pokemones, elije tu favorito</h3>
        <form className='conteiner-buscador' onSubmit={buscarPokemon}>
            <input type='text' placeholder='Encuentra tu pokemon' className='input-buscar'
              value={busqueda} 
              onChange={(e)=> setBusqueda(e.target.value)}/>
            <button className='btn-buscar' type='submit'>
               <Buscar/> 
               Buscar Pokémon
            </button>
            
        </form>
    </>
  )
}

export default Buscador
