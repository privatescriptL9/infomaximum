import { Route, Switch, Redirect } from 'react-router-dom'
import MainLayout from './hoc/MainLayout/MainLayout'
import HomeLayout from './hoc/HomeLayout/HomeLayout'
import Process from './pages/Process/Process'
import Profile from './pages/Profile/Profile'
import Auth from './pages/Auth/Auth'
import Reg from './pages/Reg/Reg'

function App() {
  const token = sessionStorage.getItem('token')
  let routing

  if (token) {
    routing = (
      <HomeLayout>
        <Switch>
          <Route path="/process" component={Process} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/process" />
        </Switch>
      </HomeLayout>
    )
  } else {
    routing = (
      <MainLayout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/reg" component={Reg} />
          <Redirect to="/auth" />
        </Switch>
      </MainLayout>
    )
  }

  return routing
}

export default App
