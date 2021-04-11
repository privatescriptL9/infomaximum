import { PROCESS_LIST_SUCCESS } from './actionsTypes'

export function parseProcessList(payload) {
  return {
    type: PROCESS_LIST_SUCCESS,
    payload
  }
}
