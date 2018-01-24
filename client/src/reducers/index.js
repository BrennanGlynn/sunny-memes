import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import reddit from './redditReducer'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  reddit
})

export default todoApp