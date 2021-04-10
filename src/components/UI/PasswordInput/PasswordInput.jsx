import classes from '../StyleInput.module.scss'
import './PasswordInput.scss'
import eyeVisible from '../../../img/eyeVisible.png'
import eyeInvizible from '../../../img/eyeInvizible.png'
import { useState } from 'react'

const PasswordInput = ({
  placeholder,
  disabled,
  label,
  inputInfo,
  meta
}) => {
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
  const cls = [classes.Input, 'PasswordInput']

  const hasError = meta.touched && meta.error

  if (hasError) {
    cls.push(classes.error)
  }

  return (
    <>
      {label ? <label htmlFor={htmlFor}>{label}</label> : null}
      <div className="passwordInput__wrapper">
        <div className={cls.join(' ')}>
          <input
            id={htmlFor}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...inputInfo}
          />
          <img onClick={eyeChangeHandler} src={eyeType} alt="passwordEye" />
        </div>
        {(meta.error || meta.submitError) && meta.touched && (
          <span className="error">{meta.error || meta.submitError}</span>
        )}
      </div>
    </>
  )
}

export default PasswordInput
