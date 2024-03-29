//===============================================================================================Authentication actions
export function attemptFacebookAuth() {
  return (dispatch, getState) => {
    if (!getState().auth.loggedIn) {
      dispatch(attemptLogin)
      return fetch("/auth/me", {credentials: "include"})
        .then(
          res => res.json(),
          error => console.log(error),
        ).then(json => {
          if (json.loggedIn) dispatch(fetchAllMemes(""))
          dispatch(authReceived(json))
        })
    }
  }
}

export const attemptLogin = {
  type: "ATTEMPT_LOGIN",
}

export const authReceived = (json) => {
  return {
    type: "AUTH_RECEIVED",
    user: {
      id: json.id,
      name: json.name,
      picture: json.picture,
      admin: json.admin,
    },
    loggedIn: json.loggedIn,
  }
}

export const attemptLogout = () => {
  return (dispatch, getState) => {
    if (getState().auth.loggedIn) {
      return fetch("/auth/logout", {credentials: "include"})
        .then(
          res => res.json(),
          error => console.log(error),
        ).then(json => {
          dispatch(logout)
        })
    }
  }
}

export const logout = {
  type: "LOGOUT",
}

//========================================================================================================Filter actions
export const toggleCharacter = (character) => {
  return (dispatch, getState) => {
    let characters = getState().filter.characters;
    const charIndex = characters.indexOf(character);
    if (charIndex === -1) {
      characters.push(character)
    } else {
      characters.splice(charIndex, 1)
    }
    dispatch(updateFilter(characters))
  }
}

export const removeFilter = () => {
  return dispatch => {
    dispatch(updateFilter([]))
  }
}

export const updateFilter = (characterArray) => {
  return dispatch => {
    dispatch(updatedFilter(characterArray))
    dispatch(fetchAllMemes())
  }
}

export const updatedFilter = (characterArray) => {
  return {
    type: "UPDATED_FILTER",
    filter: characterArray
  }
}

//==========================================================================================================Meme actions
export const changeCurrentIndex = (index) => {
  return {
    type: "CHANGE_CURRENT_INDEX",
    index
  }
}

export const uploadedMemes = () => {
  return dispatch => {
    dispatch(getMyMemes())
    dispatch(getRecentMemes())
  }
}
//============================================================================requesting memes
export const fetchAllMemes = () => {
  return (dispatch, getState) => {
    dispatch(getMemes())
    dispatch(getRecentMemes())

    if (getState().auth.loggedIn) {
      dispatch(getMyMemes())
      dispatch(getFavoriteMemes())
    }
  }
}

export const getMemes = () => {
  return (dispatch, getState) => {
    let query = getQuery(getState)
    return memeRequest(dispatch, query, memesReceived)
  }
}

export const getMyMemes = () => {
  return (dispatch, getState) => {
    let query = getQuery(getState)
    return memeRequest(dispatch, `user/${getState().auth.user.id}${query}`, myMemesReceived)
  }
}

export const getRecentMemes = (query) => {
  return (dispatch, getState) => {
    let query = getQuery(getState)
    return memeRequest(dispatch, 'recent' + query, recentMemesReceived)
  }
}

export const getFavoriteMemes = (query) => {
  return (dispatch, getState) => {
    let query = getQuery(getState)
    return memeRequest(dispatch, 'favorites' + query, favoriteMemesReceived);
  }
}

export const getUserPage = (userId) => {
  return dispatch => {
    return memeRequest(dispatch, `/user/${userId}`, changedUserPage)
  }
}

export const getSingleMeme = (memeId) => {
  return (dispatch, getState) => {
    let query = getQuery(getState)
    return memeRequest(dispatch, `${memeId}${query}`, singleMemeReceived);
  }
}

export const memesReceived = (memes) => {
  return {
    type: "MEMES_RECEIVED",
    memes,
  }
}

export const myMemesReceived = (memes) => {
  return {
    type: "MY_MEMES_RECEIVED",
    memes,
  }
}

export const recentMemesReceived = (memes) => {
  return {
    type: "RECENT_MEMES_RECEIVED",
    memes,
  }
}

export const favoriteMemesReceived = (memes) => {
  return {
    type: "FAVORITE_MEMES_RECEIVED",
    memes,
  }
}

export const singleMemeReceived = (memes) => {
  return {
    type: "SINGLE_MEME_RECEIVED",
    memes,
  }
}

export const changedUserPage = (memes, user) => {
  return {
    type: 'CHANGED_USER_PAGE',
    memes,
    user
  }
}

export const clearAllMemes = () => {
  return {
    type: "CLEAR_ALL_MEMES"
  }
}

//=================================================================================Favorite actions

export const attemptFavorite = (memeId) => {
  return (dispatch, getState) => {
    if (getState().auth.loggedIn) {
      return fetch("/memes/favorite", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        credentials: "include",
        body: JSON.stringify({
          meme: memeId,
        }),
      })
        .then(
          res => res.json(),
          error => console.log(error),
        ).then(json => {
          dispatch(getFavoriteMemes())
          dispatch(toggleFavorite(json))
        })
    }
  }
}

export const toggleFavorite = (json) => {
  return {
    type: "TOGGLE_FAVORITE",
    meme: json.meme,
    updatedMeme: json.updatedMeme,
  }
}


//=================================================================================Delete Actions
export const attemptDelete = (memeId) => {
  return (dispatch, getState) => {
    return fetch("/memes/" + memeId, {
      credentials: "include",
      method: "delete",
    }).then(response => {
      return response.json()
    }).then(json =>
      dispatch(memeDeleted(memeId)),
    )
  }
}

export const memeDeleted = (memeId) => {
  return {
    type: "MEME_DELETED",
    meme: memeId,
  }
}

//=======================================================================================================Comment Actions
export const updatedComments = (memeId) => {
  return dispatch => {
    fetch('/memes/' + memeId)
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(json => {
        dispatch(updatedMemeReceived(json.documents[0]))
      })
      .catch(err => {
        console.log('error', err)
      })
  }
}

export const updatedMemeReceived = (meme) => {
  return {
    type: "UPDATED_MEME",
    updatedMeme: meme
  }
}

export const likeComment = (commentId) => {
  return dispatch => {
    fetch(`/comments/like/${commentId}`, {
      method: "put",
      credentials: "include",
    }).then(
      res => {
        if (res.ok) return res.json()
      },
      error => console.log(error)
    ).then(json => {
      if (json) dispatch(updatedComments(json.updatedObject.meme_id))
    })
  }
}


//======================================================================================================Helper functions
function memeRequest(dispatch, query, receivedAction) {
  fetch('/memes/' + query, {credentials: "include"})
    .then(
      res => {
        if (res.ok) return res.json()
      },
      error => console.log("error making request"),
    ).then(json => {
    let memes = {}
    let requestedUser = {}
    if (json) {
      json.documents.forEach(meme => {
        memes[meme._id] = meme
      })
      requestedUser = json.user
    }

    return dispatch(receivedAction(memes, requestedUser))
  })
}

function getQuery(getState) {
  let characters = getState().filter.characters.slice()
  let query = characters.length >= 1 ? '?' : ''
  characters.forEach((char, index) => {
    query += 'chars=' + char
    if (index + 1 < characters.length) query += '&'
  })
  return query
}
