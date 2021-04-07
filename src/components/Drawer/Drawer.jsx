import classes from './Drawer.module.scss'
import { NavLink } from 'react-router-dom'
import Backdrop from '../UI/Backdrop/Backdrop'
import diagramIcon from '../../img/diagramIcon.png'
import userIcon from '../../img/userIcon.png'
import proceset from '../../img/proceset.png'

function renderLinks(links) {
  return links.map((link, index) => {
    return (
      <li key={index}>
        <img src={link.icon} alt="icon" />
        <NavLink
          to={link.to}
          activeClassName={link.activeClassName}
          onClick={link.onClick}
        >
          {link.lable}
        </NavLink>
      </li>
    )
  })
}

const Drawer = props => {
  const cls = [classes.Drawer]

  if (!props.isOpen) {
    cls.push(classes.close)
  }

  const clickHandler = () => {
    props.onClose()
  }

  const links = [
    {
      to: '/profile',
      activeClassName: classes.active,
      onClick: clickHandler,
      lable: 'Username',
      icon: userIcon
    },
    {
      to: '/process',
      activeClassName: classes.active,
      onClick: clickHandler,
      lable: 'Список процессов',
      icon: diagramIcon
    }
  ]

  return (
    <>
      <nav className={cls.join(' ')}>
        <div className={classes.drawerMenu}>
          <div onClick={clickHandler}>
            <svg
              
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0H4V4H0V0ZM6 6H10V10H6V6ZM10 0H6V4H10V0ZM12 0H16V4H12V0ZM4 6H0V10H4V6ZM12 6H16V10H12V6ZM4 12H0V16H4V12ZM6 12H10V16H6V12ZM16 12H12V16H16V12Z"
                fill="#FFFFFF"
              ></path>
            </svg>
            <img src={proceset} alt="proceset"/>
          </div>
        </div>
        <ul>{renderLinks(links)}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </>
  )
}

export default Drawer
