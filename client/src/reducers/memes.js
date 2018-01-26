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
    case 'MEMES_RECEIVED':
      return Object.assign({}, state, {
        memes: action.memes,
        pending: false,
      })
    case 'TOGGLE_FAVORITE':
      if (action.isFavorite) {
        let memes = state.memes.map((meme) => {
          let updatedMeme = meme;
          if (meme._id === action.meme) {
            updatedMeme.favorites.push(action.user)
          }
          return updatedMeme
        })
        let myMemes = state.myMemes.map((meme) => {
          let updatedMeme = meme;
          if (meme._id === action.meme) {
            updatedMeme.favorites.push(action.id)
          }
          return updatedMeme
        })
        return Object.assign({}, state, {
          memes,
          myMemes
        })
      } else {
        // remove heart
        return state
      }
    default:
      return state
  }
}

export default memeReducer