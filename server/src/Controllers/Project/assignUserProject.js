const { failCode, successCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');
const User = require('../../Models/User.model');

const assignUserProject = async (req, res) => {
    try {
        const { projectId, userId } = req.body;

        // Find user details
        const userDetail = await User.findById(userId);
        if (!userDetail) {
            return failCode(res, "", "User does not exist!");
        }

        const newUser = {
            _id: userDetail._id,
            name: userDetail.username,
            avatar: userDetail.avatar,
            email: userDetail.email,
            phoneNumber: userDetail.phoneNumber
        };

        // Find project and add user if not already a member
        const result = await Project.findByIdAndUpdate(
            projectId,
            {
                $addToSet: { members: newUser }
            },
            { new: true }
        );

        if (!result) {
            return failCode(res, "", "Project does not exist!");
        } else {
            return successCode(res, "", "Assign user to Project success!");
        }
    } catch (error) {
        return failCode(res, "Backend error!");
    }
};

module.exports = { assignUserProject };
