import React from 'react'
import "./detalle.css"
import { type } from '@testing-library/user-event/dist/type'

function DetallePokemon({mostrar, pokemon, cerrar}) {
  return (
    <div className="modal-container" onClick={cerrar} style={{display: mostrar ? 'grid' : 'none'}}>
        <section className='modal-body'> 
            <div className='imagen-container'>
            <img src={pokemon.imgagen} alt={pokemon.nombre} className="imagen-detalle" />
            <section>
                {pokemon.types?.map(type =><span className='tag'>{type}</span>)}
            </section>
            </div>
            <div className="data">
                <h2 className='titulo'>{pokemon.nombre} ({pokemon.id})</h2>

                <h3 className='titulo-section'>Habilidades</h3>
                {pokemon.abilities?.map(ability =><span className='tag'>{ability}</span>  )}

                <h3 className='titulo-section'>Estadisticas</h3>
                <div className='stats'>
                    {pokemon.stats?.map(stat =>
                    <section>
                        <span className='puntos'>{stat.base}</span>
                        <span>{stat.name}</span>
                    </section>
                    )}
                </div>
            </div>
            
        </section>
    </div>
  )
}

export default DetallePokemon
