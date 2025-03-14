import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Progress,
  Card,
  Row,
  Col,
  Slider,
  notification,
} from "antd";
import { CallGetListTaskType } from "../../redux/reducers/task/getAllTaskType";
import { CallGetListPriority } from "../../redux/reducers/task/getAllPriority";
import { CallUpdateTask } from "../../redux/reducers/task/updateTask";

export default function TaskDetails({ task, onClose, members }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [originalEstimate, setOriginalEstimate] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [taskTypes, setTaskTypes] = useState([]);
  const [priority, setPriority] = useState([]);
  useEffect(() => {
    if (task) {
      form.resetFields();
      form.setFieldsValue({
        taskName: task.taskName,
        description: task.description,
        originalEstimate: task.originalEstimate,
        timeTrackingSpent: task.timeTrackingSpent,
        timeTrackingRemaining: task.timeTrackingRemaining,
        reporter: task.reporter,
        type: task.type?._id || null,
        priority: task.priority?._id || null,
      });

      setOriginalEstimate(task.originalEstimate || 0);
      setTimeSpent(task.timeTrackingSpent || 0);
      setTimeRemaining(task.timeTrackingRemaining || 0);
    }
  }, [task, form]);

  useEffect(() => {
    const fetchTaskTypes = async () => {
      try {
        const taskTypeRes = await CallGetListTaskType();
        setTaskTypes(taskTypeRes);
        const priorityRes = await CallGetListPriority();
        setPriority(priorityRes);
      } catch (error) {
        console.error("Error fetching task types:", error);
      }
    };
    fetchTaskTypes();
  }, []);
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validate form fields
      const values = await form.validateFields();

      // Gộp dữ liệu thành object hợp lý
      const finalValues = {
        ...values,
        originalEstimate,
        timeTrackingSpent: timeSpent,
        timeTrackingRemaining: timeRemaining,
      };

      // Kiểm tra taskId an toàn
      const taskId = task?._id;
      if (!taskId) {
        throw new Error("Task ID is missing");
      }
      const res = await CallUpdateTask(taskId, finalValues);
      if (res.isUpdated) {
        notification.success({
          message: "Success",
          description: "Update task successfully!",
        });
        onClose();
      } else {
        notification.error({
          message: "Error",
          description: "Update task failed!",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Validation Failed:", error);
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        {/* Cột Details */}
        <Col lg={12}>
          <Card title="Task Details" className="shadow-md rounded-lg p-4">
            <Form.Item
              name="taskName"
              label="Task Name"
              rules={[{ required: true, message: "Task name is required" }]}
            >
              <Input placeholder="Enter task name" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter task description" rows={4} />
            </Form.Item>

            <Form.Item name="type" label="Task Type">
              <Select
                placeholder="Select task type"
                options={taskTypes.map((taskType) => ({
                  label: taskType.name,
                  value: taskType._id,
                }))}
              />
            </Form.Item>

            <Form.Item name="priority" label="Priority">
              <Select
                placeholder="Select priority"
                options={priority.map((priority) => ({
                  label: priority.name,
                  value: priority._id,
                }))}
              />
            </Form.Item>

            <Form.Item name="listUserAssign" label="Assignees">
              <Select
                mode="multiple"
                placeholder="Select users"
                style={{ width: "100%" }}
              >
                {members.map((user) => (
                  <Select.Option key={user._id} value={user._id}>
                    {user.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Card>
        </Col>

        {/* Cột Time Tracking */}
        <Col lg={12}>
          <Card title="Time Tracking" className="shadow-md rounded-lg p-4">
            {/* Original Estimate */}
            <Form.Item label="Original Estimate (hours)">
              <Input
                value={originalEstimate}
                onChange={(e) =>
                  setOriginalEstimate(Number(e.target.value) || 0)
                }
                className="w-full"
                type="number"
                min={0}
              />
            </Form.Item>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress
                percent={
                  originalEstimate > 0
                    ? (timeSpent / originalEstimate) * 100
                    : 0
                }
                showInfo
                strokeColor="#52c41a"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Spent: {timeSpent}h</span>
                <span>
                  Remaining: {Math.max(originalEstimate - timeSpent, 0)}h
                </span>
              </div>
            </div>

            {/* Time Spent */}
            <Form.Item label="Time Spent (hours)">
              <Slider
                value={timeSpent}
                onChange={(value) => setTimeSpent(value)}
                className="w-full"
                min={0}
                max={originalEstimate}
              />
            </Form.Item>

            {/* Time Remaining */}
            <Form.Item label="Time Remaining (hours)">
              <Slider
                value={originalEstimate - timeSpent}
                className="w-full"
                min={0}
                max={originalEstimate - timeSpent}
                disabled
              />
            </Form.Item>
          </Card>
        </Col>
      </Row>

      {/* Button Actions */}
      <Row className="flex justify-end mt-4">
        <Col>
          <Button key="cancel" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

TaskDetails.propTypes = {
  task: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
};
