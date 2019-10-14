const express = require('express');
const router = express.Router();

const Photo = require('../models/photo');

router.get('/',(req,res)=>{
    res.send("Funciona");
});

router.get('/api/photos',(req,res)=>{
    Photo.find({}).exec((err,photos)=>{
        if(err){
            res.status(500).json({
                status:"Error",
                message:"Se presento un error"
            });
        }

        if(!photos){
            res.status(404).json({
                status:"Error",
                message:"No hay Fotos en la Base"
            });
        }

        res.status(200).json({
            status:"OK",
            photos
        });
    });
});

router.post('/api/photos',(req,res)=>{

    const {urlPhoto,name} = req.body;

    const photo = new Photo();

    photo.urlPhoto = urlPhoto;
    photo.name = name;

    photo.save((err,photoStored)=>{

        if(err || !photoStored){
            res.status(404).json({
                status:"Error",
                message:"No se pudo guardar los datos"
            });
        }
        res.status(200).json({
            status:"OK",
            message:"Datos Guardados"
        });

    });

});


module.exports = router;