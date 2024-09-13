class UserServiceUseCase {

    execute({ username, email, password }) {
        return User.create({ username, email, password });
    }

}