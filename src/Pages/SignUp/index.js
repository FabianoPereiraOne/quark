import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

// ==> Externo Files
import Logo from '../../assets/logo.png'
import { UserAuth } from '../../Contexts/user'

function SignUp(){

    const [ nome, setNome ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ senha, setSenha ] = useState('')


    const { signUp, loadUser } = useContext(UserAuth)

    function registrar(e){
        e.preventDefault()

        if( nome !== '' && email !== '' && senha !== ''){
            signUp(nome, email, senha)
        }else{
            return
        }
    }

    return(
        <div className="containerSign">
            <form className="form" onSubmit={ registrar }>

                <section className="form_title">
                    <img src={ Logo } alt="Logo da quark"/>
                </section>
                <section className="form_body">
                    <h2>Registrar</h2>
                    <input type="text"
                    placeholder="Seu nome" 
                    value={ nome }  onChange={ (e)=> setNome(e.target.value)}/>
                    <input type="email"
                    placeholder="Email" 
                    value={ email }  onChange={ (e)=> setEmail(e.target.value)}/>
                    <input type="password"
                    placeholder="Senha" 
                    value={ senha } onChange={ (e)=> setSenha(e.target.value)}/>
                    <button type="submit">{ loadUser ? 'Carregando...' : 'Cadastrar-se' }</button>
                    <Link to="/">Já tem conta? Entre</Link>

                </section>
            </form>
        </div>
    )
}


export default SignUp