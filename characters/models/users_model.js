var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterSchema = new Schema({
    name: String,
    class: String,
    race: String,
    background: String,
    img: String,
    str: Number,
    agi: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number,
    armor: Number,
    initiative: Number,
    movement: Number,
    attacks: String,
    spells: String,
    inventory: String
});

var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    hashed_password: String,
    characters: [CharacterSchema]
});

mongoose.model('User', UserSchema);
mongoose.model('Character', CharacterSchema);
