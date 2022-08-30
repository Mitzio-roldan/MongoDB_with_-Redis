const {Schema, model} = require('mongoose');
const IndexSchema = Schema({
    correo:{
        type: String,
        unique: true
    },
    numero:{
        type: String,
        unique: true
    },
    dni:{
        type: String,
        unique: true
    },
    
})


module.exports = model('index', IndexSchema)