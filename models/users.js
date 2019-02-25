const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
});

UserSchema.methods.validatePassword = function(password) {
    return password === this.password;
}

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;