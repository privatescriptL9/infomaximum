import '../StyleInput.scss'

const TextInput = ({ placeholder, disabled, label, style }) => {
  const htmlFor = `${label}-${Math.random()}`

  return (
    <>
      {label ? <label htmlFor={htmlFor}>{label}</label> : null}
      <div className="Input" style={style}>
        <input id={htmlFor} type="text" placeholder={placeholder} disabled={disabled} />
      </div>
    </>
  )
}

export default TextInput
