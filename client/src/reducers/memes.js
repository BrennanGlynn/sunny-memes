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
    case 'RECENT_MEMES_RECEIVED':
      return {
        ...state,
        recentMemes: action.memes
      }
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
    case 'MEME_DELETED':
      // only return memes that aren't deleted
      let memes = state.memes.filter((meme) =>
        meme._id !== action.meme
      )

      let myMemes = state.myMemes.filter((meme) =>
        meme._id !== action.meme
      )

      return Object.assign({}, state, {
        memes: Object.assign([], memes),
        myMemes: Object.assign([], myMemes)
      })
    case 'TOGGLE_FAVORITE':
      if (action.isFavorite) {
        // adding a favorite

        // loop over memes in state to find modified meme
        let memes = state.memes.map((meme, index) => {

          if (meme._id === action.meme) {
            // we've found the meme we're trying to change
            return Object.assign({}, meme, {
              favorites: [
                ...meme.favorites.slice(),
                action.user,
              ],
              numFaves: meme.numFaves + 1
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
              ],
              numFaves: meme.numFaves + 1
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
              ],
              numFaves: meme.numFaves - 1
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
              ],
              numFaves: meme.numFaves - 1
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