var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

mongoose.model('Character', CharacterSchema);
