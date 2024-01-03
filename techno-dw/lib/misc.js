const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// a data recebida pelo cosmic é no formato yyyy-mm-dd
// o objetivo é obter no formato dd/Mon/yyyy
export function cosmicToDate(dateCosmic, year){
    const split = dateCosmic.split('-')
    const mes = parseInt(split[1])

    const retornar = [split[2], meses[mes]]
    if(year) retornar.push(split[0])

    return retornar.join('/')
}

export function cosmicYear(dateCosmic){
    return parseInt(dateCosmic.split('-')[0])
}



export function mapear(
    number,
    inMin,
    inMax,
    outMin,
    outMax
) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}