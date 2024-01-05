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

const authenticationMiddleware = async (req: Request, res: Response, next: () => any) => {
    const usuarioRegistrado = req.headers.authorization;

    //cuando no se pone nada, postman por defecto escribe Basic Og==
    if (usuarioRegistrado==="Basic Og==") {
        return res.status(401).json({ Message: "You didn't provide a user for authentication." });
    }

    //Decodificar la info porque viene en base64
    const [receivedName, receivedPassword] = Buffer.from(usuarioRegistrado.split(' ')[1], 'base64')
        .toString('utf-8')
        .split(':');

    const validUser = await ModelUsers.find({"name": receivedName, "password": receivedPassword}).lean().exec();
    //si encuentra un usuario con esos datos, continúa a la siguiente función (get, post,etc)
    if(validUser.length > 0){
        next();
    } else {
        return res.status(401).json({ Message: `The user ${receivedName} is not authorized.`});
    }
};


export {ModelUsers, ModelAbility, ModelPokemon,authenticationMiddleware};
