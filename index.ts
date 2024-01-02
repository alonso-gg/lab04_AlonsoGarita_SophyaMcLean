import mongoose, { Schema } from "mongoose";
import { modelUsuario, modelHabilidad, modelPokemon } from './collections.ts';
import { Express, Request, Response } from "express";
import express = require("express");
import UsuarioRouter from "./Routes/Usuario.route.ts";

const app = express();
const port = 3000;
app.use(express.json());

app.use('/users', UsuarioRouter);

const connectionString:string = 'mongodb+srv://aloga:pgsi0389@pokedexapi.53aej25.mongodb.net/pokedex';

const main = async () => {
    await mongoose.connect(connectionString);

    app.listen(port, () => {
        console.log(`La aplicación está escuchando el puerto ${port}.`);
    });
}

main();