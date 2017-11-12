import axios from 'axios';

export function traerEspecies() {
  return {
    type: 'TRAER_ESPECIES',
    payload: axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
  };
}
