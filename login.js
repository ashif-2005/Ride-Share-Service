const db = require('mongoose')

const schema = new db.Schema({
    Name:{
        type:String
    },
    Password:{
        type:String
    }
})

const Login = db.model('login',schema)

module.exports = {Login}