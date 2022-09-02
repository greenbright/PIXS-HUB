const express = require('express');
const router = express.Router();
const Image = require('../models/Images');
const multer = require('multer');
const fs = require("fs");

// Uploading files
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './uploads');
    },
    filename:(req,file,cb)=>{
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});
const upload = multer({storage :storage,
   }).single("image");  

router.post ('/post',upload,(req,res)=>{
  const catelogImage = new Image({
   price:req.body.price,
   designer:req.body.designer,
   description:req.body.description,
   image:req.file.filename,
    
  });
  catelogImage.save((err)=>{
      if(err){
          res.json({ message:message.err, type:'danger'});
      } else{
          req.session.message ={
              type: 'success',
              message: 'User added successfully'
          };
          res.redirect('/');
      }
  })
 })

 // Get all images routes
router.get('/',(req,res)=>{
    Image.find().exec((err, images)=>{
        if(err){
            res.json({message:message.err});
        }else{
            res.render('index',{
                title: 'Home page',
                images:images,
            })
        }
    })
});

router.get('/about',(req,res)=>{
    res.render('about', {title:'About us'})
})

router.get('/add',(req,res)=>{
    res.render('post', {title:'Post image'});
})

//Edit image
router.get('/edit/:id', (req,res)=>{
    let id = req.params.id;
    Image.findById(id ,(error, image)=>{
        if(error){
            res.redirect('/');
        }else{
             if(image == null){
                 res.redirect('/');
             }else{
                 res.render('edit_image',{
                     title: 'Edit image',
                     image: image,
                 });
             }
        }
    })
})

// Update 
router.post('/update/:id', upload, (req,res)=>{
 let id = req.params.id;
 let new_image = "";

 if(req.file){
     new_image = req.file.filename;
     try{
     fs.unlinkSync("./uploads/" + req.body.old_image);
     //req.body.old_image is coming from the edit interface
     } catch(err){
       console.log(err)
     }
 } else{
     new_image = req.body.old_name;
 }
 Image.findByIdAndUpdate(id, {
    price:req.body.price,
    designer:req.body.designer,
    description:req.body.description,
    image:new_image,
 }, (err,result)=>{
     if(err){
    res.json({ message:err.message,type: "danger"})
     } else{
         req.session.message ={
             type: 'success',
             message: 'Image updated successfully',
         };
         res.redirect('/');
     }
 })
})

// Delete route

router.get('/delete/:id',(req,res)=>{
 let id = req.params.id;
 Image.findByIdAndRemove(id,(err,result)=>{
     if(result.image != ""){
        try{
            fs.unlinkSync('./uploads/'+ result.image);
        } catch(err){
            console.log(err)
        }
     }
     if(err){
         res.json({ message: err.message});
     }else{
         req.session.message= {
             type : 'Info',
             message : 'Image deleted successfully',
         }
         res.redirect('/')
     }
     
 })
})


module.exports = router;
