export default function Container({id, className, children}){
    return(
        <div className={`container ${className}`} id={id}>
            {children}
        </div>
    )
}