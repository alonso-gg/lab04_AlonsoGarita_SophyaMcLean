import mongoose, { Schema } from "mongoose";
import express = require("express");
import { Request, Response, NextFunction } from 'express'; //agregado para el middleware
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


// export const authenticationMiddleware = async (req: Request, res: Response, next: () => any) => {
//     const usuarios = await ModelUsuario.find({}).lean().exec();;
//     const usuarioRegistrado = req.headers.authorization;
//     if (usuarioRegistrado === null) {
//         return res.status(401).json({ message: 'No se proporcionó ningún usuario para autenticar.' });
//     }
//     else(
//         usuarios.forEach(usuario => {
//             if(usuarioRegistrado === `Basic ${usuario.nombre}:${usuario.contrasena}`) {
//                 next();
//             }
//             else {
//                 return res.status(401).json({ message: `El usuario ${usuarioRegistrado} no está autorizado.`});
//             }
//         })
//     );

// }


const main = async () => {
    await mongoose.connect(connectionString);

    app.listen(port, () => {
        console.log(`Listening port ${port}.`);
    });
}

main();