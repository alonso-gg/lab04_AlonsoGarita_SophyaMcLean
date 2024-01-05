import mongoose, { Schema } from "mongoose";
import { Request, Response, NextFunction } from 'express'; //agregado para el middleware

const schemaUsers = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const ModelUsers = mongoose.model('user', schemaUsers);

const schemaHability = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

const ModelAbility = mongoose.model('ability', schemaHability);

const schemaPokemon = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    abilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ability'
      },],
    mainType: {
        type: String,
        require: true
    },
    secondType: {
        type: String
    },
    description: {
        type: String,
        require: true
    }
});

const ModelPokemon = mongoose.model('pokemon', schemaPokemon);

// const authenticationMiddleware = async (req: Request, res: Response, next: () => any) => {
//     const usuarios = await ModelUsers.find({}).lean().exec();;
//     const usuarioRegistrado = req.headers.authorization;
//     const [receivedName, receivedPassword] = Buffer.from(usuarioRegistrado.split(' ')[1], 'base64')
//     .toString('utf-8')
//     .split(':');

//     console.log(receivedName);
//     console.log(receivedPassword);
//     //decodificar el user
//     if (usuarioRegistrado === "Basic Og==") {
//         return res.status(401).json({ Message: "You didn't gave an user for authentication." });
//     }
//     else{
//         usuarios.some(usuario => {
//             if(receivedName === usuario.name && receivedPassword===usuario.password) {
//                 next();
                
//             }
//         })
//         return res.status(401).json({Message:`The user ${receivedName} is not authorized.`});

//     };

// }

const authenticationMiddleware = async (req: Request, res: Response, next: () => any) => {
    const usuarios = await ModelUsers.find({}).lean().exec();
    const usuarioRegistrado = req.headers.authorization;

    if (usuarioRegistrado==="Basic Og==") {
        return res.status(401).json({ Message: "You didn't provide a user for authentication." });
    }

    const [receivedName, receivedPassword] = Buffer.from(usuarioRegistrado.split(' ')[1], 'base64')
        .toString('utf-8')
        .split(':');

    const validUser = usuarios.some((usuario: any) => usuario.name === receivedName && usuario.password === receivedPassword);

    if (validUser) {
        next();
    } else {
        return res.status(401).json({ Message: `The user ${receivedName} is not authorized.`});
    }
};


export {ModelUsers, ModelAbility, ModelPokemon,authenticationMiddleware};
