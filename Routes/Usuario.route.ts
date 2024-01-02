import { Router } from "express";
import { modelUsuario } from "../collections";

const UsuarioRouter = Router();

UsuarioRouter.get('/', async (req, res) => {
    const allUsers = await modelUsuario.find({}).lean().exec()
    res.status(200).json({message: 'From GET /users'});
});

UsuarioRouter.get('/:id', (req, res) => {
    res.status(200).json({message: 'From GET /users/:id'});
});

UsuarioRouter.post('/', (req, res) => {
    res.status(200).json({message: 'From POST /users'});
});

export default UsuarioRouter;