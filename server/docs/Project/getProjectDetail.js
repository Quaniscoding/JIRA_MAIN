module.exports = {
    "/api/project/getProjectDetail/{id}": {
        get: {
            tags: ["Project"],
            "operationId": "getProjectDetail",
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
            },
            ],
            "responses": {
                "200": {
                    "description": "Success"
                }
            }
        },
    }
};