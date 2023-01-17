const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();

app.use(express.static('public'))

//===================================
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
//===================================


app.get('/public/styles/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','styles','index.css'));
})

//Routing
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname , './views/index.html'));
})

app.get('/messages',(req, res)=>{
    const filePath = path.join(__dirname, 'json', 'notes.txt');
    fs.readFile(filePath, (err, data)=>{
        if(err){
            res.end(`Server error: ${err}`)
        }else{
            messages = (data.toString())
            console.log(messages)
            let arrMsg = messages.split(',')
            console.log(arrMsg)
            for(let i=0; i<arrMsg.length; i++){
                if(i == 0){
                    res.write(`
                    <html class='super'>
                    <head>
                        <link rel="stylesheet" href="../public/styles/index.css">
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" rel="stylesheet">
                    <title>Guestbook</title>
                    </head>
                        <body class='container__msg'>
                            <h1 class=title>NOTES</h1>
                            <h2 class='msg'>${arrMsg[i]}</h2>
                        </body>
                    </html>
                `)
                }else if(i < arrMsg.length -1){
                    res.write(`
                    <h2 class='msg'> ${arrMsg[i]}</h2>
               `)
                }
                else{
                    res.write(`
                     <h2 class='msg'> ${arrMsg[i]}</h2>
                     <a  href="http://localhost:3000">write a new message</a>
                `)
                }
            }
        }
    })
  
})


//Get Form Values
app.post('/', function (req, res) {
    console.log(req.body.message);
    getData(req.body.message)

});

const getData = (newMsg) =>{
    console.log(newMsg)

    const filePath = path.join(__dirname, 'json', 'notes.txt');
    console.log(filePath);
    let messages = ''
    fs.readFile(filePath, (err, data)=>{
        if(err){
            res.end(`Server error: ${err}`)
        }else{
            messages = (data.toString())
            console.log(messages)
        }
    })

    setTimeout(()=>{
        let finalMsg = (`${newMsg} , ${messages}`)
        console.log(finalMsg)
        fs.writeFileSync('./json/notes.txt',finalMsg)
    },2000)
}

const PUERTO = 3000;
app.listen(PUERTO);