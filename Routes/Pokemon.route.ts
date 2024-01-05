import { Router } from "express";
import { ModelHabilidad, ModelPokemon } from "../collections";
// import {authenticationMiddleware} from "../index.ts";

const PokemonRouter = Router();

PokemonRouter.get('/', async (req, res) => {
    const pokemones = await ModelPokemon.find({}).lean().exec();
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
    const pnombre = req.body.nombre;
    const phabilidades = req.body.habilidades;
    const ptipoPrimario = req.body.tipoPrimario;
    const pdescripcion = req.body.descripcion;

    if (pnombre === null || phabilidades === null ||
        ptipoPrimario === null || pdescripcion === null) {
        res.status(500).send('No puede dejar espacios nulos al crear un pokemon.');
        return;
    } else {
        try {
            // Validar que todas las habilidades del array existan
            const habilidadesPromises = phabilidades.map(async (habilidad) => {
                const habilidadBuscada = await ModelHabilidad.find({ habilidad }).lean().exec();
                if (habilidadBuscada.length === 0) {
                    res.status(404).json({Mensaje: `No hay habilidades registrados con el id ${habilidadBuscada}` });
                    return;
                }
            });

            //Esto es para que se espere a que se revisen todas las habilidades
            await Promise.all(habilidadesPromises);

            const nuevoPokemon = await ModelPokemon.create({
                nombre: pnombre,
                habilidades: phabilidades,
                tipoPrimario: ptipoPrimario,
                tipoSecundario: req.body.tipoSecundario,
                descripcion: pdescripcion
            });

            res.status(201).json(nuevoPokemon);
            return;
        } catch (error) {
            res.status(404).json({ Mensaje: error.message });
            return;
        }
    }
});

PokemonRouter.put('/:id', async (req, res) => {
    res.status(201).json({});
});

PokemonRouter.delete('/', async (req, res) => {
    res.status(201).json({});
});

export default PokemonRouter;