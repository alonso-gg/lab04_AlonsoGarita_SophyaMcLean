import { Router } from "express";
import { ModelHabilidad } from "../collections";

const HabilidadesRouter = Router();

HabilidadesRouter.get('/', async (req, res) => {
    res.status(200).json({});
});

HabilidadesRouter.post('/', async (req, res) => {
    res.status(201).json({});
});

export default HabilidadesRouter;