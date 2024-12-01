module.exports = {
    "/api/user/signin": {
        post: {
            tags: ["User"],
            "operationId": "signin",
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
                "description": "Sign in",
                "require": "true",
                "content": {
                    " application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserJiraLogin",
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