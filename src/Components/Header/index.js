import { FiUsers, FiSettings, FiHome } from 'react-icons/fi'
import { useContext } from 'react'
import { UserAuth } from '../../Contexts/user'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import './header.css'

function Header(){
    const { user } = useContext(UserAuth)

    return(
        <header className="header_container">
            <section className="section_cover">
                {
                    user.avatarUrl 
                    ?
                    <img src={ user.avatarUrl } alt="Imagem de perfil"/>
                    :
                    <img src={ avatar } alt="Imagem de perfil"/>
                }                
            </section>
            <section className="section_menu">
                <Link to="/">
                    <FiHome/>
                    <span>Chamados</span>
                </Link>
                <Link to="/customers">
                    <FiUsers/>
                    <span>Clientes</span>
                </Link>
                <Link to="/profile">
                    <FiSettings/>
                    <span>Configurações</span>
                </Link>
            </section>
        </header>
    )
}

export default Header