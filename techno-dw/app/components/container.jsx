export function Container({id, className, children}){
    return(
        <div className={`container ${className}`} id={id}>
            {children}
        </div>
    )
}

export function DynamicContainer({id, className, children}){
    return(
        <div className={`container dynamicContainer ${className}`} id={id}>
            {children}
        </div>
    )
}