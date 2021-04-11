import './AccountForm.scss'
import { Form } from 'react-final-form'
import { isEmail, minLength, required } from '../../utils/validators/validators'
import Button from '../UI/Button/Button'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_USER } from '../../graphQL/mutations/user'
import { CURRENT_USER } from '../../graphQL/query/user'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUser, fetchFullName } from '../../store/actions/user'
import {
  renderPasswordFields,
  renderTextFields
} from '../../utils/renderFields/renderFields'

const AccountForm = props => {
  const { data } = useQuery(CURRENT_USER)
  const [editUser] = useMutation(EDIT_USER)

  const [error, setError] = useState(null)
  const [textButton, setTextButton] = useState('Сохранить')

  const textInputs = [
    {
      name: 'name',
      validators: [required],
      placeholder: 'Не задано',
      label: 'Имя',
      type: 'text'
    },
    {
      name: 'lastName',
      validators: [required],
      placeholder: 'Не задано',
      label: 'Фамилия',
      type: 'text'
    },
    {
      name: 'email',
      validators: [required, isEmail],
      placeholder: 'Не задано',
      label: 'Электронная почта',
      type: 'email'
    }
  ]

  const passwordInputs = [
    {
      name: 'password',
      validators: [minLength],
      label: 'Новый пароль',
      placeholder: 'Не задано'
    },
    {
      name: 'confirmPassword',
      validators: [],
      label: 'Повторите пароль',
      placeholder: 'Не задано'
    }
  ]

  useEffect(() => {
    if (data) {
      props.fetchCurrentUser(data.currentUser.id)
      props.fetchFullName([
        data.currentUser.firstName,
        data.currentUser.secondName
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <Form
        onSubmit={values => {
          editUser({
            variables: {
              id: props.currentUser,
              firstName: values.name,
              secondName: values.lastName,
              email: values.email,
              password: values.password
            }
          })
            .then(({ data }) => {
              props.fetchFullName([
                data.editUser.firstName,
                data.editUser.secondName
              ])
              setTextButton('Сохранено')
            })
            .catch(error => {
              setError(`Призошла ошибка: ${error}`)
            })
          setTimeout(() => {
            setTextButton('Сохранить')
          }, 3000)
          values.password = ''
          values.confirmPassword = ''
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
              <h1>
                {props.firstName} {props.secondName}. Редактирование
              </h1>
              <Button disabled={pristine || submitting || !valid}>
                {textButton}
              </Button>
            </div>
            <div className="card-body">
              {renderTextFields(textInputs)}
              {renderPasswordFields(passwordInputs)}
            </div>
          </form>
        )}
      </Form>
      {error ? <span style={{ color: 'red' }}>{error}</span> : null}
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    firstName: state.user.firstName,
    secondName: state.user.secondName,
    error: state.user.error,
    textButton: state.user.textButton
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: id => dispatch(fetchCurrentUser(id)),
    fetchFullName: fullName => dispatch(fetchFullName(fullName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm)
