import { Router } from "express";
import { ModelHabilidad } from "../collections";

const HabilidadesRouter = Router();

HabilidadesRouter.get('/', async (req, res) => {
    const habilidades = await ModelHabilidad.find({}).lean().exec()
    res.status(200).json(habilidades);
});


HabilidadesRouter.post('/', async (req, res) => {
    const newAbility = await ModelHabilidad.create({
        abilityNumber: req.body.abilityNumber,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });
    res.status(201).json(newAbility);
});

export default HabilidadesRouter;