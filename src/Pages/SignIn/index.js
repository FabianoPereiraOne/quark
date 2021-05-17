import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../Contexts/user'

// ==> Externo Files
import Logo from '../../assets/logo.png'
import './sign.css'

function SignIn(){

    const [ email, setEmail ] = useState('')
    const [ senha, setSenha ] = useState('')
    const { signIn, loadUser } = useContext(UserAuth)

    function entrar(e){
        e.preventDefault()

        if(email !== '' && senha !== ''){
            signIn(email, senha)
        }
    }

    return(
        <div className="containerSign">
            <form className="form" onSubmit={ entrar }>

                <section className="form_title">
                    <img src={ Logo } alt="Logo da quark"/>
                </section>
                <section className="form_body">
                    <h2>Entrar</h2>
                    <input type="email"
                    placeholder="Email" 
                    value={ email }  onChange={ (e)=> setEmail(e.target.value)}/>
                    <input type="password"
                    placeholder="Senha" 
                    value={ senha } onChange={ (e)=> setSenha(e.target.value)}/>
                    <button type="submit"> { loadUser ? 'Carregando...' : 'Acessar' } </button>
                    <Link to="/register">Criar uma conta</Link>

                </section>
            </form>
        </div>
    )
}


export default SignIn