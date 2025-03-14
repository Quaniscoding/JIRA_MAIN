import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import PropTypes from "prop-types";

export default function StatusInput({
  statusName,
  setStatusName,
  onCancel,
  handleCreateTask,
}) {
  return (
    <div className="max-w-[250px] p-2 border rounded-lg shadow-sm bg-white">
      <Input
        placeholder="Enter task name"
        value={statusName}
        onChange={(e) => setStatusName(e.target.value)}
        className="w-full mb-2"
        onPressEnter={handleCreateTask}
      />
      <div className="flex justify-start gap-2 mt-2">
        <Button
          type="default"
          onClick={handleCreateTask}
          disabled={!statusName.trim()}
        >
          <PlusOutlined /> Add list
        </Button>
        <Button type="dashed" danger onClick={onCancel}>
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
}

StatusInput.propTypes = {
  handleCreateTask: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  statusName: PropTypes.string.isRequired,
  setStatusName: PropTypes.func.isRequired,
};
