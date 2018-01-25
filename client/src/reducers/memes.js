function memeReducer(state = {
  myMemes: [{
    _id: "",
    title: "Loading title...",
    url: "/images/user-icon.png",
    uploaded_by: "",
    favorites: [],
    visits: 0,
    tags: [],
    characters: []
  }],
  memes: [{
    _id: "",
    title: "Loading title...",
    url: "/images/user-icon.png",
    uploaded_by: "",
    favorites: [],
    visits: 0,
    tags: [],
    characters: []
  }],
  pending: false
}, action) {
  switch (action.type) {
    case 'MY_MEMES_RECEIVED':
      return Object.assign({}, state, {
        myMemes: action.memes,
        pending: false
      })
    default:
      return state
  }
}

export default memeReducer