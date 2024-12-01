module.exports = {
    "/api/comment/createComment": {
        post: {
            tags: ["Comment"],
            "operationId": "createComment",
            "consumes": [
                "application/json-patch+json",
                "application/json",
                "text/json",
                "application/*+json"
            ],
            "parameters": [{
                "name": "token",
                "in": "header",
                "description": "Input token",
                "required": true,
                "type": "string"
            },
            {
                "name": "Authorization",
                "in": "header",
                "description": "Input Authorization token",
                "required": true,
                "type": "string"
            }
            ],
            "requestBody": {
                "description": "Post Comment",
                "require": "true",
                "content": {
                    " application/json": {
                        schema: {
                            $ref: "#/components/schemas/CommentModelInsert",
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