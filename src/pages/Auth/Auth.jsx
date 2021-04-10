import { Link } from 'react-router-dom'
import './Auth.scss'
import TextInput from '../../components/UI/TextInput/TextInput'
import PasswordInput from '../../components/UI/PasswordInput/PasswordInput'
import Button from '../../components/UI/Button/Button'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'
import { Form, Field } from 'react-final-form'
import {
  composeValidators,
  isEmail,
  minLength,
  required
} from '../../utils/validators/validators'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../graphQL/mutations/user'
import { useState } from 'react'

export const Auth = () => {
  const [statusError, setStatusError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [login] = useMutation(LOGIN)

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
              localStorage.setItem('token', data.login.token)
            })
            .catch(error => {
              setErrorMessage(error.message)
              setStatusError(true)
            })
          Object.keys(values).forEach(key => {
            values[key] = ''
          })
        }}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form className="Auth" onSubmit={handleSubmit}>
            <Field name="email" validate={composeValidators(required, isEmail)}>
              {({ input, meta }) => (
                <div className="wrapper">
                  <TextInput
                    placeholder="Электронная почта"
                    type="email"
                    inputInfo={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required, minLength)}
            >
              {({ input, meta }) => (
                <div className="wrapper">
                  <PasswordInput
                    placeholder="Пароль"
                    inputInfo={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
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
