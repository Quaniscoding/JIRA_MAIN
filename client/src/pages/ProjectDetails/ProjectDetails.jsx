import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CallGetProjectById } from "../../redux/reducers/projects/getProjectById";
import { getUserData } from "../../utils/localStorage";
import { CallGetListStatus } from "../../redux/reducers/status/getStatus";
import Loading from "../../components/Loading/Loading";
import KanBanBoard from "../../components/KanbanBoard/KanbanBoard";
import { message, notification } from "antd";
import { CallCreateStatus } from "../../redux/reducers/status/createStatus";
import { CallGetTaskDetail } from "../../redux/reducers/task/getTaskDetail";
import { CallCreateTask } from "../../redux/reducers/task/createTask";
import { CallDeleteTask } from "../../redux/reducers/task/deleteTask";
/**
 * This component displays the details of a project. It fetches the project data and
 * its tasks when mounted. It also renders a KanBan board with the tasks grouped by
 * their status.
 *
 * @returns {JSX.Element} The component.
 */
export default function ProjectDetails() {
  const { id } = useParams();
  const dataUser = getUserData();
  const [data, setData] = useState({}); // Project data
  const [status, setStatus] = useState([]); // List of statuses
  const [tasks, setTasks] = useState([]); // List of tasks
  const [loading, setLoading] = useState(false); // Loading indicator
  const [isAddingTask, setIsAddingTask] = useState(false); // Is adding new task
  const [isAddingStatus, setIsAddingStatus] = useState(false); // Is adding new status
  const [taskName, setTaskName] = useState(""); // Name of the new task
  const [statusNew, setStatusNew] = useState(""); // ID of the new status
  const [statusName, setStatusName] = useState(""); // Name of the new status
  const fetchData = useCallback(async () => {
    // Fetch project data and tasks
    setLoading(true);
    const projectData = await CallGetProjectById(id);
    setData(projectData);
    const taskData = await CallGetTaskDetail(null, id);
    setTasks(taskData);
    if (dataUser._id) {
      // Fetch statuses if user is logged in
      const statusData = await CallGetListStatus(id);
      setStatus(statusData);
    }
    setLoading(false);
  }, [id, dataUser._id]);
  useEffect(() => {
    // Fetch data when mounted
    fetchData();
  }, [fetchData]);
  const handleCreateStatus = async () => {
    // Create new status
    const newStatus = {
      statusName: statusName,
      user: dataUser._id,
      project: id,
      order: status.length + 1,
    };

    const res = await CallCreateStatus(newStatus);
    if (res.isCreate) {
      // Show success notification
      notification.success({ message: "Status created successfully!" });
      // Fetch data again to update the KanBan board
      fetchData();
      setIsAddingStatus(false);
      setStatusName("");
    }
  };
  const handleCreateTask = async () => {
    // Create new task
    const res = await CallCreateTask({
      taskName,
      project: id,
      status: statusNew,
    });

    if (res.isCreate) {
      // Fetch data again to update the KanBan board
      fetchData();
      setIsAddingTask(false);
      setStatusNew("");
      setTaskName("");
      // Show success notification
      notification.success({ message: "Task created successfully!" });
    }
  };
  const handleDeleteTask = async (taskId) => {
    // Delete task
    try {
      const res = await CallDeleteTask(taskId);
      if (res.isDelete) {
        // Show success notification
        message.success("Task deleted successfully!");
        // Fetch data again to update the KanBan board
        fetchData();
      }
    } catch (error) {
      // Show error notification
      message.error(error.message || "Failed to delete task!");
    }
  };
  return (
    <div>
      {loading ? (
        // Show loading indicator if data is loading
        <Loading />
      ) : (
        // Otherwise, render the KanBan board
        <>
          <div className="inline-flex gap-1">
            <Link to="/dashboard">
              <span className="text-black underline">Dashboard</span>
            </Link>
            / <h4>{data.projectName}</h4>
          </div>
          <div className="font-semibold text-2xl">{data.projectName}</div>
          {/* KanBan Board */}
          <KanBanBoard
            status={status}
            setStatus={setStatus}
            projectId={id}
            fetchData={fetchData}
            tasks={tasks}
            handleCreateStatus={handleCreateStatus}
            handleCreateTask={handleCreateTask}
            isAddingTask={isAddingTask}
            setIsAddingTask={setIsAddingTask}
            isAddingStatus={isAddingStatus}
            setIsAddingStatus={setIsAddingStatus}
            taskName={taskName}
            setTaskName={setTaskName}
            setStatusNew={setStatusNew}
            statusName={statusName}
            setStatusName={setStatusName}
            members={data.members}
            handleDeleteTask={handleDeleteTask}
          />
        </>
      )}
    </div>
  );
}
