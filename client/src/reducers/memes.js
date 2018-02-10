let memes = {}
let myMemes = {}
let recentMemes = {}
let favorites = {}

function memeReducer(state = {
  pending: false,
}, action) {
  switch (action.type) {
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

      return {
        ...state,
        memes,
        myMemes,
        recentMemes,
      }
    case "TOGGLE_FAVORITE":
      memes = {...toggleFavorite(state.memes, action.meme, action.updatedMeme)}
      myMemes = {...toggleFavorite(state.myMemes, action.meme, action.updatedMeme)}
      recentMemes = {...toggleFavorite(state.recentMemes, action.meme, action.updatedMeme)}

      return {
        ...state,
        memes,
        myMemes,
        recentMemes
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
    ...newMeme,
    numFaves: newMeme.favorites.length,
  }

  return memeCollection
}

export default memeReducer