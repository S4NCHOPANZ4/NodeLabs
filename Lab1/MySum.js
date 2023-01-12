const mySum = (...args) =>{
    let total = 0;
    for(const arg of args){
        total += arg;
    }
    return total;
}
const myMultiply = (args) =>{
    const arr =  args.map(arg =>{
        return arg*2
    })
    return arr
}
const overAverage = (...args) =>{
    let total = 0;
    let length = 0
    let over= [];
    for(const arg of args){
        total += arg
        length = length + 1
    }
    let ave = total / length
    for(const arg of args){
        if (arg >= ave){
            over.push(arg)
        }
    }
    return over
}

module.exports = {
    mySum,
    myMultiply,
    overAverage,
}