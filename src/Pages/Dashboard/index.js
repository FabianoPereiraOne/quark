import Header from '../../Components/Header'
import './dashboard.css'
import Title from '../../Components/Title'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Dashboard(){
    const [ chamados, setChamados ] = useState(["j"])
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
                        <section chamados="section_chamados">
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
                                    <tr>
                                        <td data-label="Cliente">Name Teste</td>
                                        <td data-label="Assunto">Suporte</td>
                                        <td data-label="Status" className="content_badge"><div data-situacao="aberto">Em aberto</div></td>
                                        <td data-label="Cadastrado">12/05/2021</td>
                                        <td data-label="" className="content_btn">
                                            <div>
                                                <button className="btn_search">
                                                    <FiSearch/>
                                                </button>
                                                <button className="btn_edit">
                                                    <FiEdit2/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Cliente">Name Teste</td>
                                        <td data-label="Assunto">Suporte</td>
                                        <td data-label="Status" className="content_badge"><div data-situacao="progress">Em progresso</div></td>
                                        <td data-label="Cadastrado">12/05/2021</td>
                                        <td data-label="" className="content_btn">
                                            <div>
                                                <button className="btn_search">
                                                    <FiSearch/>
                                                </button>
                                                <button className="btn_edit">
                                                    <FiEdit2/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Cliente">Name Teste</td>
                                        <td data-label="Assunto">Suporte</td>
                                        <td data-label="Status" className="content_badge"><div data-situacao="atendido">Atendido</div></td>
                                        <td data-label="Cadastrado">12/05/2021</td>
                                        <td data-label="" className="content_btn">
                                            <div>
                                                <button className="btn_search">
                                                    <FiSearch/>
                                                </button>
                                                <button className="btn_edit">
                                                    <FiEdit2/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Cliente">Name Teste</td>
                                        <td data-label="Assunto">Suporte</td>
                                        <td data-label="Status" className="content_badge"><div data-situacao="aberto">Em aberto</div></td>
                                        <td data-label="Cadastrado">12/05/2021</td>
                                        <td data-label="" className="content_btn">
                                            <div>
                                                <button className="btn_search">
                                                    <FiSearch/>
                                                </button>
                                                <button className="btn_edit">
                                                    <FiEdit2/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                               
                                </tbody>

                            </table>
                        
                        
                        </>
                    )
                }
            </div>
        </div>
    )
}


export default Dashboard