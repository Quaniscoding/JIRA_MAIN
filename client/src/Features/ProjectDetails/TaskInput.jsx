import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import PropTypes from "prop-types";

export default function TaskInput({
  taskName,
  setTaskName,
  onCancel,
  handleCreateTask,
}) {
  return (
    <div className=" p-2 border rounded-lg shadow-sm bg-white">
      <Input
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="w-full mb-2"
        onPressEnter={handleCreateTask}
      />
      <div className="flex justify-start gap-2 mt-2">
        <Button
          type="default"
          onClick={handleCreateTask}
          disabled={!taskName.trim()}
        >
          <PlusOutlined /> Add card
        </Button>
        <Button type="dashed" danger onClick={onCancel}>
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
}
TaskInput.propTypes = {
  handleCreateTask: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  taskName: PropTypes.string.isRequired,
  setTaskName: PropTypes.func.isRequired,
};
