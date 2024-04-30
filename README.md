# Collections  

## Users
Descripción: Modelo para almacenar información de usuarios.
Campos:
- name:
  - Tipo: String
  - Requerido: Sí
  - Descripción: El nombre del usuario.
- password:
  - Tipo: String
  - Requerido: Sí
  - Descripción: La contraseña del usuario.

## Ability
Descripción: Modelo para almacenar información sobre las habilidades.
Campos
- id:
  - Tipo: Number
  - Requerido: Sí
  - Descripción: El identificador único de la habilidad.
- name:
  - Tipo: String
  - Requerido: Sí
  - Descripción: El nombre de la habilidad.
- description:
  - Tipo: String
  - Requerido: Sí
  - Descripción: Una descripción de la habilidad.

## Pokemon
Descripción: Modelo para almacenar información sobre Pokémon.
Campos:
- id:
  - Tipo: Number
  - Requerido: Sí
  - Descripción: El identificador único del Pokémon.
- name:
  - Tipo: String
  - Requerido: Sí
  - Descripción: El nombre del Pokémon.
- abilities:
  - Tipo: Array de ObjectIds referenciando a habilidades (ability)
  - Descripción: Las habilidades que posee el Pokémon.
- mainType:
  - Tipo: String
  - Requerido: Sí
  - Descripción: El tipo principal del Pokémon.
- secondType:
  - Tipo: String
  - Requerido: No
  - Descripción: El segundo tipo opcional del Pokémon.
- description:
  - Tipo: String
  - Requerido: Sí
  - Descripción: Una descripción del Pokémon.
 
# REST API

/users
- GET:
  Descripción: Obtiene una lista de todos los usuarios.
- POST:
  Descripción: Crea un nuevo usuario.
- PUT /{username}:
  Descripción: Modifica un usuario existente.
  Parámetros de ruta:
  - {username}: El nombre de usuario a modificar.
- DELETE /{username}:
  Descripción: Borra un usuario existente.
  Parámetros de ruta:
  - {username}: El nombre de usuario a borrar.

/pokemon
- GET:
  Descripción: Obtiene una lista de todos los Pokémon.
- GET /{pokedexNumber}:
  Descripción: Obtiene un Pokémon por su número en la Pokédex.
  Parámetros de ruta:
  - {pokedexNumber}: El número en la Pokédex del Pokémon.
- POST:
  Descripción: Crea un nuevo Pokémon.
- PUT /{pokedexNumber}:
  Descripción: Modifica un Pokémon existente.
  Parámetros de ruta:
  - {pokedexNumber}: El número en la Pokédex del Pokémon a modificar.
- DELETE:
  Descripción: Borra un Pokémon existente.

/abilities
- GET:
  Descripción: Obtiene una lista de todas las habilidades.
- POST:
  Descripción: Crea una nueva habilidad.
