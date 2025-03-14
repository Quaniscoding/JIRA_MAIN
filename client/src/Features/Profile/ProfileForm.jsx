import { Button, DatePicker, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import UpdatePasswordModal from "./UpdatePassword";

export default function ProfileForm({
  form,
  onFinish,
  loading,
  hasChanges,
  onValuesChange,
  showModal,
  isModalVisible,
  handleCancel,
  handleUpdatePassword,
}) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="first_name" label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="birth_day" label="Birth Date">
          <DatePicker className="w-full" placement="bottomRight" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Password">
          <Button type="default" onClick={showModal} className="w-full">
            Change Password
          </Button>
        </Form.Item>
      </div>
      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={!hasChanges}
        >
          Save
        </Button>
      </div>
      <UpdatePasswordModal
        visible={isModalVisible}
        handleCancel={handleCancel}
        handleUpdatePassword={handleUpdatePassword}
      />
    </Form>
  );
}
ProfileForm.propTypes = {
  form: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  onValuesChange: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleUpdatePassword: PropTypes.func.isRequired,
};
