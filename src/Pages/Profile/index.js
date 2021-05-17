import './profile.css'
import Header from '../../Components/Header'
import Title from '../../Components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { UserAuth } from '../../Contexts/user'
import avatar from '../../assets/avatar.png'

export function Profile(){
    const { user, loadUser, signOut } = useContext(UserAuth)
    const [ nome, setNome ] = useState(user.nome)

    function save(e){
        e.preventDefault()

        if(nome !== ''){
            alert("salvo")
        }
    }

    return(
        <div className="content_profile">
            <Header/>
            <div className="content_main">
                <Title name="Minha conta">
                    <FiSettings/>
                </Title>
                <section className="section_perfil">
                    <form onSubmit={ save }>
                        <label className="upload">
                            <FiUpload/>
                            <input type="file" accept="image/*"/>
                            {
                                user.avatarUrl 
                                ?
                                <img src={ user.avatarUrl } alt="Imagem de perfil"/>
                                :
                                <img src={ avatar } alt="Imagem de perfil"/>
                            }   
                        </label>
                        <div className="form_altered">
                            <div className="form_group">
                                <label>Nome:</label>
                                <input type="text" 
                                value={ nome } 
                                onChange={ (e)=> setNome(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <label>Email:</label>
                                <input type="text" 
                                value={ user.email }
                                disabled='true'
                                />
                            </div>
                            <button type="submit">{ loadUser ? "Salvando..." : "Salvar" }</button>
                        </div>
                    </form>
                </section>
                <section className="section_logout">
                    <button onClick={ ()=> signOut() }>Sair</button>
                </section>
            </div>
        </div>
    )
}