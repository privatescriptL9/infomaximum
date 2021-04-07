import './ErrorMessage.scss'
import error from '../../../img/error.png'

export const ErrorMessage = ({ message = 'Сообщение об ошибке' }) => (
  <div className="ErrorMessage">
    <img src={error} alt="error" />
    {message}
  </div>
)
