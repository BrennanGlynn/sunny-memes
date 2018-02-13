import {combineReducers} from 'redux'
import auth from './auth'
import memes from './memes'
import filter from './filter'

const sunnyApp = combineReducers({
  auth,
  memes,
  filter
})

export default sunnyApp