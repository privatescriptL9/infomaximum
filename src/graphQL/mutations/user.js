import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation signup(
    $firstName: String!
    $secondName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      secondName: $secondName
      email: $email
      password: $password
    )
  }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        secondName
        email
      }
    }
  }
`

export const EDIT_USER = gql`
  mutation editUser(
    $id: Int!
    $email: String!
    $firstName: String!
    $secondName: String!
    $password: String
  ) {
    editUser(
      id: $id
      email: $email
      firstName: $firstName
      secondName: $secondName
      password: $password
    ) {
      firstName
      secondName
    }
  }
`
