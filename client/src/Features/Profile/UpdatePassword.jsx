import { Button, Form, Input, Modal } from "antd";
import { generateStrongPassword } from "../../utils/generateStrongPassword";
import PropTypes from "prop-types";

export default function UpdatePasswordModal({
  visible,
  handleCancel,
  handleUpdatePassword,
}) {
  const [form] = Form.useForm();
  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    form.setFieldsValue({
      new_password: newPassword,
      confirm_password: newPassword,
    });
  };

  return (
    <Modal
      title="Update Password"
      open={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdatePassword}>
        <Form.Item
          label="Current Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="new_password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirm_password"
          dependencies={["new_password"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button onClick={handleGeneratePassword}>
            Generate Strong Password
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

UpdatePasswordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleUpdatePassword: PropTypes.func.isRequired,
};
