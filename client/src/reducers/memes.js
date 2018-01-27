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
      console.log(action.memes)
      return Object.assign({}, state, {
        myMemes: action.memes,
        pending: false
      })
    case 'MEMES_RECEIVED':
      console.log(action.memes)
      return Object.assign({}, state, {
        memes: action.memes,
        pending: false,
      })
    case 'TOGGLE_FAVORITE':
      if (action.isFavorite) {
        let memes = state.memes.map((meme, index) => {
          if (meme._id === action.meme) {
            return Object.assign({}, meme, {
              favorites: [
                ...meme.favorites.slice(),
                action.user,
              ]
            })
          }
          return meme
        })

        let myMemes = state.myMemes.map((meme, index) => {
          if (meme._id === action.meme) {
            return Object.assign({}, meme, {
              favorites: [
                ...meme.favorites.slice(),
                action.user,
              ]
            })
          }
          return meme
        })

        return Object.assign({}, state, {
          memes: Object.assign([], memes),
          myMemes: Object.assign([], myMemes)
        })
      } else {
        let memes = state.memes.map((meme, index) => {
          let favIndex = meme.favorites.indexOf(action.user)
          if (meme._id === action.meme) {
            return Object.assign({}, meme, {
              favorites: [
                ...meme.favorites.slice(0, favIndex),
                ...meme.favorites.slice(favIndex + 1)
              ]
            })
          }
          return meme
        })

        let myMemes = state.myMemes.map((meme, index) => {
          let favIndex = meme.favorites.indexOf(action.user)
          if (meme._id === action.meme) {
            return Object.assign({}, meme, {
              favorites: [
                ...meme.favorites.slice(0, favIndex),
                ...meme.favorites.slice(favIndex + 1)
              ]
            })
          }
          return meme
        })

        return Object.assign({}, state, {
          memes: Object.assign([], memes),
          myMemes: Object.assign([], myMemes)
        })
      }
    default:
      return state
  }
}

export default memeReducer