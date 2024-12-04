module.exports = {
    "/api/getUser/getUserByPagination?{pageIndex}?{pageSize}?{keyword}": {
        get: {
            tags: ["User"],
            "operationId": "getUserByPagination",
            "consumes": [
                "application/json-patch+json",
                "application/json",
                "text/json",
                "application/*+json"
            ],
            "parameters": [
                {
                    "name": "pageIndex",
                    "in": "query",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                }, {
                    "name": "pageSize",
                    "in": "query",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                },
                {
                    "name": "keyword",
                    "in": "query",
                    "type": "string",
                },
                {
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