export class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserError';
    }
}

export class InvalidCPFError extends UserError {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidCPFError';
    }
}

export class UserNotFoundError extends UserError {
    constructor(message: string) {
        super(message);
        this.name = 'UserNotFoundError';
    }
}