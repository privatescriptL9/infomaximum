import { Link } from 'react-router-dom'
import './Reg.scss'
import Button from '../../components/UI/Button/Button'
import TextInput from '../../components/UI/TextInput/TextInput'
import PasswordInput from '../../components/UI/PasswordInput/PasswordInput'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'
import { Form, Field } from 'react-final-form'
import {
  composeValidators,
  isEmail,
  minLength,
  required
} from '../../utils/validators/validators'
import { useMutation } from '@apollo/client'
import { SIGN_UP } from '../../graphQL/mutations/user'
import { useState } from 'react'

export const Reg = () => {
  const [statusError, setStatusError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [signup] = useMutation(SIGN_UP)

  return (
    <>
      <Form
        onSubmit={values => {
          signup({
            variables: {
              firstName: values.name,
              secondName: values.lastName,
              email: values.email,
              password: values.password
            }
          })
            .then(({ data }) => {
              localStorage.setItem('token', data.signup)
            })
            .catch(error => {
              setErrorMessage(error.message)
              setStatusError(true)
            })
          Object.keys(values).forEach(key => {
            values[key] = null
          })
        }}
        validate={values => {
          const error = {}
          if (values.confirmPassword !== values.password) {
            error.confirmPassword = 'Пароли не совпадают'
            return error
          }
        }}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form className="Reg" onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <Field name="name" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <div className="wrapper">
                  <TextInput
                    placeholder="Имя"
                    type="text"
                    inputInfo={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
            <Field name="lastName" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <div className="wrapper">
                  <TextInput
                    placeholder="Фамилия"
                    type="text"
                    inputInfo={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
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
            <Field
              name="confirmPassword"
              validate={composeValidators(required)}
            >
              {({ input, meta }) => (
                <div className="wrapper">
                  <PasswordInput
                    placeholder="Повторите пароль"
                    inputInfo={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
            <Button style={{ margin: '10px 0 18px 0' }}>
              Применить и войти
            </Button>
            <span>
              Уже зарегистрированы?<Link to="/auth"> Вход</Link>
            </span>
          </form>
        )}
      </Form>
      {statusError ? <ErrorMessage message={errorMessage} /> : null}
    </>
  )
}

export default Reg
