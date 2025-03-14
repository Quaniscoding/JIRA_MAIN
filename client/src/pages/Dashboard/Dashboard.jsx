import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { callGetListProjectByPagination } from "../../redux/reducers/projects/getProjectByPagination";
import ReusableTable from "../../components/Table/Table";
import ModalReuse from "../../components/Modal/ModalReuse";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Menu,
  notification,
  Popconfirm,
  Switch,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { getUserData } from "../../utils/localStorage";
import { callCreateProject } from "../../redux/reducers/projects/createProject";
import { callUpdateProject } from "../../redux/reducers/projects/updateProject";
import { callGetListUser } from "../../redux/reducers/users/getUser";
import ModalAddUser from "../../components/Modal/ModalAddUser";
import { callDeleteProject } from "../../redux/reducers/projects/deleteProject";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [showOnlyMyProjects, setShowOnlyMyProjects] = useState(false);
  const data = useSelector(
    (state) => state.getAllProjectByPagination.listProject
  );
  const dataUser = getUserData();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      sorter: true,
    },
    {
      title: "Alias",
      dataIndex: "alias",
      key: "alias",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      sorter: (a, b) =>
        (a.creator?.username || "").localeCompare(b.creator?.username || ""),
      render: (creator) => {
        const username = creator?.username || "Unknown";
        const avatarUrl =
          creator?.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`;

        return (
          <div className="flex items-center gap-2">
            <Tooltip title={username}>
              <Avatar src={avatarUrl} alt="avatar">
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members, record) => (
        <Avatar.Group>
          {members.map((member) => (
            <Tooltip key={member?._id} title={member?.username}>
              <Avatar
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  member?.username || "Unknown"
                )}`}
              >
                {member?.username}
              </Avatar>
            </Tooltip>
          ))}

          {record.creator?._id === dataUser._id && (
            <Avatar
              style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
              onClick={() => openMemberModal(record)}
            >
              +
            </Avatar>
          )}
        </Avatar.Group>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              {/* Project Details */}
              <Menu.Item
                key="details"
                onClick={() => handleProjectDetails(record)}
                disabled={
                  record.creator?._id !== dataUser._id &&
                  !record.members?.some((member) => member._id === dataUser._id)
                }
              >
                <InfoCircleOutlined style={{ marginRight: 8 }} />
                Project Details
              </Menu.Item>

              {/* Edit Project */}
              <Menu.Item
                key="edit"
                onClick={() => {
                  setEditingProject(record);
                  setIsModalOpen(true);
                }}
                disabled={record.creator?._id !== dataUser._id}
              >
                <EditOutlined style={{ marginRight: 8 }} />
                Edit
              </Menu.Item>

              {/* Delete Project */}
              <Menu.Item
                key="delete"
                disabled={record.creator?._id !== dataUser._id}
              >
                <Popconfirm
                  title="Are you sure you want to delete this project?"
                  onConfirm={() => handleDeleteProject(record._id)}
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                  disabled={record.creator?._id !== dataUser._id}
                >
                  <DeleteOutlined style={{ marginRight: 8, color: "red" }} />
                  Delete
                </Popconfirm>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const rs = await dispatch(
        callGetListProjectByPagination(
          pageSize,
          pageIndex,
          debouncedSearchQuery,
          sort,
          sortBy
        )
      );
      if (rs) {
        setPageSize(Number(rs.pageSize || pageSize));
        setPageIndex(Number(rs.pageIndex || pageIndex));
        setPageCount(Number(rs.pageCount || pageCount));
        setTotal(Number(rs.totalRow || total));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [
    dispatch,
    pageSize,
    pageIndex,
    debouncedSearchQuery,
    sort,
    sortBy,
    pageCount,
    total,
  ]);

  const fetchUser = useCallback(async () => {
    const res = await dispatch(callGetListUser());
    setUsersList(res);
  }, [dispatch]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    fetchData();
    fetchUser();
  }, [fetchData, fetchUser]);
  const handleProjectDetails = (project) => {
    navigate(`/project/details/${project._id}`);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      setSort(sorter.order === "ascend" ? "asc" : "desc");
      setSortBy(sorter.field);
    } else {
      setSort("desc");
      setSortBy("createdAt");
    }
  };

  const handleAddMembers = async () => {
    if (!currentProject || !Array.isArray(currentProject.members)) {
      notification.error({ message: "Project members are undefined!" });
      return;
    }

    if (!selectedUsers || selectedUsers.length === 0) {
      notification.warning({ message: "Please select at least one user!" });
      return;
    }

    const updatedMembers = [
      ...currentProject.members.map((m) => m._id),
      ...selectedUsers,
    ];

    setCurrentProject((prev) => ({ ...prev, members: updatedMembers }));

    try {
      const res = await callUpdateProject(currentProject._id, {
        members: updatedMembers,
      });

      if (res.isUpdate) {
        notification.success({ message: "Members added successfully!" });

        setTimeout(() => {
          fetchData();
        }, 100);
      } else {
        notification.error({
          message: res.message || "Failed to add members!",
        });
      }
    } catch (error) {
      console.error("Update Project Error:", error);
      notification.error({
        message: "An error occurred while adding members!",
      });
    }

    setIsModalOpenAddUser(false);
  };

  const openMemberModal = (project) => {
    setCurrentProject(project);

    setTimeout(() => {
      setIsModalOpenAddUser(true);
    }, 50);
  };
  const handleFormSubmit = async (values) => {
    const formattedAlias = values.projectName
      .toLowerCase()
      .replace(/\s+/g, "_");
    if (editingProject) {
      try {
        const res = await callUpdateProject(values._id, {
          ...values,
          alias: formattedAlias,
        });

        if (res.isUpdate) {
          notification.success({
            message: "Update project success!",
          });
        } else {
          notification.error({
            message: res.message || "Update project failed!",
          });
        }
      } catch (error) {
        console.error(error);
        notification.error({
          message: "An error occurred while updating the project!",
        });
      }
    } else {
      try {
        const res = await callCreateProject({
          ...values,
          alias: formattedAlias,
          creator: dataUser._id,
        });

        if (res.isCreate) {
          notification.success({
            message: "Create project success!",
          });
        } else {
          notification.error({
            message: res.message || "Create project failed!",
          });
        }
      } catch (error) {
        console.error(error);
        notification.error({
          message: "An error occurred while creating the project!",
        });
      }
    }

    fetchData();
    setIsModalOpen(false);
  };
  const handleDeleteProject = async (idProject) => {
    try {
      const res = await dispatch(callDeleteProject(idProject));

      if (res.isDelete) {
        notification.success({ message: "Project deleted successfully!" });
        fetchData();
      } else {
        notification.error({
          message: res.message || "Failed to delete project!",
        });
      }
    } catch (error) {
      console.error("Delete Project Error:", error);
      notification.error({
        message: "An error occurred while deleting the project!",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* Input tìm kiếm */}
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "40%",
          }}
        />

        {/* Nút tạo project */}
        <Button
          type="primary"
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
        >
          Create Project
        </Button>
      </div>
      <div className="flex justify-end mb-4">
        <Switch
          checked={showOnlyMyProjects}
          onChange={() => setShowOnlyMyProjects(!showOnlyMyProjects)}
        />
        <span className="ml-2">
          {showOnlyMyProjects ? "My Projects" : "All Projects"}
        </span>
      </div>
      {/* Bảng hiển thị dự án */}
      <ReusableTable
        columns={columns}
        dataSource={
          showOnlyMyProjects
            ? data?.result.filter(
                (project) => project.creator._id === dataUser._id
              ) || []
            : data?.result || []
        }
        rowKey="id"
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          pageSize,
          current: pageIndex,
          total,
          onChange: (page, size) => {
            setPageIndex(page);
            setPageSize(size);
          },
        }}
      />
      <ModalReuse
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialValues={editingProject}
        isEditing={!!editingProject}
      />
      <ModalAddUser
        isModalOpenAddUser={isModalOpenAddUser}
        setIsModalOpenAddUser={setIsModalOpenAddUser}
        handleAddMembers={handleAddMembers}
        setSelectedUsers={setSelectedUsers}
        usersList={usersList}
      />
    </div>
  );
}
