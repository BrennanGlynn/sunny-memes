function authReducer(state = {
  loggedIn: false,
  user: {},
  pending: false

}, action) {
  switch (action.type) {
    case 'ATTEMPT_LOGIN':
      return Object.assign({}, state, {
        pending: true
      })
    case 'AUTH_RECEIVED':
      return action.loggedIn ?
        Object.assign({}, state, {
          user: {
            id: action.user.id,
            name: action.user.name,
            picture: action.user.picture,
            admin: action.user.admin
          },
          loggedIn: true,
          pending: false
        })
        : Object.assign({}, state, {
          pending: false,
          user: {},
          loggedIn: false
        })
    case 'LOGOUT':
      return Object.assign({}, state, {
        loggedIn: false,
        user: {}
      })
    default:
      return state
  }
}

export default authReducer