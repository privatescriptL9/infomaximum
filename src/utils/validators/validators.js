import is from 'is_js'

export function required(value) {
  if (!value) {
    return 'Произошла ошибка. Поле должно быть заполнено'
  }
}

export function isEmail(value) {
  if (!is.email(value)) {
    return 'Поле не соответствует типу E-mail'
  }
}

export function minLength(value) {
  if (value) {
    if (value.length < 6) {
      return 'Минимальная длинна пароля 6 символов'
    }
  }
}

export function composeValidators(...validators) {
  return function (value) {
    return validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    )
  }
}
