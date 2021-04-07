import './MainLayout.scss'
import logo from '../../img/logo.png'
import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage'

const MainLayout = props => {
  const serverError = false

  return (
    <div className="MainLayout">
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <form className="form">
          { props.children }
          {serverError ? <ErrorMessage /> : null}
        </form>
        
      </div>
    </div>
  )
}

export default MainLayout
