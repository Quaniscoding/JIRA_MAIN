import { useEffect } from "react";
import { Form, Input, Button, Select, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callGetProjectCategory } from "../../redux/reducers/projects/getProjectCategory";
import PropTypes from "prop-types";

export default function ModalReuse({
  open,
  onClose,
  onSubmit,
  initialValues,
  isEditing,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.getProjectCategory.projectCategory
  );

  useEffect(() => {
    if (open) {
      if (!category?.length) {
        dispatch(callGetProjectCategory());
      }
    }
  }, [dispatch, category, open]);

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          category: initialValues.category?._id, 
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  return (
    <Drawer
      closable={true}
      onClose={onClose}
      placement="right"
      title={isEditing ? "Edit Project" : "Create Project"}
      open={open}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {isEditing && (
          <Form.Item label="ID" name="_id">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[{ required: true, message: "Please enter project name!" }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select placeholder="Select category">
            {category?.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {isEditing ? "Update Project" : "Create Project"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

ModalReuse.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isEditing: PropTypes.bool,
};