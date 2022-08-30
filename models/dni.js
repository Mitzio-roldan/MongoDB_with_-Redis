const {Schema, model} = require('mongoose');
const DniSchema = Schema({
    _id:{type: String}, 
    
})
module.exports = model('Dni', DniSchema)