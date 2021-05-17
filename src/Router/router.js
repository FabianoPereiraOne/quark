import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { UserAuth } from '../Contexts/user'

function Routes({
    component: Component,
    isPrivate,
    ...rest
}){

    const { signed, loading } = useContext(UserAuth)

    if(loading){
        return(
            <div></div>
        )
    }

    if(isPrivate && !signed){
        return <Redirect to="/"/>
    }

    if(!isPrivate && signed){
        return <Redirect to="/dashboard"/>
    }


    return (
        <Route { ...rest } render= { props => (
            <Component { ...props }/>
        )} />
    )
}


export default Routes