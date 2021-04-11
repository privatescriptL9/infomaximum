import { PROCESS_LIST_SUCCESS } from '../actions/actionsTypes'

const initialState = {
  processList: []
}

export default function processReducer(state = initialState, action) {
  switch (action.type) {
    case PROCESS_LIST_SUCCESS:
      return {
        ...state,
        processList: action.payload
      }
    default:
      return state
  }
}
