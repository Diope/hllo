module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username cannot be empty, please provide a username"
    } else if (username.length < 3) {
        errors.username = "Username length must be at least 3 characters"
    }

    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.match(emailRegEx)) {
            errors.email = "Must be a valid email address, please provide another email"
        }
    }

    if (password ==='') {
        errors.password = 'Password cannot be empty, please provide a password'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match, please reenter your passwords'
    } else {
        const passRegEx = /^(.{0,6}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/

        if (password.match(passRegEx)) {
            errors.password = "Password invalid. Must be minimum of 7 characters with one uppercase, one lowercase, a special character, and a number. Please check your password and try again."
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    
    if (username.trim() === '') {
        errors.username = "Username cannot be empty, please provide a username"
    }
    if (password === '') {
        errors.password = 'Password cannot be empty, please provide a password';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}