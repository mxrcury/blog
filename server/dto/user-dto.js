

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
        this.jobPosition = user.job_position
        this.skills = user.skills
        this.companyName = user.company_name
        this.age = user.age
    }
}

module.exports = UserDto