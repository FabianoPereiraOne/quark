import Header from '../../Components/Header'
import './dashboard.css'
import Title from '../../Components/Title'
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Dashboard(){
    const [ chamados, setChamados ] = useState([])
    return(
        <div className="contentDash">
            <Header/>

            <div className="content_main_dash">
                <Title name="Atendimentos">
                    <FiMessageSquare/>
                </Title>
                <section className="section_chamados">
                    {
                        chamados.length === 0 ?
                        (
                            <>
                                <span>Nenhum chamado resgistrado...</span>
                                <Link to="/new">
                                    <FiPlus/>
                                    Novo chamado
                                </Link>
                            </>
                        ):
                        (
                            <h1>Ja tem chamados</h1>
                        )
                    }
                </section>
            </div>
        </div>
    )
}


export default Dashboard