import classes from './Button.module.scss'

const Button = ({ onClick, disabled, style, children }) => {
  return (
    <button
      onClick={onClick}
      className={classes.Button}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
