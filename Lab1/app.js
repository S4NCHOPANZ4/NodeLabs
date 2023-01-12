const   { mySum, myMultiply, overAverage, timeOut } = require('./MySum.js')

const myArr = [1,2,3]
const result = mySum(...myArr);
console.log('sum of all of its inputs: '+result);

console.log('muiltiply by 2: ' + myMultiply(myArr))
console.log('above average: ' + overAverage(result))

setTimeout(()=>{
    console.log('Goodbye')
},3000)

const employee = {
    name: 'illoJuan',
    email: 'LMDshow@gmail.com',
    department: 'Reddit',
    startDate: new Date('December 17, 1995')

}
const {name, email} = employee

const person = {
    name,
    email
}
console.log(person)

