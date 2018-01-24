let nextTodoId = 0

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const selectSubreddit = (subreddit) => {
  return {
    type: 'SELECT_SUBREDDIT',
    subreddit
  }
}

export const invalidateSubreddit = (subreddit) => {
  return {
    type: 'INVALIDATE_SUBREDDIT',
    subreddit
  }
}

export const requestPosts = (subreddit) => {
  return {
    type: 'REQUEST_POSTS',
    subreddit
  }
}

export const receivePosts = (subreddit, json) => {
  return {
    type: 'RECEIVE_POSTS',
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPosts(subreddit) {
  return function (dispatch) {
    dispatch(requestPosts(subreddit))

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        res => res.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        error => console.log('An error ocurred.', error)
      ).then(json =>
        dispatch(receivePosts(subreddit, json))
      )
  }
}

export function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}