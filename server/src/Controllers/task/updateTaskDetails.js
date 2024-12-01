const Task = require('../../Models/Task.model');
const Status = require('../../Models/Status.model');
const Priority = require('../../Models/Priority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const updateStatus = async (req, res) => {
    const { taskId, statusId } = req.body; // Get taskId and statusId from the request body

    try {
        // Check if the status exists
        const statusExist = await Status.findById(statusId);
        if (!statusExist) {
            return failCode(res, "", "Status does not exist");
        }

        // Find the task by its id and update its status
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { statusId },
            { new: true }
        );

        // Check if the task exists and was updated successfully
        if (!updatedTask) {
            return failCode(res, "", "Task not found");
        }

        // Return a success response indicating that the status was updated
        return successCode(res, "Update task successfully!", "Status updated successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};
const updatePriority = async (req, res) => {
    const { taskId, priorityId } = req.body;

    try {
        // Check if the priority exists
        const priorityExist = await Priority.findById(priorityId);
        if (!priorityExist) {
            return failCode(res, "", "Priority does not exist");
        }

        // Find the task by its id and update its priority
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { priorityId },
            { new: true }
        );

        // Check if the task exists and was updated successfully
        if (!updatedTask) {
            return failCode(res, "", "Task not found");
        }

        // Return a success response indicating that the priority was updated
        return successCode(res, "Update task successfully!", "Priority updated successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

// Update description of a task
const updateDescription = async (req, res) => {
    const { taskId, description } = req.body;

    try {
        // Find the task by its id and update its description
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { description },
            { new: true }
        );

        // Check if the task exists and was updated successfully
        if (!updatedTask) {
            return failCode(res, "", "Task not found");
        }

        // Return a success response indicating that the description was updated
        return successCode(res, "Update task successfully!", "Description updated successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

// Update time tracking of a task
const updateTimeTracking = async (req, res) => {
    const { taskId, timeTrackingSpent, timeTrackingRemaining } = req.body;

    try {
        // Find the task by its id and update its time tracking
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { timeTrackingSpent, timeTrackingRemaining },
            { new: true }
        );

        // Check if the task exists and was updated successfully
        if (!updatedTask) {
            return failCode(res, "", "Task not found");
        }

        // Return a success response indicating that the time tracking was updated
        return successCode(res, "Update task successfully!", "Time tracking updated successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

// Update estimate of a task
const updateEstimate = async (req, res) => {
    const { taskId, originalEstimate } = req.body;

    try {
        // Find the task by its id and update its estimate
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { originalEstimate },
            { new: true }
        );

        // Check if the task exists and was updated successfully
        if (!updatedTask) {
            return failCode(res, "", "Task not found");
        }

        // Return a success response indicating that the estimate was updated
        return successCode(res, "Update task successfully!", "Estimate updated successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};
module.exports = { updateStatus, updatePriority, updateDescription, updateTimeTracking, updateEstimate };
