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
            dispatch(authReceived(json))
          },
        )
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

//==========================================================================================================Meme actions
//============================================================================requesting memes
export const getMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, query, memesReceived)
  }
}

export const getMyMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, query, myMemesReceived)
  }
}

export const getRecentMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, query, recentMemesReceived)
  }
}

export const getFavoriteMemes = (query) => {
  return dispatch => {
    return memeRequest(dispatch, query, favoriteMemesReceived);
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
    memes
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
    dispatch(getMyMemes("memes/mine"))
    dispatch(getRecentMemes("memes/recent"))
  }
}


//======================================================================================================Helper functions
function memeRequest(dispatch, query, receivedAction) {
  fetch(query, {credentials: "include"})
    .then(
      res => res.json(),
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


