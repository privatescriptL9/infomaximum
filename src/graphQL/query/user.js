import {gql} from '@apollo/client'

export const ALL_USERS = gql`
  query {
    allUsers {
      id, 
      firstName,
      secondName,
      email
    }
  }
`

// export const USER_BY_ID = gql`
//   query {
//     userById(
//       $id: Int!
//     ) {
//       id, 
//       firstName,
//       secondName,
//       email
//     }
//   }
// `

export const CURRENT_USER = gql`
  query {
    currentUser {
      id,
      firstName,
      secondName
    }
  }
`




