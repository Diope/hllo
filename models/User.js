const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String // Will handle this on Graphql layer
});

module.exports = model('User', userSchema);