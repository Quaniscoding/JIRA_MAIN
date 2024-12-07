module.exports = {
    "/api/project/deleteProject/{projectId}": {
        delete: {
            tags: ["Project"],
            "operationId": "deleteProject",
            "consumes": [
                "application/json-patch+json",
                "application/json",
                "text/json",
                "application/*+json"
            ],
            "parameters": [
                {
                    "name": "projectId",
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