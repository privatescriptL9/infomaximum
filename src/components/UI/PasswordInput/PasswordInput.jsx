import '../StyleInput.scss'
import './PasswordInput.scss'
import eyeVisible from '../../../img/eyeVisible.png'
import eyeInvizible from '../../../img/eyeInvizible.png'
import { useState } from 'react'

const PasswordInput = ({ placeholder, disabled, label, style }) => {
  const [type, setType] = useState('password')
  const [eyeType, setEyeType] = useState(eyeInvizible)

  const eyeChangeHandler = () => {
    if (type === 'password') {
      setType('text')
      setEyeType(eyeVisible)
    } else {
      setType('password')
      setEyeType(eyeInvizible)
    }
  }

  const htmlFor = `${label}-${Math.random()}`

  return (
    <>
      {label ? <label htmlFor={htmlFor}>{label}</label> : null}
      <div className="Input PasswordInput" style={style}>
        <input
          id={htmlFor}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
        />
        <img onClick={eyeChangeHandler} src={eyeType} alt="passwordEye" />
      </div>
    </>
  )
}

export default PasswordInput
