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
//============================================================================requesting memes
export const fetchAllMemes = () => {
  return (dispatch, getState) => {
    let characters = getState().filter.characters.slice()
    let query = characters.length >= 1 ? '?' : ''
    characters.forEach((char, index) => {
      query += 'chars=' + char
      if (index + 1 < characters.length) query += '&'
    })
    dispatch(getMemes(query))
    dispatch(getRecentMemes(query))

    if (getState().auth.loggedIn) {
      dispatch(getMyMemes(query))
      dispatch(getFavoriteMemes(query))
    }
  }
}

export const getMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, query, memesReceived)
  }
}

export const getMyMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, 'mine' + query, myMemesReceived)
  }
}

export const getRecentMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, 'recent' + query, recentMemesReceived)
  }
}

export const getFavoriteMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, 'favorites' + query, favoriteMemesReceived);
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

//=================================================================================Favorite actions

export const attemptFavorite = (memeId) => {
  return (dispatch, getState) => {
    if (getState().auth.loggedIn) {
      return fetch("memes/favorite", {
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
          dispatch(getFavoriteMemes(""))
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

export const uploadedMemes = () => {
  return dispatch => {
    dispatch(getMyMemes(""))
    dispatch(getRecentMemes(""))
  }
}


//======================================================================================================Helper functions
function memeRequest(dispatch, query, receivedAction) {
  fetch('memes/' + query, {credentials: "include"})
    .then(
      res => {
        if (res.ok) return res.json()
      },
      error => console.log(error),
    ).then(json => {
    let memes = {}
    if (json) {
      json.documents.forEach(meme => {
        memes[meme._id] = meme
      })
    }
    dispatch(receivedAction(memes))
  })
}


