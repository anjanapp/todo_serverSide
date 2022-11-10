const express = require('express')

const dataService = require('./services/data.service')

const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const jwtMiddleware = (req, res, next) => {

    try {

        token = req.headers['x-access-token']
        const data = jwt.verify(token, 'supersecretkey12345')
        console.log(data);
        req.currentUid = data.currentUid
        console.log(token);
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'please log in'
        })
    }

}


app.post('/register', (req, res) => {
    dataService.register(req.body.username, req.body.uid, req.body.password)

        .then(result => {
            res.status(result.statusCode).json(result)

        })
})

app.post('/login', (req, res) => {
    dataService.login(req.body.uid, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/addTodo', jwtMiddleware, (req, res) => {
    dataService.addTodo(req, req.body.uid, req.body.title, req.body.description)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getTodo', jwtMiddleware, (req, res) => {
    dataService.getTodo(req.body.uid)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})




app.listen(3000, () => {
    console.log("server started at 3000");
})
