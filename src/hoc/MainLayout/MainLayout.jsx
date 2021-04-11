import './MainLayout.scss'
import logo from '../../img/logo.png'

const MainLayout = props => {
  return (
    <div className="MainLayout">
      <div className="wrap">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="form">{props.children}</div>
      </div>
    </div>
  )
}

export default MainLayout
