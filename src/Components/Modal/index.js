import './modal.css';
import { FiX } from 'react-icons/fi' 

export default function Modal({ conteudo, close}){
    return(
        <div className="container_modal">
            <div className="modal">
                <button type="button" onClick={ close }>
                    <FiX/>
                    <span>Voltar</span>
                </button>

                <p className="row">
                    <strong>Cliente:</strong>
                    <span>{ conteudo.cliente }</span>
                </p>
                <p className="row">
                   <span>
                        <strong>Assunto:</strong>
                        <span>{ conteudo.assunto }</span>
                   </span>
                   <span>
                        <strong>Cadastrado em:</strong>
                        <span>{ conteudo.createdFormat }</span>
                   </span>
                </p>
                <p className="row">
                    <strong>Status:</strong>
                    <div data-situacao={ conteudo.status }>{ conteudo.status }</div>
                </p>

                {
                    conteudo.complemento !== '' && (
                        <p className="row">
                            <strong>Complemento:</strong>
                            <span>{ conteudo.complemento }</span>
                        </p>
                    )
                }

            </div>
        </div>
    )
}