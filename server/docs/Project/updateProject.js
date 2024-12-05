module.exports = {
    "/api/project/updateProject/{id}": {
        put: {
            tags: ["Project"],
            "operationId": "updateProject",
            "consumes": [
                "application/json-patch+json",
                "application/json",
                "text/json",
                "application/*+json"
            ],
            "parameters": [{
                "name": "token",
                "in": "header",
                "description": "Nhập token",
                "required": true,
                "type": "string"
            },
            {
                "name": "id",
                "in": "path",
                "description": "Nhập Id project",
                "required": true,
                "type": "number"
            }
            ],
            "requestBody": {
                "description": "Update project",
                "require": "true",
                "content": {
                    " application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateProject",
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