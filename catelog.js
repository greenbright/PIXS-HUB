const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    title:{type:String ,required:true},
    file:{type:String, required:true},
    description:{type:String, required:true}
}) 

const model = mongoose.model('videos',VideoSchema);
module.exports = model;



const mongoose = require('mongoose');

const ImageSchema =  new mongoose.Schema({
filepath:{type:String,required:true},
title:{type:String,required:true},
description:{type:String,require:true},
time:{timestamps:true}
})
const Image = mongoose.model('Image',ImageSchema);
module.exports = Image;