const {Schema, model} = require('mongoose');
const CorreoSchema = Schema({
    _id:{type: String}, 
    
})
module.exports = model('Correo', CorreoSchema)