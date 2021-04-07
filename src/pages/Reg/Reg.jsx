import { Link } from 'react-router-dom'
import './Reg.scss'
import Button from '../../components/UI/Button/Button'
import TextInput from '../../components/UI/TextInput/TextInput'
import PasswordInput from '../../components/UI/PasswordInput/PasswordInput'

export const Reg = () => {

  const clickHandler = event => {
    event.preventDefault()
  }

  return (
    <div className="Reg">

      <h2>Регистрация</h2>

      <TextInput placeholder="Имя"/>

      <TextInput placeholder="Фамилия"/>

      <TextInput placeholder="Электронная почта"/>

      <PasswordInput placeholder="Введите пароль"/>

      <PasswordInput placeholder="Повторите пароль"/>
    
      <Button style={{marginTop: 15}} onClick={clickHandler}>Применить и войти</Button> 

      <span>Уже зарегистрированы?<Link to="/"> Вход</Link></span>

    </div>
  )
}

export default Reg
