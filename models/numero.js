const {Schema, model} = require('mongoose');
const NumeroSchema = Schema({
    _id:{type: String}, 
    
})
module.exports = model('Numero', NumeroSchema)