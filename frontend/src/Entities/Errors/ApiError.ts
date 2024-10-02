export class ApiError extends Error {
    errorId: string | undefined;
    
    constructor(error: Error, errorId: string | undefined) {
        super(error.message);

        this.errorId = errorId;
    }
}