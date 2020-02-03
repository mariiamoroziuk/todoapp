import { combineReducers } from 'redux'
import tasks from './tasks'
import modal from './modal'

export default combineReducers({
    tasks,
    modal
})