const Task = require('../../Models/Task.model');
const Status = require('../../Models/Status.model');
const Piority = require('../../Models/Piority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const updateStatus = async (req, res) => {
    const { taskId, statusId } = req.body; // Get taskId and statusId from the request body

    try {
        // Check if the status exists
        const statusExist = await Status.findOne({ id: statusId });
        if (!statusExist) {
            return failCode(res, "", "Status does not exist");
        }

        // Find the task by its id and update its status
        const updatedTask = await Task.findOneAndUpdate(
            { id: taskId },
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
const updatePiority = async (req, res) => {
    const { taskId, piorityId } = req.body;

    try {
        // Check if the piority exists
        const piorityExist = await Piority.findOne({ id: piorityId });
        if (!piorityExist) {
            return failCode(res, "", "Piority does not exist");
        }

        // Find the task by its id and update its piority
        const updatedTask = await Task.findOneAndUpdate(
            { id: taskId },
            { piorityId },
            { new: true }
        );

        // Check if the task exists and was updated successfully
        if (!updatedTask) {
            return failCode(res, "", "Task not found");
        }

        // Return a success response indicating that the piority was updated
        return successCode(res, "Update task successfully!", "Piority updated successfully");
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
        const updatedTask = await Task.findOneAndUpdate(
            { id: taskId },
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
        const updatedTask = await Task.findOneAndUpdate(
            { id: taskId },
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
        const updatedTask = await Task.findOneAndUpdate(
            { id: taskId },
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
module.exports = { updateStatus, updatePiority, updateDescription, updateTimeTracking, updateEstimate };
