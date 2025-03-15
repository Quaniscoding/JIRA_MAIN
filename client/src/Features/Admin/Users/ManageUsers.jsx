import { useCallback, useEffect, useState } from "react";
import {
  CallGetListUserByPagination,
  CallUpdateUser,
} from "../../../redux/reducers/users/apiUser";
import ReusableTable from "../../../components/Table/Table";
import { CallGetAllRole } from "../../../redux/reducers/role/apiRole";
import { message, Select } from "antd";

export default function ManageUsers() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    sortBy: "",
    sort: "",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await CallGetListUserByPagination(
      payload.page,
      payload.limit,
      payload.keyword,
      payload.sortBy,
      payload.sort
    );
    setData(res?.result || []);
    setLoading(false);
  }, [payload]);

  const fetchDataRole = useCallback(async () => {
    const res = await CallGetAllRole();
    setRole(res || []);
  }, []);

  useEffect(() => {
    fetchData();
    fetchDataRole();
  }, [fetchData, fetchDataRole]);

  // 🟢 Handle Update Role & Deleted
  const handleUpdate = async (userId, key, value) => {
    try {
      await CallUpdateUser(userId, { [key]: value });
      message.success("Updated successfully!");
      fetchData();
    } catch (error) {
      message.error(error || "Update failed!");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "index",
      key: "index",
      sorter: true,
      render: (_value, _record, index) => index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Birth day",
      dataIndex: "birth_day",
      key: "birth_day",
      sorter: true,
      render: (value) => {
        if (!value) return "N/A";
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
      render: (roleData, record) => (
        <Select
          style={{ width: 120 }}
          value={roleData?._id}
          defaultValue={roleData?.name}
          onChange={(value) => handleUpdate(record._id, "role", value)}
        >
          {role.map((r) => (
            <Select.Option key={r._id} value={r._id}>
              {r.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "deleted",
      key: "deleted",
      sorter: true,
      render: (deleted, record) => (
        <Select
          style={{ width: 100 }}
          value={deleted ? "Active" : "Deleted"}
          onChange={(value) =>
            handleUpdate(record._id, "deleted", value === "active")
          }
        >
          <Select.Option value="false">Active</Select.Option>
          <Select.Option value="true">Deleted</Select.Option>
        </Select>
      ),
    },
  ];
  const handleTableChange = (pagination, filters, sorter) => {
    setPayload((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
      sortBy: sorter.order ? sorter.field : "createdAt",
      sort: sorter.order
        ? sorter.order === "ascend"
          ? "asc"
          : "desc"
        : "desc",
    }));
  };
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-4">Manage Users</h1>
      <ReusableTable
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: payload.page,
          pageSize: payload.limit,
          total: data.pageCount,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}
