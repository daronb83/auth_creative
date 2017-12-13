var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    hashed_password: String,
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
    backstory: String
});

mongoose.model('User', PersonSchema);
