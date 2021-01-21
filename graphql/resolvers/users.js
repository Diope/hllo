const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput} = require('../../utils/validation');

module.exports = {
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword}}) {
            // User validation
            const { valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            };
            // User and email are unique
            const _user = await User.findOne({$or:[{username}, {email}]});
            if (_user.username === username) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'Username is currently in use, please try another.'
                    }
                });
            } else if (_user.email === email) {
                throw new UserInputError('Email is already in use', {
                    errors: {
                        email: "Email is already in use, please use another email."
                    }
                });
            }
            // Salt and hash password + jwt
            password = await bcrypt.hash(password, 14);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, process.env.SECRET_KEY, {expiresIn: '1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}