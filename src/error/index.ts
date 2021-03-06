export enum ErrorType {
    TYPE_USER = 0x01 << 8,
    TYPE_AUTH = 0x02 << 8,
    TYPE_POST = 0x03 << 8,

    TYPE_SYSTEM = 0xff << 8
}

export class CustomError extends Error{
    status: number;
    code: number;

    constructor(status: number, code: number, message: string) {
        super();
        this.status = status;
        this.code = code;
        this.message = message;
    }
}

export class UserError {
    static ALREADY_EXIST_EMAIL = new CustomError(409, ErrorType.TYPE_USER | 0x01, "Already Exist Email");
    static INVALID_EMAIL = new CustomError(400, ErrorType.TYPE_USER | 0x02, "Invalid Email");
    static INVALID_PASSWORD = new CustomError(400, ErrorType.TYPE_USER | 0x03, "Invalid Password");
    static INVALID_USER = new CustomError(400, ErrorType.TYPE_USER | 0x04, "Invalid User");
    static INVALID_USER_NAME = new CustomError(400, ErrorType.TYPE_USER | 0x05, "Invalid UserName");
}

export class AuthError {
    static NO_TOKEN = new CustomError(401, ErrorType.TYPE_AUTH | 0x01, "No Token");
    static INVALID_TOKEN = new CustomError(401, ErrorType.TYPE_AUTH | 0x02, "Invalid Token");
}

export class PostError {
    static NO_POST = new CustomError(404, ErrorType.TYPE_POST | 0x01, "Post Not Found");
    static NO_COMMENT = new CustomError(404, ErrorType.TYPE_POST | 0x02, "Comment Not Found");
    static NO_TITLE = new CustomError(400, ErrorType.TYPE_POST | 0x03, "No Title");
    static INVALID_COMMENT = new CustomError(400, ErrorType.TYPE_POST | 0x04, "Invalid Comment");
    static INVALID_COMMENT_ID = new CustomError(400, ErrorType.TYPE_POST | 0x05, "Invalid Comment Id");
    static INVALID_POST_ID = new CustomError(400, ErrorType.TYPE_POST | 0x06, "Invalid Post Id");
}