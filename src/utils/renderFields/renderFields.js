import TextInput from '../../components/UI/TextInput/TextInput'
import PasswordInput from '../../components/UI/PasswordInput/PasswordInput'
import { Field } from 'react-final-form'
import { composeValidators } from '../../utils/validators/validators'

export function renderTextFields(fields) {
  return fields.map((field, index) => {
    return (
      <Field
        key={field.name + index}
        name={field.name}
        validate={composeValidators(...field.validators)}
      >
        {({ input, meta }) => (
          <div className="wrapper">
            <TextInput
              placeholder={field.placeholder}
              type={field.type}
              label={field.label}
              inputInfo={input}
              meta={meta}
            />
          </div>
        )}
      </Field>
    )
  })
}

export function renderPasswordFields(fields) {
  return fields.map((field, index) => (
    <Field
      key={field.name + index}
      name={field.name}
      validate={composeValidators(...field.validators)}
    >
      {({ input, meta }) => (
        <div className="wrapper">
          <PasswordInput
            placeholder={field.placeholder}
            label={field.label}
            inputInfo={input}
            meta={meta}
          />
        </div>
      )}
    </Field>
  ))
}
