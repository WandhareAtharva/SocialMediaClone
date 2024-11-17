class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            data: this.data,
            message: this.message,
            success: this.success
        };
    }

    static fromError(statusCode, error) {
        return new ApiResponse(statusCode, null, error.message || "An error occurred");
    }
}

export { ApiResponse }