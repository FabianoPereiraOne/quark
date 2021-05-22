import Header from '../../Components/Header'
import './dashboard.css'
import Title from '../../Components/Title'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import firebase from '../../Services/firebaseConection'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import Modal from '../../Components/Modal'

const linkRef = firebase.firestore().collection("chamados").orderBy("created","desc")

function Dashboard(){
    const [ chamados, setChamados ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ emptyChamados, setEmptyChamados ] = useState(false)
    const [ loadMore, setLoadingMore ] = useState(false)
    const [ lastChamado, setLastChamado ] = useState()
    const [ details, setDetails ] = useState({})
    const [ closeAndShowModal, setCloseAndShowModal ] = useState(false)

    useEffect(()=>{

        async function loadChamados(){

            await linkRef.limit(5)
            .get()
            .then((snapshot)=>{
                updateState(snapshot)
            })
            .catch(()=>{
                console.log("Erro ao carregar chamados!")
                toast.error("Erro ao carregar chamados!")
                setLoadingMore(false)
            })
    
            setLoading(false)
        }

        loadChamados()
        return () =>{

        }
    },[])


    async function updateState(snapshot){
        const isEmpty = snapshot.size === 0

        if(!isEmpty){
            let lista = []

            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    complemento: doc.data().complemento,
                    userId: doc.data().userId,
                    cliente: doc.data().cliente,
                    assunto: doc.data().assunto,
                    status: doc.data().status,
                    custumerId: doc.data().custumerId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy")
                })
            })

            const lastChamado = snapshot.docs[snapshot.docs.length -1] // Pegando ultimo chamado

            setChamados( chamados => [ ...chamados, ...lista])
            setLastChamado(lastChamado)
        }else{
            setEmptyChamados(true)
        }

        setLoadingMore(false)

    }

    if(loading){
        return(
            <div className="contentDash">
                <Header/>
    
                <div className="content_main_dash">
                    <Title name="Atendimentos">
                        <FiMessageSquare/>
                    </Title>
                    <section className="section_chamados">
                        <h2>Buscando chamados...</h2>
                    </section>
                </div>
            </div>
        )
    }

    async function handleSearchPlus(){
        setLoadingMore(true)

        await linkRef.startAfter(lastChamado).limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot)
        })
        .catch((erro)=>{
            console.log(erro)
            toast.error("Erro ao carregar mais chamados!")
        })
    }

    function toggleModal(item){
        setCloseAndShowModal(!closeAndShowModal)
        setDetails(item)
    }




    return(
        <div className="contentDash">
            <Header/>

            <div className="content_main_dash">
                <Title name="Atendimentos">
                    <FiMessageSquare/>
                </Title>
                {
                    chamados.length === 0 ?
                    (
                        <section className="section_chamados">
                            <span>Nenhum chamado resgistrado...</span>
                            <Link to="/new">
                                <FiPlus/>
                                Novo chamado
                            </Link>
                        </section>
                    ):
                    (
                        <>
                            <section className="section_newChamados">
                                <Link to="/new">
                                    <FiPlus/>
                                    Novo chamado
                                </Link>
                            </section>
                            <table className="table_chamados">
                                <thead>
                                    <tr>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Assunto</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Cadastrado em</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        chamados.map((item, index)=>{
                                            return(
                                                <tr key={ index }>
                                                    <td data-label="Cliente">{ item.cliente }</td>
                                                    <td data-label="Assunto">{ item.assunto }</td>
                                                    <td data-label="Status" className="content_badge">
                                                        <div data-situacao={ item.status }>{ item.status }</div>
                                                    </td>
                                                    <td data-label="Cadastrado">{ item.createdFormat }</td>
                                                    <td data-label="" className="content_btn">
                                                        <div>
                                                            <button className="btn_search" onClick={ ()=> toggleModal(item) }>
                                                                <FiSearch/>
                                                            </button>
                                                            <Link className="btn_edit" to={ `/new/${ item.id }`}>
                                                                <FiEdit2/>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                            {
                                loadMore && <span className="loading">Carregando dados...</span>
                            }

                            {
                                !loadMore && !emptyChamados && <button type="button" className="btn_searchPlus" onClick={ handleSearchPlus}> Buscar mais</button>
                            }

                            {
                                closeAndShowModal && (
                                    <Modal
                                    conteudo = { details }
                                    close = { toggleModal }
                                    />
                                )
                            }
                        
                        
                        </>
                    )
                }
            </div>
        </div>
    )
}


export default Dashboard