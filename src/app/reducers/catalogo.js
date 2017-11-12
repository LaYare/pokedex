const initialState = {
  pokedex: [],
  loading: false,
  error: ''
};

export default function especie(state = initialState, action) {
  switch (action.type) {
    case 'TRAER_ESPECIES_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'TRAER_ESPECIES_REJECTED':
      return {
        ...state,
        loading: false,
        error: 'Hubo un error'
      };
    case 'TRAER_ESPECIES_FULFILLED':
      return {
        ...state,
        pokedex: action.payload.data.pokemon,
        loading: false
      };
    default:
      return state;
  }
}
