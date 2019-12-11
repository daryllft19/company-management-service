const initialState = {
  companies: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COMPANIES': {
      return {
        ...state,
        companies: action.payload.companies
      };
    }
    default:
      return state;
  }
}
