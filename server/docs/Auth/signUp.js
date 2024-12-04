module.exports = {
    "/api/auth/signup": {
        post: {
            "tags": [
                "Auth"
            ],
            "operationId": "DangKy",
            "consumes": [
                "application/json-patch+json",
                "application/json",
                "text/json",
                "application/*+json"
            ],
            "requestBody": {
                "description": "Sign up",
                "require": "true",
                "content": {
                    " application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserJiraModel",
                        },

                    }
                },
            },
            "responses": {
                "200": {
                    "description": "Success"
                }
            }
        }
    },
};