

class UserDto{
    id;
    username;
    email;
    password;
    activationLink;
    constructor(user){
        this.id = user.id
        this.username = user.username
        this.email = user.email
        this.password = user.password
        this.activationLink = user.activation_link
    }
}

module.exports = UserDto