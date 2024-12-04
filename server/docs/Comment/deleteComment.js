module.exports = {
    "/api/deleteComment/{taskId}/{commentId}": {
        delete: {
            tags: ["Comment"],
            "operationId": "deleteComment",
            "consumes": [
                "application/json-patch+json",
                "application/json",
                "text/json",
                "application/*+json"
            ],
            "parameters": [
                {
                    "name": "taskId",
                    "in": "path",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "commentId",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }, {
                    "name": "token",
                    "in": "header",
                    "description": "Nhập token",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "Success"
                }
            }
        },
    }
};