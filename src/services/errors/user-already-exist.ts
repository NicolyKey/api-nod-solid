export class UserAlreadyExistError extends Error {
    constructor() {
        super('email already exist')
    }
}