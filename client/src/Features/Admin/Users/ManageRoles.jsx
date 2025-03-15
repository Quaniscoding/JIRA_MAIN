import { useCallback, useEffect, useState } from "react";
import { Button, Input, Modal, Form, Popconfirm, message } from "antd";
import {
  CallGetAllRole,
  CallDeleteRole,
  CallUpdateRole,
  CallCreateRole,
} from "../../../redux/reducers/role/apiRole";
import ReusableTable from "../../../components/Table/Table";

export default function ManageRoles() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [form] = Form.useForm();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await CallGetAllRole();
    setData(res || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🟢 Open modal for create/update role
  const openModal = (record = null) => {
    setEditRow(record);
    form.setFieldsValue(record || { name: "", alias: "" });
    setIsModalOpen(true);
  };

  // 🟢 Handle create & update role
  const handleSave = async (values) => {
    if (editRow) {
      const res = await CallUpdateRole(editRow._id, values);
      if (res.isUpdate) {
        message.success("Role updated successfully!");
      }
    } else {
      const res = await CallCreateRole({
        name: values.name,
        alias: values.alias,
      });
      if (res.isCreate) {
        message.success("Role created successfully!");
      }
    }
    setIsModalOpen(false);
    fetchData();
  };

  // 🟢 Handle delete role
  const handleDelete = async (id) => {
    const res = await CallDeleteRole(id);
    if (res.isDelete) {
      message.success("Role deleted successfully!");
    }
    fetchData();
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "index",
      key: "index",
      render: (_value, _record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Alias",
      dataIndex: "alias",
      key: "alias",
    },
    {
      title: "Deleted",
      dataIndex: "deleted",
      key: "deleted",
      render: (deleted) => (
        <div>
          {deleted ? (
            <span className="text-green-500">Active</span>
          ) : (
            <span className="text-red-500">Deleted</span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-4">Manage Roles</h1>
      <Button type="primary" onClick={() => openModal()} className="mb-4">
        Add Role
      </Button>
      <ReusableTable
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />

      {/* 🟢 Modal for Create & Update */}
      <Modal
        title={editRow ? "Edit Role" : "Create Role"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="alias" label="Alias" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
