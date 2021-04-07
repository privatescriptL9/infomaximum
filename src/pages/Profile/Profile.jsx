import './Profile.scss'
import Button from '../../components/UI/Button/Button'
import AccountForm from '../../components/AccountForm/AccountForm'

const Profile = () => {
  return (
    <div className="Profile">
      <div className="Profile-card">
        <div className="card-title">
          <h1>Борис Годунов. Редактирование</h1>
          <Button>Сохранить</Button>
        </div>
        <div className="card-body">
          <AccountForm />
        </div>
      </div>
    </div>
  )
}

export default Profile
