import { useState, createContext, useEffect } from 'react'
import firebase from '../Services/firebaseConection'
import { toast } from 'react-toastify'

export const UserAuth = createContext({})

function UserContent({ children }){

    // ==> States
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ loadUser, setLoadUser ] = useState(false)


    // ==> Functions

    useEffect(()=>{
        
        function loadStorage(){
            const storageUser = localStorage.getItem("userAuth")

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }else{
                setLoading(false)
            }
        }

        loadStorage()
    },[])

    //==> Logar usuario
    async function signIn(email, senha){

        setLoadUser(true)
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then( async(value)=>{
            const uid = value.user.uid
            const userProfile = await firebase.firestore().collection("users").doc(uid).get()
            const data = {
                nome: userProfile.data().nome,
                uid: uid,
                email: value.user.email,
                avatarUrl: userProfile.data().avatarUrl
            }

            setUser(data)
            setLoadUser(false)
            saveStorage(data)
            toast.success("Bem vindo de volta!")
        })
        .catch((erro)=>{
            toast.error("Ops! Algo deu errado.")
        })
    }


    //==> Cadastrar usuario
    async function signUp(nome, email, senha){

        setLoadUser(true)
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then( async(value)=>{
            const uid = value.user.uid

            const data = {
                uid: uid,
                nome: nome,
                avatarUrl: null,
                email: value.user.email
            }

            await firebase.firestore().collection("users")
            .doc(uid).set({
                nome: nome,
                avatarUrl: null
            })
            
            setUser(data)
            saveStorage(data)
            setLoadUser(false)
            toast.success(`Bem vindo a plataforma ${ nome }!`)
        })
        .catch((erro)=>{
            toast.error("Ops! Algo deu errado.")
            setLoadUser(false)
        })
    }

    async function signOut(){
        await firebase.auth().signOut()
        setUser(null)
        localStorage.removeItem('userAuth')
    }

    function saveStorage(data){
        localStorage.setItem('userAuth', JSON.stringify(data))
    }

    return(
        <UserAuth.Provider value={ 
                {
                    user,
                    loading,
                    loadUser,
                    signed: !!user,
                    signUp,
                    signOut,
                    signIn,
                    saveStorage,
                    setUser,
                    setLoadUser
                }
            }>
            { children }
        </UserAuth.Provider>

    )
}

export default UserContent