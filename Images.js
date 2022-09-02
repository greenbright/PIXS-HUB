const mongoose = require('mongoose');
const ImageSchema =  new mongoose.Schema({
    price:{
        type:String,
        required:true,
    },
    designer:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{type :String,
           required:true,
    },
    created:{
        type: Date,
        required: true,
        default:Date.now, 

    }
})
const Image = mongoose.model('Image',ImageSchema);
module.exports = Image;
