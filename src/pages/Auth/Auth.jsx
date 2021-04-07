import { Link } from 'react-router-dom'
import './Auth.scss'
import TextInput from '../../components/UI/TextInput/TextInput'
import PasswordInput from '../../components/UI/PasswordInput/PasswordInput'
import Button from '../../components/UI/Button/Button'

export const Auth = () => {

  const clickHandler = event => {
    event.preventDefault()
  }

  return (
    <div className="Auth">

      <TextInput placeholder="Электронная почта"/>

      <PasswordInput placeholder="Пароль"/>
    
      <Button style={{marginTop: 15}} onClick={clickHandler}>Войти в систему</Button> 

      <Link to="/reg">
        Зарегистрироваться
      </Link>

    </div>
  )
}


export default Auth
