import './profile.css'
import Header from '../../Components/Header'
import Title from '../../Components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { UserAuth } from '../../Contexts/user'
import avatar from '../../assets/avatar.png'
import firebase from '../../Services/firebaseConection'
import { toast } from 'react-toastify'

export default function Profile(){
    const { user, loadUser, signOut, setUser, saveStorage, setLoadUser } = useContext(UserAuth)
    const [ nome, setNome ] = useState(user && user.nome)
    const [ avatarUrl, setAvatarUrl ] = useState(user && user.avatarUrl)
    const [ avatarUpload, setAvatarUpload ] = useState(null)

    async function upload(){
        const uid = user.uid
        
        setLoadUser(true)
        await firebase.storage()
        .ref(`image/${ uid }/${ user.nome }`)
        .put(avatarUpload)
        .then( async()=>{
            
            await firebase.storage().ref(`image/${ uid }/${ user.nome }`).getDownloadURL()
            .then( async(url)=>{
                const imageUrl = url

                await firebase.firestore().collection("users")
                .doc(uid).update({
                    avatarUrl: imageUrl,
                    nome: nome
                })
                .then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: imageUrl,
                        nome: nome
                    }

                    setUser(data)
                    saveStorage(data)
                    setLoadUser(false)
                    toast.success("Dados atualizados com sucesso!")
                })
            })
        })
        .catch((erro)=>{
            console.log(erro)
            toast.error("Ops! Não foi possível atualizar foto de perfil")
        })
    }

    function handleFile(e){

        if(e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === "image/png" || image.type === "image/jpeg"){

                setAvatarUpload(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                toast.error("Tipo de imagem não suportada.")
                setAvatarUpload(null)
                return null
            }
            }
    }

    async function save(e){
        e.preventDefault()

        if( avatarUpload === null && nome !== ''){
            
            setLoadUser(true)
            await firebase.firestore().collection("users").doc(user.uid)
            .update({
                nome: nome
            })
            .then(()=>{

                let data = {
                    ...user,
                    nome: nome
                }

                setUser(data)
                saveStorage(data)
                setLoadUser(false)
            })
            .catch((erro)=>{
                console.log(erro)
                toast.error("Ops! Falha ao atualizar nome")
                setLoadUser(false)
            })
        }else if(avatarUpload !== null && nome !== ''){
            upload()
        }else if(avatarUpload !== null && nome === ''){
            upload()
        }
    }

    return(
        <div className="content_profile">
            <Header/>
            <div className="content_main">
                <Title name="Minha conta">
                    <FiSettings/>
                </Title>
                <section className="section_perfil">
                    <form onSubmit={ save }>
                        <label className="upload">
                            <FiUpload/>
                            <input type="file" onChange={ handleFile } accept="image/*"/>
                            {
                                avatarUrl 
                                ?
                                <img src={ avatarUrl } alt="Imagem de perfil"/>
                                :
                                <img src={ avatar } alt="Imagem de perfil"/>
                            }   
                        </label>
                        <div className="form_altered">
                            <div className="form_group">
                                <label>Nome:</label>
                                <input type="text" 
                                value={ nome } 
                                onChange={ (e)=> setNome(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <label>Email:</label>
                                <input type="text" 
                                value={ user.email }
                                disabled={ true }
                                />
                            </div>
                            <button type="submit">{ loadUser ? "Salvando..." : "Salvar" }</button>
                        </div>
                    </form>
                </section>
                <section className="section_logout">
                    <button onClick={ ()=> signOut() }>Sair</button>
                </section>
            </div>
        </div>
    )
}