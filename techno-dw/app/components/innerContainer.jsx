export default function InnerContainer({id, className, children}){
    return(
        <div className={`innerContainer ${className}`} id={id}>
            {children}
        </div>
    )
}