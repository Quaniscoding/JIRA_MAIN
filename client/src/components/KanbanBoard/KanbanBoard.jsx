import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Input,
  Button,
  Popconfirm,
  Dropdown,
  notification,
  ColorPicker,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CallUpdateStatus } from "../../redux/reducers/status/updateStatus";
import { CallDeleteStatus } from "../../redux/reducers/status/deleteStatus";
import TaskCard from "../../Features/ProjectDetails/TaskCard";
import TaskInput from "../../Features/ProjectDetails/TaskInput";
import StatusInput from "../../Features/ProjectDetails/StatusInput";
import { CallSwapStatus } from "../../redux/reducers/status/updateSwapStatus";
import "./kanbanBoard.css";
import { getContrastTextColor, rgbToHex } from "../../utils/colorUtils";
const KanBanBoard = ({
  status,
  setStatus,
  projectId,
  fetchData,
  tasks,
  handleCreateStatus,
  handleCreateTask,
  isAddingTask,
  isAddingStatus,
  setIsAddingTask,
  setIsAddingStatus,
  setTaskName,
  taskName,
  setStatusNew,
  statusName,
  setStatusName,
  members,
  handleDeleteTask,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newStatusList = [...status];
    const draggedItem = newStatusList[draggedIndex];
    const targetItem = newStatusList[dropIndex];

    const tempOrder = draggedItem.order;
    draggedItem.order = targetItem.order;
    targetItem.order = tempOrder;
    setStatus([...newStatusList]);

    const response = await CallSwapStatus({
      statusId1: draggedItem._id,
      statusId2: targetItem._id,
    });
    if (response.isUpdate && response.result.data) {
      setStatus(
        response.result.data.content.filter((s) => s.project._id === projectId)
      );
    }
    setDraggedIndex(null);
  };

  const handleEdit = (index, currentValue) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const handleEditSave = async (id) => {
    const updatedStatus = [...status];
    updatedStatus[editingIndex].statusName = editValue;
    setStatus(updatedStatus);

    const res = await CallUpdateStatus(id, {
      ...updatedStatus[editingIndex],
      statusName: editValue,
    });
    if (res.isUpdate) {
      notification.success({
        message: "Update status success!",
      });
    } else {
      notification.error({
        message: res.message || "Update status failed!",
      });
    }
    setEditingIndex(null);
  };

  const handleDelete = async (statusId) => {
    const res = await CallDeleteStatus(statusId);

    if (res.isDelete) {
      notification.success({
        message: "Delete status success!",
      });
      fetchData();
    } else {
      notification.error({
        message: res.message || "Delete status failed!",
      });
    }
  };
  const handleColorChange = async (statusId, color) => {
    try {
      const updatedStatus = [...status];
      const statusIndex = updatedStatus.findIndex((s) => s._id === statusId);

      if (statusIndex === -1) {
        console.error("Không tìm thấy status với ID:", statusId);
        return;
      }

      updatedStatus[statusIndex] = { ...updatedStatus[statusIndex], color };
      setStatus(updatedStatus);

      const res = await CallUpdateStatus(statusId, updatedStatus[statusIndex]);

      if (res.isUpdate) {
        message.success({
          message: "Update status success!",
        });
      } else {
        throw new Error(res.message || "Update status failed!");
      }
    } catch (error) {
      message.error({
        message: error.message || "Có lỗi xảy ra!",
      });
    }
  };

  const getDropdownMenu = (index, item) => ({
    items: [
      {
        key: "edit",
        icon: <EditOutlined />,
        label: "Edit",
        onClick: () => handleEdit(index, item.statusName),
      },
      {
        key: "changeColor",
        icon: <EditOutlined />,
        label: (
          <ColorPicker
            defaultFormat="hex"
            showText
            defaultValue={item.color}
            color={item.color}
            onChange={(color) => {
              const hex = rgbToHex(color.metaColor);
              handleColorChange(item._id, hex);
            }}
          />
        ),
      },
      {
        key: "delete",
        icon: <DeleteOutlined />,
        label: (
          <Popconfirm
            title="Are you sure you want to delete this status?"
            onConfirm={() => handleDelete(item._id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <span style={{ display: "block" }}>Delete</span>
          </Popconfirm>
        ),
      },
    ],
  });
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {status
        .filter((item) => item.project._id === projectId)
        .sort((a, b) => a.order - b.order)
        .map((item, index) => (
          <div
            key={item._id}
            className={`min-w-[250px] cursor-grab relative transition-transform duration-150 ease-in-out ${
              draggedIndex === index ? "dragging" : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <Card
              hoverable
              title={
                <div
                  className={`flex justify-between items-center text-[${getContrastTextColor(
                    item.color || "#1890ff"
                  )}]`}
                >
                  {editingIndex === index ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onPressEnter={() => handleEditSave(item._id)}
                      onBlur={() => handleEditSave(item._id)}
                      autoFocus
                    />
                  ) : (
                    item.statusName
                  )}
                  {editingIndex !== index && (
                    <Dropdown
                      menu={getDropdownMenu(index, item)}
                      trigger={["click"]}
                    >
                      <Button
                        type="text"
                        icon={
                          <EllipsisOutlined
                            style={{
                              color: getContrastTextColor(
                                item.color || "#1890ff"
                              ),
                            }}
                          />
                        }
                      />
                    </Dropdown>
                  )}
                </div>
              }
              styles={{
                header: {
                  backgroundColor: item.color ? item.color : "#1890ff",
                  fontWeight: "bold",
                },
              }}
            >
              {tasks?.length >= 0 && (
                <TaskCard
                  tasks={tasks}
                  statusId={item._id}
                  members={members}
                  handleDeleteTask={handleDeleteTask}
                />
              )}
              <div className="w-full">
                {isAddingTask[item._id] ? (
                  <TaskInput
                    onAddTask={(taskName) => {
                      setIsAddingTask((prev) => ({
                        ...prev,
                        [item._id]: false,
                      }));
                      setTaskName(taskName);
                    }}
                    onCancel={() =>
                      setIsAddingTask((prev) => ({
                        ...prev,
                        [item._id]: false,
                      }))
                    }
                    handleCreateTask={handleCreateTask}
                    taskName={taskName}
                    setTaskName={setTaskName}
                  />
                ) : (
                  <Button
                    type="dashed"
                    htmlType="button"
                    onClick={() => {
                      setIsAddingTask((prev) => ({
                        ...prev,
                        [item._id]: true,
                      }));
                      setStatusNew(item._id);
                    }}
                    className="w-full"
                  >
                    <PlusOutlined /> Add a task
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ))}
      {isAddingStatus[projectId] ? (
        <StatusInput
          onAddStatus={(statusName) => {
            setIsAddingStatus((prev) => ({
              ...prev,
              [projectId]: false,
            }));
            setStatusName(statusName);
          }}
          onCancel={() =>
            setIsAddingStatus((prev) => ({
              ...prev,
              [projectId]: false,
            }))
          }
          handleCreateTask={handleCreateStatus}
          statusName={statusName}
          setStatusName={setStatusName}
          members={members}
        />
      ) : (
        <Card>
          <Button
            type="dashed"
            htmlType="button"
            onClick={() => {
              setIsAddingStatus((prev) => ({
                ...prev,
                [projectId]: true,
              }));
            }}
            className="w-full"
          >
            <PlusOutlined /> Add another list
          </Button>
        </Card>
      )}
    </div>
  );
};

KanBanBoard.propTypes = {
  status: PropTypes.array.isRequired,
  setStatus: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  tasks: PropTypes.object,
  handleCreateStatus: PropTypes.func.isRequired,
  handleCreateTask: PropTypes.func.isRequired,
  isAddingTask: PropTypes.bool.isRequired,
  setIsAddingTask: PropTypes.func.isRequired,
  isAddingStatus: PropTypes.bool.isRequired,
  setIsAddingStatus: PropTypes.func.isRequired,
  taskName: PropTypes.string.isRequired,
  setTaskName: PropTypes.func.isRequired,
  setStatusNew: PropTypes.func.isRequired,
  statusName: PropTypes.string.isRequired,
  setStatusName: PropTypes.func.isRequired,
  members: PropTypes.array,
  handleDeleteTask: PropTypes.func.isRequired,
};

export default KanBanBoard;
