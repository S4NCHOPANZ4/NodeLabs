const http = require('http');
const path = require('path'); 
const fs = require('fs');

const servidor = http.createServer((req,res)=>{
    const url = req.url;
    if(url === '/'){
        const filePath = path.join(__dirname, 'public', 'index.html');
        let contentType = "text/html"

        console.log(filePath);

        fs.readFile(filePath, (err, data)=>{
            if(err){
                res.end(`Server error: ${err}`)
            }else{
                res.writeHead(200,{'Content-Type':contentType});
                res.end(data ,'utf8')
            }
        })
    }
    if(req.url === '/write-message' && req.method === 'GET'){
        res.write(`
        <html>
            <head>
                <title>Send a message</title>
            </head>
            <body>
                <form action="/write-message" method="POST">
                    <input type="text" name="message" placeholder="Enter your message">
                    <button type="submit">Submit</button>
                   
                </form>
                <a href='/write-message'>write a message</a>
                <a href="read-message">read message</a>
            </body>
        </html>
    `)
    }
    if(req.url === '/write-message' && req.method === 'POST'){
        const body = [];

        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);

            const message = parsedBody.split('=')[1];
            fs.writeFileSync('./read.txt', message)

        })
       
    }
    if(req.url === '/read-message' && req.method === 'GET'){

        fs.readFile('./read.txt', 'UTF-8', (err, text)=>{
            if(err) {
                console.log(err)
            }else{
            console.log(text)
            res.write(
                `
                <html>
                    <head>
                        <title>Messages</title>
                    </head>
                    <body>
                       ${text}
                       <a href='/write-message'>write a message</a>
                       <a href="read-message">read message</a>
                    </body>
                </html>
            `)        
            res.end()
        } 
        })
    }
});

const port = 3000;

servidor.listen(port ,()=>{
    console.log(`Listening on port ${port}`);
});
