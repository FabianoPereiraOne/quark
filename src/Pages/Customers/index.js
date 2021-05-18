import { useState, useContext } from 'react'
import Header from '../../Components/Header'
import Title from '../../Components/Title'
import './customers.css'
import { FiUsers } from 'react-icons/fi'
import { UserAuth } from '../../Contexts/user'
import { toast } from 'react-toastify'
import firebase from '../../Services/firebaseConection'

export default function Customers(){
    const [ nomeFantasia, setNomeFantasia ] = useState('')
    const [ cnpj, setCnpj ] = useState('')
    const [ endereco, setEndereco ] = useState('')
    const { loadUser, setLoadUser } = useContext(UserAuth)

    async function handleAdd(e){
        e.preventDefault()

        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){

            setLoadUser(true)
            await firebase.firestore().collection("customers")
            .add({
                nomeFantasia,
                cnpj,
                endereco
            })
            .then(()=>{
                setNomeFantasia('')
                setCnpj('')
                setEndereco('')
                toast.success("Cliente cadastrado com sucesso!")
                setLoadUser(false)
            })


        }else{
            toast.error("Preencha todos os campos!")
        }
    }

    return(
        <div className="content_customers">
            <Header/>
            <div className="container_main">
                <Title name="Clientes">
                    <FiUsers/>
                </Title>
                <section className="section_clientes">
                    <form onSubmit={ handleAdd }>
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