const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todoApp',{ 
    useNewUrlParser:true   
      
})

const Consumer = mongoose.model('Consumer',{      
    uid:Number,
    username:String,
    password:String,
    title:String,
    description:String,
    todos:[] 
}) 

module.exports={
    Consumer
}