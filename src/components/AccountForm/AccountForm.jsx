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
import { useMutation } from '@apollo/client'
import { EDIT_USER } from '../../graphQL/mutations/user'

const AccountForm = () => {

  const [editUser] = useMutation(EDIT_USER)

  return (
    <Form
      onSubmit={values => {
        editUser({
            variables: {
              id: 1,
              firstName: values.name,
              secondName: values.lastName,
              email: values.email,
              password: values.password
            }
          })
            .then(({ data }) => {
              console.log(data)
            })
            .catch(error => {
              console.log(JSON.stringify(error, null, 2))
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
        <form className="AccountForm" onSubmit={handleSubmit}>
          <div className="card-title">
            <h1>Борис Годунов. Редактирование</h1>
            <Button>Сохранить</Button>
          </div>
          <div className="card-body">
            <Field name="name" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <div className="wrapper">
                  <TextInput
                    placeholder="Имя"
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
                    placeholder="Фамилия"
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
                    placeholder="Электронная почта"
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
              validate={composeValidators(required, minLength)}
            >
              {({ input, meta }) => (
                <div className="wrapper">
                  <PasswordInput
                    placeholder="Пароль"
                    label="Новый пароль"
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
  )
}

export default AccountForm
