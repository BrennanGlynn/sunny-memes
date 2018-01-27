export function attemptFacebookAuth() {
  return (dispatch, getState) => {
    if (!getState().auth.loggedIn) {
      dispatch(attemptLogin)
      return fetch('/auth/me', {credentials: 'include'})
        .then(
          res => res.json(),
          error => console.log(error)
        ).then(json => {
            dispatch(authReceived(json))
          }
        )
    }
  }
}

export const attemptFavorite = (memeId) => {
  return (dispatch, getState) => {
    if (getState().auth.loggedIn) {
      return fetch('memes/favorite', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          meme: memeId
        })})
        .then(
          res => res.json(),
          error => console.log(error)
        ).then(json => {
          dispatch(toggleFavorite(json))
        })
    }
  }
}

export const toggleFavorite = (json) => {
  console.log(json)
  return {
    type: 'TOGGLE_FAVORITE',
    meme: json.meme,
    user: json.id,
    isFavorite: json.isFavorite
  }
}

export const attemptLogin = {
  type: 'ATTEMPT_LOGIN'
}

export const authReceived = (json) => {
  return {
    type: 'AUTH_RECEIVED',
    user: {
      id: json.id,
      name: json.name,
      picture: json.picture,
    },
    loggedIn: json.loggedIn
  }
}

export const attemptLogout = () => {
  return (dispatch, getState) => {
    if (getState().auth.loggedIn) {
      return fetch('/auth/logout', {credentials: 'include'})
        .then(
          res => res.json(),
          error => console.log(error)
        ).then(json => {
          dispatch(logout)
        })
    }
  }
}

export const logout = {
  type: 'LOGOUT'
}

export const getMyMemes = (query) => {
  return dispatch => {
    return fetch(query, {credentials: 'include'})
      .then(
        res => res.json(),
        error => console.log(error)
      ).then(json => {
        if (json) dispatch(myMemesReceived(json.documents))
      })
  }
}

export const getMemes = (query) => {
  return dispatch => {
    return fetch(query, {credentials: 'include'})
      .then(
        res => res.json(),
        error => console.log(error)
      ).then(json => {
        if (json) dispatch(memesReceived(json.documents))
      })
  }
}

export const myMemesReceived = (memes) => {
  return {
    type: 'MY_MEMES_RECEIVED',
    memes
  }
}

export const memesReceived = (memes) => {
  return {
    type: 'MEMES_RECEIVED',
    memes
  }
}


