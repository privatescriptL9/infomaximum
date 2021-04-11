import { FETCH_CURRENT_USER, FETCH_FULL_NAME } from './actionsTypes'

export function fetchCurrentUser(id) {
  return {
    type: FETCH_CURRENT_USER,
    payload: id
  }
}

export function fetchFullName(fullName) {
  return {
    type: FETCH_FULL_NAME,
    payload: fullName
  }
}
