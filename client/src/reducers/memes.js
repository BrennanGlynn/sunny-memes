let memes = {}
let myMemes = {}
let recentMemes = {}
let favoriteMemes = {}

function memeReducer(state = {
  pending: false,
  currentIndex: 0,
}, action) {
  switch (action.type) {
    case "FAVORITE_MEMES_RECEIVED":
      return {
        ...state,
        favoriteMemes: action.memes
      }
    case "RECENT_MEMES_RECEIVED":
      return {
        ...state,
        recentMemes: action.memes,
      }
    case "MY_MEMES_RECEIVED":
      return {
        ...state,
        myMemes: action.memes,
        pending: false,
      }
    case "MEMES_RECEIVED":
      return {
        ...state,
        memes: action.memes,
        pending: false,
      }
    case "MEME_DELETED":
      // only return memes that aren't deleted
      memes = {...deleteMeme(state.memes, action.meme)}
      myMemes = {...deleteMeme(state.myMemes, action.meme)}
      recentMemes = {...deleteMeme(state.recentMemes, action.meme)}
      favoriteMemes = {...deleteMeme(state.favoriteMemes, action.meme)}

      return {
        ...state,
        memes,
        myMemes,
        recentMemes,
        favoriteMemes
      }
    case "TOGGLE_FAVORITE":
      memes = {...toggleFavorite(state.memes, action.meme, action.updatedMeme)}
      myMemes = {...toggleFavorite(state.myMemes, action.meme, action.updatedMeme)}
      recentMemes = {...toggleFavorite(state.recentMemes, action.meme, action.updatedMeme)}
      favoriteMemes = {...toggleFavorite(state.favoriteMemes, action.meme, action.updatedMeme)}

      return {
        ...state,
        memes,
        myMemes,
        recentMemes,
        favoriteMemes
      }
    case "CHANGE_CURRENT_INDEX":
      return {
        ...state,
        currentIndex: action.index
      }
    default:
      return state
  }
}

function deleteMeme(memeCollection, memeId) {
  delete memeCollection[memeId]

  return memeCollection
}

function toggleFavorite(memeCollection, memeId, newMeme) {
  memeCollection[memeId] = {
    ...memeCollection[memeId],
    favorites: newMeme.favorites
  }

  return memeCollection
}

export default memeReducer