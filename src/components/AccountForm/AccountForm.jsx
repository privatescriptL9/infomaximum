import PasswordInput from '../UI/PasswordInput/PasswordInput'
import TextInput from '../UI/TextInput/TextInput'
import './AccountForm.scss'

const AccountForm = () => {
  return (
    <form className="AccountForm">
      <div>
        <TextInput placeholder="Имя" label="Имя" />
      </div>

      <div>
        <TextInput placeholder="Фамилия" label="Фамилия" />
      </div>

      <div>
        <TextInput placeholder="Электронная почта" label="Электронная почта" />
      </div>

      <div>
        <PasswordInput placeholder="Введите пароль" label="Новый пароль" />
      </div>

      <div>
        <PasswordInput
          placeholder="Повторите пароль"
          label="Повторите пароль"
        />
      </div>
    </form>
  )
}

export default AccountForm
