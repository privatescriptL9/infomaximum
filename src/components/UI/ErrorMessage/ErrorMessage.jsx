import './ErrorMessage.scss'
import error from '../../../img/error.png'

const ErrorMessage = ({ message = 'Сообщение об ошибке' }) => (
  <div className="ErrorMessage">
    <img src={error} alt="error" />
    {message}
  </div>
)

export default ErrorMessage
