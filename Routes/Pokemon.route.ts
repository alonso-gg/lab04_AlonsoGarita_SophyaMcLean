import { Router } from "express";
import { ModelAbility, ModelPokemon } from "../collections";

const PokemonRouter = Router();

//Obtiene todos los pokemones registrados
PokemonRouter.get('/', async (req, res) => {
    const allPokemons = await ModelPokemon.find({}).lean().exec()
    res.status(200).json(allPokemons);
});

//Obtiene la información únicamente del pokemon con el ID indicado
PokemonRouter.get('/:id', async (req, res) => {
    const {id} = req.params; //Obtiene el id que le enviaron por parámetros
    const searchedPokemon = await ModelPokemon.find({id}).lean().exec(); 
    //Si existe ese pokemon
    if (searchedPokemon.length === 0) {
        res.status(404).json({message: `Could not find a pokemon with ID #${id}.`});
    }
    else {
        res.status(200).json(searchedPokemon);
    }        
});

//Crea un pokemon
PokemonRouter.post('/', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const abilities = req.body.abilities;
    const mainType = req.body.mainType;
    const description = req.body.description;

    if (id === null || name === null || abilities === null ||
        mainType === null || description === null) {
        res.status(500).send('Can not create a pokemon without the following data: name, abilities, mainType, description.');
        return;
    } else {
        try {
            // Validar que todas las habilidades del array existan
            const abilidadesPromises = abilities.map(async (ability) => {
                const searchedAbility = await ModelAbility.find({ ability }).lean().exec();
                if (searchedAbility.length === 0) {
                    res.status(404).json({message: `Could not find an ability with ID #${ability}`});
                    return;
                }
            });

            //Esto es para que se espere a que se revisen todas las habilidades
            await Promise.all(abilidadesPromises);

            const nuevoPokemon = await ModelPokemon.create({
                id: id,
                name: name,
                abilities: abilities,
                mainType: mainType,
                secondType: req.body.secondType,
                description: description
            });

            res.status(201).json(nuevoPokemon);
            return;
        } catch (error) {
            res.status(404).json({message: error.message});
            return;
        }
    }
});

PokemonRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const searchedPokemon = await ModelPokemon.find({id}).lean().exec(); 
    if (searchedPokemon.length === 0) {
        res.status(404).json({message: `Could not find a pokemon with ID #${id}`});
    }
    else {
        await ModelPokemon.updateOne({ id: id }, { $set: { 
            name: req.body.name,
            abilities:  req.body.abilities,
            mainType:  req.body.mainType,
            secondType: req.body.secondType,
            description:  req.body.description
        } });
        res.status(202).json({message: `Pokemon #${id} was modified successfully.`});
    }   
});

PokemonRouter.delete('/:id', async (req, res) => {
    const {id} = req.params; //Obtiene el npumero de pokemon que le enviaron por parámetros
    const searchedPokemon = await ModelPokemon.find({id}).lean().exec(); 
    if (searchedPokemon.length === 0) {
        res.status(404).json({message: `Could not find a pokemon with ID #${id}`});
    }
    else {
        await ModelPokemon.deleteOne({ id: id });
        res.status(202).json({message: `Pokemon #${id} was deleted successfully.`});
    } 
});

export default PokemonRouter;