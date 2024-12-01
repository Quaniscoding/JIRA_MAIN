module.exports = {
    "components": {
        "schemas": {
            "CommentModelInsert": {
                "type": "object",
                "properties": {
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task this comment is associated with"
                    },
                    "contentComment": {
                        "type": "string",
                        "description": "The content of the comment"
                    }
                }
            },
            "ProjectInsert": {
                "type": "object",
                "properties": {
                    "projectName": {
                        "type": "string",
                        "description": "The name of the project"
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the project"
                    },
                    "categoryId": {
                        "type": "string",
                        "description": "The ID of the project category"
                    },
                    "alias": {
                        "type": "string",
                        "description": "The alias of the project"
                    }
                }
            },
            "ProjectUpdate": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The ID of the project"
                    },
                    "projectName": {
                        "type": "string",
                        "description": "The name of the project"
                    },
                    "creator": {
                        "type": "string",
                        "description": "The creator of the project"
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the project"
                    },
                    "categoryId": {
                        "type": "string",
                        "description": "The ID of the project category"
                    }
                }
            },
            "UserProject": {
                "type": "object",
                "properties": {
                    "projectId": {
                        "type": "string",
                        "description": "The ID of the project"
                    },
                    "userId": {
                        "type": "string",
                        "description": "The ID of the user"
                    }
                }
            },
            "TaskUser": {
                "type": "object",
                "properties": {
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task"
                    },
                    "userId": {
                        "type": "string",
                        "description": "The ID of the user associated with the task"
                    }
                }
            },
            "UpdateStatusVM": {
                "type": "object",
                "properties": {
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task"
                    },
                    "statusId": {
                        "type": "string",
                        "description": "The ID of the new status for the task"
                    }
                }
            },
            "UpdatePriority": {
                "type": "object",
                "properties": {
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task"
                    },
                    "priorityId": {
                        "type": "string",
                        "description": "The ID of the new priority for the task"
                    }
                }
            },
            "UpdateDescription": {
                "type": "object",
                "properties": {
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task"
                    },
                    "description": {
                        "type": "string",
                        "description": "The new description for the task"
                    }
                }
            },
            "TimeTrackingUpdate": {
                "type": "object",
                "properties": {
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task"
                    },
                    "timeTrackingSpent": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The new value for time spent on the task"
                    },
                    "timeTrackingRemaining": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The new value for time remaining on the task"
                    }
                }
            },
            "UpdateEstimate": {
                "type": "object",
                "properties": {
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task"
                    },
                    "originalEstimate": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The new value for the original estimate of the task"
                    }
                }
            },
            "TaskInsert": {
                "type": "object",
                "properties": {
                    "listUserAssign": {
                        "type": "array",
                        "items": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "description": "The list of user IDs assigned to the task"
                    },
                    "taskName": {
                        "type": "string",
                        "description": "The name of the task"
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the task"
                    },
                    "statusId": {
                        "type": "string",
                        "description": "The ID of the status of the task"
                    },
                    "originalEstimate": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The original estimate for the task"
                    },
                    "timeTrackingSpent": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The time spent on the task"
                    },
                    "timeTrackingRemaining": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The remaining time for the task"
                    },
                    "projectId": {
                        "type": "string",
                        "description": "The ID of the project to which the task belongs"
                    },
                    "typeId": {
                        "type": "string",
                        "description": "The ID of the type of the task"
                    },
                    "priorityId": {
                        "type": "string",
                        "description": "The ID of the priority of the task"
                    }
                }
            },
            "TaskEdit": {
                "type": "object",
                "properties": {
                    "listUserAssign": {
                        "type": "array",
                        "items": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "description": "The list of user IDs assigned to the task"
                    },
                    "taskId": {
                        "type": "string",
                        "description": "The ID of the task"
                    },
                    "taskName": {
                        "type": "string",
                        "description": "The name of the task"
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the task"
                    },
                    "statusId": {
                        "type": "string",
                        "description": "The ID of the status of the task"
                    },
                    "originalEstimate": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The original estimate for the task"
                    },
                    "timeTrackingSpent": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The time spent on the task"
                    },
                    "timeTrackingRemaining": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The remaining time for the task"
                    },
                    "projectId": {
                        "type": "string",
                        "description": "The ID of the project to which the task belongs"
                    },
                    "typeId": {
                        "type": "string",
                        "description": "The ID of the type of the task"
                    },
                    "priorityId": {
                        "type": "string",
                        "description": "The ID of the priority of the task"
                    }
                }
            },
            "UserJiraModel": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "The email of the user"
                    },
                    "passWord": {
                        "type": "string",
                        "description": "The password of the user"
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the user"
                    },
                    "phoneNumber": {
                        "type": "string",
                        "description": "The phone number of the user"
                    }
                }
            },
            "UserJiraModelUpdate": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The ID of the user"
                    },
                    "passWord": {
                        "type": "string",
                        "description": "The new password of the user"
                    },
                    "email": {
                        "type": "string",
                        "description": "The new email of the user"
                    },
                    "name": {
                        "type": "string",
                        "description": "The new name of the user"
                    },
                    "phoneNumber": {
                        "type": "string",
                        "description": "The new phone number of the user"
                    }
                }
            },
            "UserJiraLogin": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "The email of the user"
                    },
                    "pass_word": {
                        "type": "string",
                        "description": "The password of the user"
                    }
                }
            },
            "DangNhapFacebookViewModel": {
                "type": "object",
                "properties": {
                    "facebookToken": {
                        "type": "string",
                        "description": "The Facebook token used for authentication"
                    }
                },
                "required": ["facebookToken"]
            }
        },
    }
};
