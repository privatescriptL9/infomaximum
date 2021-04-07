import './Button.scss'

const Button = ({onClick, disabled, style, children}) => {
  return (
    <button
      onClick={onClick}
      className="Button"
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
