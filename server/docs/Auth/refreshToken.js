module.exports = {
    "/api/auth/refresh-token": {
        post: {
            tags: ["Auth"],
            "operationId": "refresh-token",
            "consumes": [
                "application/json-patch+json",
                "application/json",
                "text/json",
                "application/*+json"
            ],
            "produces": [
                "application/json",
            ],
            "requestBody": {
                "description": "Refresh token",
                "require": "true",
                "content": {
                    " application/json": {
                        schema: {
                            $ref: "#/components/schemas/RefreshToken",
                        },
                    }
                },
            },
            "responses": {
                "200": {
                    "description": "Success"
                }
            }
        },
    }
};