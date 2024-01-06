export default function DynamicContainer({id, className, children}){
    return(
        <div className={`container dynamicContainer ${className}`} id={id}>
            {children}
        </div>
    )
}