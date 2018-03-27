let memes = {}
let myMemes = {}
let recentMemes = {}
let favoriteMemes = {}
let userPageMemes = {}
let singleMeme = {}

function memeReducer(state = {
  pending: false,
  currentIndex: 0,
  memes,
  myMemes,
  recentMemes,
  favoriteMemes,
  userPageMemes,
  singleMeme
}, action) {
  switch (action.type) {
    case "CLEAR_ALL_MEMES":
      return {
        ...state,
        memes: {},
        myMemes: {},
        recentMemes: {},
        favoriteMemes: {},
        userPageMemes: {},
        singleMeme: {}
      }
    case "SINGLE_MEME_RECEIVED":
      return {
        ...state,
        singleMeme: action.memes
      }
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
      userPageMemes = {...deleteMeme(state.userPageMemes, action.meme)}
      singleMeme = {...deleteMeme(state.singleMeme, action.meme)}

      return {
        ...state,
        memes,
        myMemes,
        recentMemes,
        favoriteMemes,
        userPageMemes,
        singleMeme
      }
    case "TOGGLE_FAVORITE":
      memes = {...toggleFavorite(state.memes, action.meme, action.updatedMeme)}
      myMemes = {...toggleFavorite(state.myMemes, action.meme, action.updatedMeme)}
      recentMemes = {...toggleFavorite(state.recentMemes, action.meme, action.updatedMeme)}
      favoriteMemes = {...toggleFavorite(state.favoriteMemes, action.meme, action.updatedMeme)}
      userPageMemes = {...toggleFavorite(state.userPageMemes, action.meme, action.updatedMeme)}
      singleMeme = {...toggleFavorite(state.singleMeme, action.meme, action.updatedMeme)}

      return {
        ...state,
        memes,
        myMemes,
        recentMemes,
        favoriteMemes,
        userPageMemes,
        singleMeme
      }
    case "UPDATED_MEME":
      memes = {...updateMeme(state.memes, action.updatedMeme)}
      myMemes = {...updateMeme(state.myMemes, action.updatedMeme)}
      recentMemes = {...updateMeme(state.recentMemes, action.updatedMeme)}
      favoriteMemes = {...updateMeme(state.favoriteMemes, action.updatedMeme)}
      userPageMemes = {...updateMeme(state.userPageMemes, action.updatedMeme)}
      singleMeme = {...updateMeme(state.singleMeme, action.updatedMeme)}

      return {
        ...state,
        memes,
        myMemes,
        recentMemes,
        favoriteMemes,
        userPageMemes,
        singleMeme
      }
    case "CHANGE_CURRENT_INDEX":
      return {
        ...state,
        currentIndex: action.index
      }
    case "CHANGED_USER_PAGE":
      return {
        ...state,
        userPageMemes: action.memes,
        userPageUser: action.user
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

function updateMeme(memeCollection, meme) {
  memeCollection[meme._id] = {
    ...meme
  }

  return memeCollection
}

export default memeReducer