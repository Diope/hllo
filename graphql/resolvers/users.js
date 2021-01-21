const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput} = require('../../utils/validation');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.SECRET_KEY, {expiresIn: '1h'});
}

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
            if (_user !== null) {

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

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },

        async login(_doc, {username, password}){
            const {valid, errors} = validateLoginInput(username, password);
            const _user = await User.findOne({username});

            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }

            // console.log(_user);
            if (!_user) {
                errors.general = "User does not exist, please check the username and try again."
                throw new UserInputError('User not found', {errors})
            }

            const passMatch = await bcrypt.compare(password, _user.password)
            if (!passMatch) {
                errors.general = "Incorrect password provided. Please try again";
                throw new UserInputError('Incorrect password', {errors});
            }

            const token = generateToken(_user)

            return {
                ..._user._doc,
                id: _user._id,
                token
            }
        }
    }
}