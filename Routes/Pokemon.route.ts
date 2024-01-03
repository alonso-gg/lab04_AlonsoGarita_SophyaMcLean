import { Router } from "express";
import { ModelPokemon } from "../collections";

const PokemonRouter = Router();

PokemonRouter.get('/', async (req, res) => {
    res.status(200).json({});
});

PokemonRouter.get('/:id', async (req, res) => {
    res.status(200).json({});
});

PokemonRouter.post('/', async (req, res) => {
    res.status(201).json({});
});

PokemonRouter.put('/:id', async (req, res) => {
    res.status(201).json({});
});

PokemonRouter.delete('/', async (req, res) => {
    res.status(201).json({});
});

export default PokemonRouter;