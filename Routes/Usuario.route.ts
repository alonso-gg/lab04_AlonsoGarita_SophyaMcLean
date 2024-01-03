import { Router } from "express";
import { ModelUsuario } from "../collections";

const UsuarioRouter = Router();

UsuarioRouter.get('/', async (req, res) => {
    const allUsers = await ModelUsuario.find({}).lean().exec()
    res.status(200).json(allUsers);
});

UsuarioRouter.post('/', async (req, res) => {
    const newUser = await ModelUsuario.create({
        nombre: req.body.nombre,
        contrasena: req.body.contrasena
    });
    res.status(201).json(newUser);
});

//Modifica UN usuario por su username (nombre)
UsuarioRouter.put('/:nombre',async (req,res) => {
    const {nombre} = req.params; //Obtiene el username que le enviaron por parámetros
    const usuarioBuscado = await ModelUsuario.find({nombre}).lean().exec(); 
    if (usuarioBuscado.length === 0) {
        res.status(404).json({Mensaje: `No hay usuarios registrados con el nombre ${nombre}` });
    }
    else {
        await ModelUsuario.updateOne({ nombre: nombre }, { $set: { contrasena: req.body.contrasena } });
        res.status(202).json({Mensaje: `El usuario ${nombre} fue modificado exitosamente.` });
    }    
})

// Es un servicio para borrar un usuario
UsuarioRouter.delete('/:nombre', async (req, res) => {
    const {nombre} = req.params; //Obtiene el username que le enviaron por parámetros
    const usuarioBuscado = await ModelUsuario.find({nombre}).lean().exec(); 
    if (usuarioBuscado.length === 0) {
        res.status(404).json({Mensaje: `No hay usuarios registrados con el nombre ${nombre}` });
    }
    else {
        await ModelUsuario.deleteOne({ nombre: nombre }, { $set: { contrasena: req.body.contrasena } });
        res.status(202).json({Mensaje: `El usuario ${nombre} se eliminó con éxito!` });
    }  
})



export default UsuarioRouter;