import mongoose, { Schema } from "mongoose";

const schemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    contrasena: {
        type: String,
        require: true
    }
});

const ModelUsuario = mongoose.model('usuario', schemaUsuario);

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
    descripcion: {
        type: String,
        require: true
    }
});

const ModelHabilidad = mongoose.model('habilidad', schemaHabilidad);

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

const ModelPokemon = mongoose.model('pokemon', schemaPokemon);

export {ModelUsuario, ModelHabilidad, ModelPokemon};
