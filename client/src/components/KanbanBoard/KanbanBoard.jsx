import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Input, Button, Popconfirm, Dropdown, notification } from "antd";
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
/**
 * The KanBanBoard component is a container that renders multiple columns of statuses.
 * Each column is a container that renders a list of tasks.
 * The user can drag and drop the tasks between columns.
 * The user can also add new tasks to the columns.
 * The user can edit the name of the statuses and delete them.
 * The user can also add new statuses.
 * @param {object} props The props of the component.
 * @param {array} props.status The array of statuses.
 * @param {function} props.setStatus The function to update the state of the statuses.
 * @param {string} props.projectId The ID of the project.
 * @param {function} props.fetchData The function to fetch the data of the project.
 * @param {array} props.tasks The array of tasks.
 * @param {function} props.handleCreateStatus The function to create a new status.
 * @param {function} props.handleCreateTask The function to create a new task.
 * @param {boolean} props.isAddingTask The boolean to indicate if the user is adding a new task.
 * @param {function} props.setIsAddingTask The function to update the state of the isAddingTask.
 * @param {boolean} props.isAddingStatus The boolean to indicate if the user is adding a new status.
 * @param {function} props.setIsAddingStatus The function to update the state of the isAddingStatus.
 * @param {string} props.taskName The name of the new task.
 * @param {function} props.setTaskName The function to update the state of the taskName.
 * @param {string} props.statusName The name of the new status.
 * @param {function} props.setStatusName The function to update the state of the statusName.
 * @param {array} props.members The array of members of the project.
 * @param {function} props.handleDeleteTask The function to delete a task.
 */

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
    // Lưu lại index dưới dạng chuỗi để lấy ở onDrop
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
        response.result.data.content.filter((s) => s.project === projectId)
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

  const getDropdownMenu = (index, item) => ({
    items: [
      {
        key: "edit",
        icon: <EditOutlined />,
        label: "Edit",
        onClick: () => handleEdit(index, item.statusName),
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
        .filter((item) => item.project === projectId)
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
              title={
                <div className="flex justify-between items-center">
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
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </Dropdown>
                  )}
                </div>
              }
              className={`shadow-md bg-white rounded-lg ${
                draggedIndex === index ? "scale-105 shadow-xl" : ""
              }`}
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
  tasks: PropTypes.array.isRequired,
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
  members: PropTypes.array.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};

export default KanBanBoard;
