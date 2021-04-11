import moment from 'moment'

moment.locale('ru')

export const milisecondsToTime = time => {
  const tempTime = moment.duration(+time)
  return `
    ${tempTime.hours() === 0 ? '' : `${tempTime.hours()} ч`} 
    ${tempTime.minutes() === 0 ? '' : `${tempTime.minutes()} мин`}
  `
}

export const milisecondsToAverageActiveTime = (
  averageActiveTime,
  averageLeadTime
) => {
  return `${milisecondsToTime(averageActiveTime)} (${(
    (averageActiveTime / averageLeadTime) *
    100
  )
    .toFixed(1)
    .replace('.', ',')}%)`
}

export const milisecondsToDate = miliseconds => {
  return moment(miliseconds * 1000)
    .format('DD MMMM YYYY')
    .replace('January', 'января')
    .replace('February', 'февраля')
    .replace('March', 'марта')
    .replace('April', 'апреля')
    .replace('May', 'мая')
    .replace('June', 'июня')
    .replace('July', 'июля')
    .replace('August', 'августа')
    .replace('September', 'сентября')
    .replace('October', 'октября')
    .replace('November', 'ноября')
    .replace('December', 'декабря')
}

export const prettifyNumberOfExecutions = numberOfExecutions => {
  const separator = ' '
  return numberOfExecutions
    .toString()
    .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + separator)
}
