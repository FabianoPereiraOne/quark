import { Switch } from 'react-router-dom'
import Route from './router.js'

// ==> Pages
import SignIn from '../Pages/SignIn/index.js'
import SignUp from '../Pages/SignUp/index.js'
import Dashboard from '../Pages/Dashboard/index.js'

function Router(){

    return(
        <Switch>
            <Route exact path="/" component={ SignIn }/>
            <Route exact path="/register" component={ SignUp }/>
            <Route exact path="/dashboard" component={ Dashboard } isPrivate/>
        </Switch>
    )
}

export default Router