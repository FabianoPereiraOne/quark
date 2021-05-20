
import './new.css'
import { useContext, useState, useEffect } from 'react'
import { UserAuth } from '../../Contexts/user'
import firebase from '../../Services/firebaseConection'
import { toast } from 'react-toastify'

//==> Components
import Header from '../../Components/Header'
import Title from '../../Components/Title'
import { FiPlusCircle } from 'react-icons/fi'



export default function New(){
    const { user } = useContext(UserAuth)
    const [ assunto, setAssunto ] = useState('Suporte')
    const [ status, setStatus] = useState('Aberto')
    const [ complemento, setComplemento ] = useState('')
    const [ loadRegister, setLoadRegister ] = useState(false)
    const [ loadCustomers, setLoadCustomers ] = useState(true)
    const [ customers, setCustomers ] = useState([])
    const [ customerSelected , setCustomerSelected ] = useState(0)

    async function handleChamados(e){
        e.preventDefault()
        
        setLoadRegister(true)
        await firebase.firestore().collection("chamados")
        .add({
            assunto: assunto,
            status: status,
            complemento: complemento,
            cliente: customers[customerSelected].nomeFantasia,
            customerId: customers[customerSelected].id,
            userId: user.uid
        })
        .then(()=>{
            setComplemento("")
            setCustomerSelected(0)
            setLoadRegister(false)
            toast.success("Chamado cadastrado com sucesso!")
        })
        .catch((erro)=>{
            console.log(erro)
            toast.error("Falha ao registrar chamado. Tente novamente!")
            setComplemento("")
            setCustomerSelected(0)
        })

    }

    // Chamado quando altera complemento
    function handleAssunto(e){
        setAssunto(e.target.value)
    }

    // Chamado quando altera status
    function handleStatus(e){
        setStatus(e.target.value)
    }

    // Chamado quando altera o complemento
    function handleComplemento(e){
        setComplemento(e.target.value)
    }

    // Chamado quando altera o customers selecionado
    function handleCustomerSelected(e){
        setCustomerSelected(e.target.value)
    }

    useEffect(()=>{
        async function loadCustomers(){
            await firebase.firestore().collection("customers")
            .get()
            .then((snapshot)=>{

                let lista = []

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(lista.length === 0){
                    toast.info("Nenhuma empresa encontrada!")
                    setCustomers([{ id: '1', nomeFantasia: "Anonymous"}])
                    setLoadCustomers(false)
                    return;
                }

                setCustomers(lista)
                setLoadCustomers(false)
            })
            .catch((erro)=>{
                console.log(erro)
                toast.error("Falha ao carregar clientes!")
                setLoadCustomers(false)
                setCustomers([{ id: '1', nomeFantasia: ""}])
              
            })
        }

        loadCustomers()
    },[])

    return(
        <div className="content_new">
            <Header/>
            <div className="content_main_new">
                <Title name="Novo chamado">
                    <FiPlusCircle/>
                </Title>

                <section className="section_new">
                    <form onSubmit={ handleChamados }>
                        <div className="form_group">
                            <label>Cliente</label>
                            {
                                loadCustomers ?
                                (
                                    <input value="Carregando clientes..." type="text" disabled={ true }/>
                                )
                                :
                                (
                                    <select value={ customerSelected } onChange={ handleCustomerSelected }>
                                        {
                                            customers.map((empresa, index)=>{
                                                return (
                                                    <option key={ empresa.id } value={ index }>
                                                        { empresa.nomeFantasia}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                )
                            }
                        </div>
                        <div className="form_group">
                            <label>Assunto</label>
                            <select value={ assunto } onChange={ handleAssunto }>
                                <option key={ 1 } value="Suporte">Suporte</option>
                                <option key={ 2 } value="Visita tecnica">Visita tecnica</option>
                                <option key={ 3 } value="Financeiro">Financeiro</option>
                            </select>
                        </div>
                        <div className="input_group">
                            <label data-name="status">Status</label>
                            <div>
                                <label>
                                    <input type="radio"
                                    name="radio"
                                    onChange={ handleStatus }
                                    value="Aberto"
                                    checked={ status === "Aberto"}                                   
                                    />
                                    <span>Em aberto</span>
                                </label>
                                <label>
                                    <input type="radio"
                                    name="radio"
                                    onChange={ handleStatus } 
                                    value="Progresso" 
                                    checked={ status === "Progresso"}
                                    />
                                    <span>Em progresso</span>
                                </label>
                                <label>
                                    <input type="radio"
                                     name="radio"
                                     onChange={ handleStatus } 
                                     value="Atendido" 
                                     checked={ status === "Atendido"}
                                     />
                                    <span>Atendido</span>
                                </label>
                            </div>
                        </div>
                        <div className="form_group">
                            <label>Complemento</label>
                            <textarea
                            value={ complemento }
                            onChange={ handleComplemento }
                            placeholder="Descrição do chamado(opcional)."
                            />
                        </div>
                        <div className="btn_group">
                            <button type="submit">{ loadRegister ? "Registrando..." : "Registrar" }</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}