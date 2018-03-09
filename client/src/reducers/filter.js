function filterReducer(state = {
  characters: [],
}, action) {
  switch (action.type) {
    case "UPDATED_FILTER":
      return {
        ...state,
        characters: action.filter
      }
    default:
      return state
  }
}

export default filterReducer
