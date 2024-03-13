const mongodb = require('mongoose')

const schema = new mongodb.Schema({
    driverId: {
        type:String
    },
    name: {
        type:String
    },
    vechiName: {
        type:String
    },
    model: {
        type:String
    },
    insId: {
        type:String
    },
    vechiNo: {
        type:String
    },
    carType: {
        type:String
    },
    totalRide:{
        type:Number
    }
})

const Ride = mongodb.model("ride",schema)

module.exports = {Ride}