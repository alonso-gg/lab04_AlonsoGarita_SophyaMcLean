import mongoose, { Schema } from "mongoose";

const schemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    constrasena: {
        type: String,
        require: true
    }
});

const modelUsuario = mongoose.model('usuario', schemaUsuario);

const schemaHabilidad = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true
    },
    descricion: {
        type: String,
        require: true
    }
});

const modelHabilidad = mongoose.model('habilidad', schemaHabilidad);

const schemaPokemon = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true
    },
    habilidades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habilidad'
      },],
    tipoPrimario: {
        type: String,
        require: true
    },
    tipoSecundario: {
        type: String
    },
    descricion: {
        type: String,
        require: true
    }
});

const modelPokemon = mongoose.model('pokemon', schemaPokemon);

export {modelUsuario, modelHabilidad, modelPokemon};
