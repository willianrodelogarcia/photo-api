const express = require('express');
const router = express.Router();

const Photo = require('../models/photo');
const Album = require('../models/album');

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



router.delete('/api/photo',(req,res)=>{
    const {_id} = req.body;

    Photo.findByIdAndDelete({_id},(err,photoRemoved)=>{
        if(err){
            res.status(500).json({
                status:"Error",
                message:"Error al tratar de borrar la imagen"
            });
        }

        if(!photoRemoved){
            res.status(404).json({
                status:"Error",
                message:"Imagen no encontrada"
            });
        }

        res.status(200).json({
            status:"OK",
            message:"Imagen Borrada"
        });
    });

    

});

router.get('/api/album',(req,res)=>{
    Album.find({}).exec((err,albums)=>{
        if(err || !albums){
            res.status(404).json({
                status:"Error",
                message:"No se pudo guardar los datos"
            });
        }

        res.status(200).json({
            status:"OK",
            albums
        });
    });
});

router.post('/api/album',(req,res)=>{
    const {name} = req.body;
    const album = new Album();

    album.name = name;

    album.save((err,albumStored)=>{
        if(err || !albumStored){
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

router.put('/api/album',(req,res)=>{
    const {_id} = req.body;
    var params = req.body
    var photos = params.photos
    var query = {"$push":{ "photos": {"$each": photos} }}
    
    Album.findOneAndUpdate({_id},query,{new: true},(err,albumUpdated)=>{
        if(err || !albumUpdated){
            res.status(404).json({
                status:"Error",
                message:"No se pudo actualizar el dato"
            });
        }
        res.status(200).json({
            status:"OK",
            message:"Dato Actualizado"
        });
    });
});

router.get('/api/album/:id',(req,res)=>{
    const {id} = req.params;
    Album.findById(id,(err,albums)=>{
        if(err || !albums){
            res.status(404).json({
                status:"Error",
                message:"No se pudo obtener el dato"
            });
        }
        res.status(200).json({
            status:"OK",
            albums
        });
    });
});

router.get('/api/album/:id',(req,res)=>{
    const {id} = req.params;
    Album.findById(id,(err,albums)=>{
        if(err || !albums){
            res.status(404).json({
                status:"Error",
                message:"No se pudo obtener el dato"
            });
        }
        res.status(200).json({
            status:"OK",
            albums
        });
    });
});

module.exports = router;