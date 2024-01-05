import mongoose, { Schema } from "mongoose";
import express = require("express");
import UsuarioRouter from "./Routes/Usuario.route.ts";
import AbilitiesRouter from "./Routes/Abilities.route.ts";
import PokemonRouter from "./Routes/Pokemon.route.ts";


const app = express();
const port = 3000;
app.use(express.json());
app.use('/users', UsuarioRouter);
app.use('/abilities', AbilitiesRouter);
app.use('/pokemons', PokemonRouter);

const connectionString:string = 'mongodb+srv://aloga:pgsi0389@pokedexapi.53aej25.mongodb.net/pokedex';

const main = async () => {
    await mongoose.connect(connectionString);

    app.listen(port, () => {
        console.log(`Listening port ${port}.`);
    });
}

main();