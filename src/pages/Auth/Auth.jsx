import { Link } from 'react-router-dom'
import './Auth.scss'
import Button from '../../components/UI/Button/Button'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'
import { Form } from 'react-final-form'
import { isEmail, minLength, required } from '../../utils/validators/validators'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../graphQL/mutations/user'
import { useState } from 'react'
import {
  renderPasswordFields,
  renderTextFields
} from '../../utils/renderFields/renderFields'

export const Auth = () => {
  const [statusError, setStatusError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [login] = useMutation(LOGIN)

  const textInputs = [
    {
      name: 'email',
      validators: [required, isEmail],
      placeholder: 'Электронная почта',
      type: 'email'
    }
  ]

  const passwordInputs = [
    {
      name: 'password',
      validators: [required, minLength],
      placeholder: 'Пароль'
    }
  ]

  return (
    <>
      <Form
        onSubmit={values => {
          login({
            variables: {
              email: values.email,
              password: values.password
            }
          })
            .then(({ data }) => {
              sessionStorage.setItem('token', data.login.token)
              window.location.reload()
            })
            .catch(error => {
              setErrorMessage(error.message)
              setStatusError(true)
              Object.keys(values).forEach(key => {
                values[key] = ''
              })
            })
        }}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form className="Auth" onSubmit={handleSubmit}>
            {renderTextFields(textInputs)}
            {renderPasswordFields(passwordInputs)}
            <Button style={{ marginTop: 10 }}>Войти в систему</Button>
            <Link to="/reg">Зарегистрироваться</Link>
          </form>
        )}
      </Form>
      {statusError ? <ErrorMessage message={errorMessage} /> : null}
    </>
  )
}

export default Auth
