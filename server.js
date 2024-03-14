const express = require('express')
const db = require('mongoose')
const parser = require('body-parser')
const {Ride} = require('./schema') 
const { Login } = require('./login')
const cors = require('cors')

const port = process.env.PORT || 8000
const url = "mongodb+srv://Mohammed_Ashif:Ashif2005@cluster0.whqaznv.mongodb.net/RideDb?retryWrites=true&w=majority&appName=Cluster0"

const app = express()
app.use(parser.json())
app.use(cors())

app.get('/getData',async (req,res)=>{
    try{
        let data = await Ride.find()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({
            "Status":"Internal Server Issue"
        })
    }
})

app.post('/login',async (req,res)=>{
    try{
        let count = 0
        const data = await Login.find()
        for(i of data){
            if(req.body.Name === i.Name && req.body.Password === i.Password){
                count++
            }
        }
        if(count>0){
            res.status(200).json({
                "status":"Successfully logged in"
            })
            count = 0
        }
        else{
            res.status(401).json({
                "status":"Invalid user name or password"
            })
        }   
    }catch(error){
        res.status(500).json({
            "status":"Internal Server Issue"
        })
    }
})

app.post('/signup',async (req,res)=>{
    try{
        let count = 0
        const data = await Login.find()
        for(i of data){
            if(req.body.Name === i.Name){
                count++
            }
        }
        if(count>0){
            res.status(401).json({
                "status":"User Already Exist"
            })
            count = 0
        }
        else{
            await Login.create({
                "Name":req.body.Name,
                "Password":req.body.Password
            })
            res.status(200).json({
                "status":"Account Created Successfull"
            })
        }   
    }catch(error){
        res.status(500).json({
            "status":"Internal Server Issue"
        })
    }
})

app.post('/findData',async (req,res)=>{
    try{
        let data = await Ride.find(req.body)
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({
            "Status":"Internal Server Issue"
        })
    }
})

app.patch('/edit',async (req,res)=>{
    try{
        const data = await Ride.findById(req.body.id)
        if(data){
            await data.updateOne({
                "totalRide":req.body.totalRide+1
            })
            res.status(200).json({
                "status":"Data Updated Succcessfull"
            })
        }
        else{
            res.status(404).json({
                "status":"Could not find document"
            })
        }
    }catch(error){
        res.status(500).json({
            "status":"Some internal issue"
        })
    }
})

async function connectToDb(){
    try{
     await db.connect(url)
     console.log('DB connected successfully...')
     app.listen(port,()=>{
         console.log(`Listening on port ${port}...`)
     })
    }
    catch(error){
     console.log(error)
    }
}
 
 connectToDb()