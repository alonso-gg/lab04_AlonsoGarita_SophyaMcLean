import { Router } from "express";
import { ModelUsers } from "../collections";

const UserRouter = Router();

//Obtiene todos los usuarios registrados
UserRouter.get('/', async (req, res) => {
    const allUsers = await ModelUsers.find({}).lean().exec()
    res.status(200).json(allUsers);
});

//Crea un usuario con su nombre y contraseña
UserRouter.post('/', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if(!name || !password){
        res.status(500).send('Can not create an user without name nor password.');
        return;
    }

    console.log(req.body.name);

    const newUser = await ModelUsers.create({
        name: name,
        password: password
    });
    res.status(201).json(newUser);
});

//Modifica un usuario por su username (nombre)
UserRouter.put('/:name',async (req,res) => {
    const {name} = req.params; //Obtiene el username que le enviaron por parámetros
    const searchedUser = await ModelUsers.find({name}).lean().exec(); 
    if (searchedUser.length === 0) {
        res.status(404).json({message: `Could not find user${name}`});
    }
    else {
        await ModelUsers.updateOne({ name: name }, { $set: { password: req.body.password } });
        res.status(202).json({message: `The user ${name} was modified successfully.`});
    }    
})

//Es un servicio para borrar un usuario
UserRouter.delete('/:name', async (req, res) => {
    const {name} = req.params; //Obtiene el username que le enviaron por parámetros
    const usuarioBuscado = await ModelUsers.find({name}).lean().exec(); 
    if (usuarioBuscado.length === 0) {
        res.status(404).json({message: `Could not find user${name}`});
    }
    else {
        await ModelUsers.deleteOne({ name: name });
        res.status(202).json({message: `The user ${name} was deleted successfully.`});
    }  
})

export default UserRouter;