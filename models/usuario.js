const {Schema, model} = require('mongoose');
const UsuarioSchema = Schema({ 
    estado:{
        type: String,
    },
    data:{
        type: Object,
        
    },
    
})


module.exports = model('Usuario', UsuarioSchema)