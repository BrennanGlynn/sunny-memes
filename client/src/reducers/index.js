import {combineReducers} from 'redux'
import auth from './auth'
import memes from './memes'

const sunnyApp = combineReducers({
  auth,
  memes
})

export default sunnyApp