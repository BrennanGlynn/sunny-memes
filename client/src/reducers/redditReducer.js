import { combineReducers } from 'redux'
import {
  selectSubreddit,
  invalidateSubreddit,
  requestPosts,
  receivePosts
} from '../actions'

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case selectSubreddit:
      return action.subreddit
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case invalidateSubreddit:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case requestPosts:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case receivePosts:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case invalidateSubreddit:
    case receivePosts:
    case requestPosts:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer