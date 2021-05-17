import { useContext } from 'react'
import Header from '../../Components/Header'
import { UserAuth } from '../../Contexts/user'
import './dashboard.css'

function Dashboard(){

    const { signOut } = useContext(UserAuth)

    return(
        <div className="contentDash">
            <Header/>
        </div>
    )
}


export default Dashboard