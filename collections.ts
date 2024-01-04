import mongoose, { Schema } from "mongoose";

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

const ModelAbility = mongoose.model('hability', schemaHability);

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
        ref: 'habilitys'
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

export {ModelUsers, ModelAbility, ModelPokemon};
