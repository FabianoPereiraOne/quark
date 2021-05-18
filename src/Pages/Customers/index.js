import { useState, useContext } from 'react'
import Header from '../../Components/Header'
import Title from '../../Components/Title'
import './customers.css'
import { FiUsers } from 'react-icons/fi'
import { UserAuth } from '../../Contexts/user'

export default function Customers(){
    const [ nomeFantasia, setNomeFantasia ] = useState('')
    const [ cnpj, setCnpj ] = useState('')
    const [ endereco, setEndereco ] = useState('')
    const { loadUser } = useContext(UserAuth)

    return(
        <div className="content_customers">
            <Header/>
            <div className="container_main">
                <Title name="Clientes">
                    <FiUsers/>
                </Title>
                <section className="section_clientes">
                    <form>
                        <div className="form_altered">
                            <div className="form_group">
                                <label>Nome fantasia:</label>
                                <input type="text" 
                                placeholder="Nome da empresa"
                                value={ nomeFantasia } 
                                onChange={ (e)=> setNomeFantasia(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <label>CNPJ:</label>
                                <input type="text"
                                placeholder="Seu CNPJ"
                                value={ cnpj } 
                                onChange={ (e)=> setCnpj(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <label>Endereço:</label>
                                <input type="text" 
                                placeholder="Endereço comercial"
                                value={ endereco } 
                                onChange={ (e)=> setEndereco(e.target.value)}
                                />
                            </div>
                            <button type="submit">{ loadUser ? "Cadastrando..." : "Cadastrar" }</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}