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

export const attemptLogin = {
  type: 'ATTEMPT_LOGIN'
}

export const authReceived = (json) => {
  return {
    type: 'AUTH_RECEIVED',
    user: {
      id: json.id,
      name: json.name,
      picture: json.picture
    }
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
        dispatch(myMemesReceived(json.documents))
      })
  }
}

export const getMemes = (query) => {
  return dispatch => {
    return fetch(query)
      .then(
        res => res.json(),
        error => console.log(error)
      ).then(json => {
        dispatch(memesReceived(json.documents))
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


