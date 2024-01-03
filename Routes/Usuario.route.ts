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

export default UsuarioRouter;