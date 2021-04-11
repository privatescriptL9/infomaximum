import PasswordInput from '../UI/PasswordInput/PasswordInput'
import TextInput from '../UI/TextInput/TextInput'
import './AccountForm.scss'
import { Form, Field } from 'react-final-form'
import {
  composeValidators,
  isEmail,
  minLength,
  required
} from '../../utils/validators/validators'
import Button from '../UI/Button/Button'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_USER } from '../../graphQL/mutations/user'
import { CURRENT_USER } from '../../graphQL/query/user'
import { useEffect, useState } from 'react'

const AccountForm = () => {
  const { data } = useQuery(CURRENT_USER)
  const [editUser] = useMutation(EDIT_USER)

  const [currentUser, setCurrentUser] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [secondName, setSecondName] = useState(null)
  const [error, setError] = useState(null)
  const [textButton, setTextButton] = useState('Сохранить')
  
  useEffect(() => {
    if (data) {
      setCurrentUser(data.currentUser.id)
      setFirstName(data.currentUser.firstName)
      setSecondName(data.currentUser.secondName)
    }
  }, [data])

  const textChanger = () => {
    setTextButton('Сохранено')
    setTimeout(() => {
      setTextButton('Сохранить')
    }, 3000)
  }

  return (
    <>
      <Form
        onSubmit={values => {
          editUser({
            variables: {
              id: currentUser,
              firstName: values.name,
              secondName: values.lastName,
              email: values.email,
              password: values.password
            }
          })
            .then(({ data }) => {
              setFirstName(data.editUser.firstName)
              setSecondName(data.editUser.secondName)
            })
            .catch(error => {
              setError(`Призошла ошибка: ${error}`)
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
        {({ handleSubmit, submitting, pristine, valid }) => (
          <form className="AccountForm" onSubmit={handleSubmit}>
            <div className="card-title">
              <h1>{firstName} {secondName}. Редактирование</h1>
              <Button onClick={textChanger} disabled={pristine || submitting || !valid}>{textButton}</Button>
            </div>
            <div className="card-body">
              <Field name="name" validate={composeValidators(required)}>
                {({ input, meta }) => (
                  <div className="wrapper">
                    <TextInput
                      placeholder="Не задано"
                      label="Имя"
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
                      placeholder="Не задано"
                      label="Фамилия"
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
                      placeholder="Не задано"
                      label="Электронная почта"
                      type="email"
                      inputInfo={input}
                      meta={meta}
                    />
                  </div>
                )}
              </Field>
              <Field
                name="password"
                validate={composeValidators(minLength)}
              >
                {({ input, meta }) => (
                  <div className="wrapper">
                    <PasswordInput
                      placeholder="Не задано"
                      label="Новый пароль"
                      inputInfo={input}
                      meta={meta}
                    />
                  </div>
                )}
              </Field>
              <Field
                name="confirmPassword"
                validate={composeValidators()}
              >
                {({ input, meta }) => (
                  <div className="wrapper">
                    <PasswordInput
                      placeholder="Не задано"
                      label="Повторите пароль"
                      inputInfo={input}
                      meta={meta}
                    />
                  </div>
                )}
              </Field>
            </div>
          </form>
        )}
      </Form>
      <span style={{color: 'red', textAlign: 'center'}}>{error}</span> 
    </>
  )
}

export default AccountForm
