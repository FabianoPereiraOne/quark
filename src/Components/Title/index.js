import './title.css'

export default function Title({ children, name}){
    return(
        <section className="section_title">
            { children }
            <span>{ name }</span>
        </section>
    )
}