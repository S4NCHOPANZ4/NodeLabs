const router = require('express').Router()
const uuid = require("uuid")

const members = [
    { id: uuid.v4(), name: "Mario", email: "mario@mail.com" },
    { id: uuid.v4(), name: "Luigi", email: "luigi@mail.com" },
    { id: uuid.v4(), name: "Yoshi", email: "yoshi@mail.com" },
]

router.get('/', (req, res) => {
    res.render('homepage' , {members: members})
})

router.get('/:id', (req, res) => {
    const paramsID = req.params.id
    
    const found = members.some(member => member.id === paramsID)
    
    if(found){

        res.json(members.filter(member => member.id === paramsID))
    }else{
        res.status(400).json({ msg: `Member with id: ${paramsID}, is not found `})
    }
})

router.post('/', (req,res) => {
    const newData = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    members.push(newData)
    res.redirect('/api/members')
})

module.exports = router