import { Modal, Select } from "antd";
import PropTypes from "prop-types";

export default function ModalAddUser({
  isModalOpenAddUser,
  setIsModalOpenAddUser,
  handleAddMembers,
  setSelectedUsers,
  usersList,
}) {
  return (
    <Modal
      title="Add Members"
      open={isModalOpenAddUser}
      onCancel={() => setIsModalOpenAddUser(false)}
      onOk={handleAddMembers}
    >
      <Select
        mode="multiple"
        placeholder="Select users to add"
        style={{ width: "100%" }}
        onChange={(value) => setSelectedUsers(value)}
      >
        {usersList.map((user) => (
          <Select.Option key={user._id} value={user._id}>
            {user.username}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
}

ModalAddUser.propTypes = {
  isModalOpenAddUser: PropTypes.bool.isRequired,
  setIsModalOpenAddUser: PropTypes.func.isRequired,
  handleAddMembers: PropTypes.func.isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
  usersList: PropTypes.array.isRequired,
};
