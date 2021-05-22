import './erro.css'
import { Link } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'

export default function Erro(){
    return(
        <div className="container_erro">
            <FiAlertTriangle/>
            <h1>404 -  Pagina não encontrada!</h1>
            <Link to="/">Pagina de dashboard</Link>
        </div>
    )
}