import PropTypes from "prop-types";

import { useState } from "react";
import { Col, Modal, Popconfirm, Row, Tooltip } from "antd";
import Comments from "./Comments";
import TaskDetails from "./TaskDetails";

import { DeleteOutlined } from "@ant-design/icons";

export default function TaskCard({
  tasks,
  statusId,
  members,
  handleDeleteTask,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const showTaskDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  if (!tasks) return null;

  return (
    <>
      <div>
        {tasks
          ?.filter((task) => task.status?._id === statusId)
          ?.map((task) => (
            <div
              key={task._id}
              className="p-2 mb-2 bg-gray-100 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-gray-200 transition"
            >
              <div
                className="flex items-center space-x-2 flex-grow"
                onClick={() => showTaskDetails(task)}
              >
                <Tooltip title="Click to view task details">
                  <div className="font-semibold min-h-[30px] text-left">
                    {task.taskName}
                  </div>
                </Tooltip>
              </div>

              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDeleteTask(task._id)}
                okText="Yes"
                cancelText="No"
              >
                <span className="text-red-500 cursor-pointer hover:text-red-700">
                  <DeleteOutlined />
                </span>
              </Popconfirm>
            </div>
          ))}
      </div>

      {/* Modal hiển thị chi tiết task */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1200}
      >
        {selectedTask && (
          <Row gutter={16}>
            <Col span={8}>
              <Comments taskId={selectedTask._id} />
            </Col>
            <Col span={16}>
              <TaskDetails
                task={selectedTask}
                onClose={() => setIsModalOpen(false)}
                members={members}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
}

TaskCard.propTypes = {
  tasks: PropTypes.array.isRequired,
  statusId: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};
