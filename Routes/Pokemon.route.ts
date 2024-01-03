import { Router } from "express";
import { ModelPokemon } from "../collections";

const PokemonRouter = Router();

PokemonRouter.get('/', async (req, res) => {
    const pokemones = await ModelPokemon.find({}).lean().exec()
    res.status(200).json(pokemones);
});

PokemonRouter.get('/:id', async (req, res) => {
    const {id} = req.params; //Obtiene el id que le enviaron por parámetros
    const pokemonBuscado = await ModelPokemon.find({id}).lean().exec(); 
    //Si existe ese pokemon
    if (pokemonBuscado.length === 0) {
        res.status(404).json({Mensaje: `No hay pokemones registrados con el id ${id}` });
    }
    else {
        res.status(200).json(pokemonBuscado);
    }        
});

PokemonRouter.post('/', async (req, res) => {
    const nuevoPokemon = await ModelPokemon.create({
        nombre: req.body.nombre,
        //validación de que las habilidades existen
        habilidades: req.body.habilidades,
        tipoPrimario: req.body.tipoPrimario,
        //validación sobre si viene o no el tipo
        tipoSecundario: req.body.tipoSecundario,
        descripcion: req.body.descripcion
    });
    res.status(201).json(nuevoPokemon);
});

PokemonRouter.put('/:id', async (req, res) => {
    res.status(201).json({});
});

PokemonRouter.delete('/', async (req, res) => {
    res.status(201).json({});
});

export default PokemonRouter;