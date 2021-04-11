import { Link } from 'react-router-dom'
import './Reg.scss'
import Button from '../../components/UI/Button/Button'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'
import { Form } from 'react-final-form'
import { isEmail, minLength, required } from '../../utils/validators/validators'
import { useMutation } from '@apollo/client'
import { SIGN_UP } from '../../graphQL/mutations/user'
import { useState } from 'react'
import {
  renderPasswordFields,
  renderTextFields
} from '../../utils/renderFields/renderFields'

export const Reg = () => {
  const [statusError, setStatusError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [signup] = useMutation(SIGN_UP)

  const textInputs = [
    {
      name: 'name',
      validators: [required],
      placeholder: 'Имя',
      type: 'text'
    },
    {
      name: 'lastName',
      validators: [required],
      placeholder: 'Фамилия',
      type: 'text'
    },
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
    },
    {
      name: 'confirmPassword',
      validators: [required],
      placeholder: 'Повторите пароль'
    }
  ]

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
              sessionStorage.setItem('token', data.signup)
              window.location.reload()
            })
            .catch(error => {
              setErrorMessage(error.message)
              setStatusError(true)
              Object.keys(values).forEach(key => {
                values[key] = null
              })
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
            {renderTextFields(textInputs)}
            {renderPasswordFields(passwordInputs)}
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
