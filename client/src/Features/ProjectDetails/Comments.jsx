import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { CallGetComment } from "../../redux/reducers/comment/getComment";
import { List, Avatar, Card, Input, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getUserData } from "../../utils/localStorage";
import { CallCreateComment } from "../../redux/reducers/comment/createComment";
import { CallUpdateComment } from "../../redux/reducers/comment/updateComment";
import { CallDeleteComment } from "../../redux/reducers/comment/deleteComment";
import formatTimeAgo from "../../utils/formatTimeAgo";

export default function Comments({ taskId }) {
  const [data, setData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const fetchData = useCallback(async () => {
    const result = await CallGetComment(taskId);
    setData(result);
  }, [taskId]);
  useEffect(() => {
    if (taskId) {
      fetchData();
    }
  }, [fetchData, taskId]);
  const dataUser = getUserData();

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const newCommentData = {
      userId: dataUser._id,
      taskId: taskId,
      content: newComment,
    };

    const result = await CallCreateComment(newCommentData);
    if (result.isAdd) {
      setNewComment("");
      message.success("Comment successfully!");
      fetchData();
    } else {
      message.error("Failed to comment!");
    }
  };

  const handleEditComment = (id) => {
    setEditingCommentId(id);
    const commentToEdit = data.find((c) => c._id === id);
    setEditingText(commentToEdit.content);
  };

  const handleSaveEdit = async (id) => {
    if (!editingText.trim()) return;
    const newCommentData = {
      content: editingText,
    };
    const result = await CallUpdateComment(id, newCommentData);
    if (result.isUpdated) {
      setEditingCommentId(null);
      setEditingText("");
      message.success("Comment updated successfully!");
      fetchData();
    } else {
      message.error("Failed to update comment!");
    }
  };

  const handleDeleteComment = async (id) => {
    const result = await CallDeleteComment(id);
    if (result.isDeleted) {
      message.success("Comment deleted successfully!");
      fetchData();
    } else {
      message.error("Failed to delete comment!");
    }
  };

  return (
    <Card title="Comments" className="shadow-md rounded-lg">
      <List
        dataSource={data}
        renderItem={(comment) => (
          <List.Item className="border-b border-gray-200 py-2">
            <List.Item.Meta
              avatar={
                <Avatar className="bg-blue-500">
                  {comment.user.username.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={
                <span className="font-semibold text-gray-800">
                  {comment.user.username}
                </span>
              }
              description={
                <>
                  {editingCommentId === comment._id ? (
                    <div className="flex items-center gap-2">
                      <Input.TextArea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        rows={1}
                      />
                      <Button
                        type="primary"
                        onClick={() => handleSaveEdit(comment._id)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-600">{comment.content}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(comment.createdAt)}
                  </div>
                </>
              }
            />

            {/* Hiển thị icon Edit & Delete khi không chỉnh sửa */}
            {editingCommentId !== comment._id && (
              <div className="flex gap-2">
                <EditOutlined
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEditComment(comment._id)}
                />
                <Popconfirm
                  title="Are you sure to delete this comment?"
                  onConfirm={() => handleDeleteComment(comment._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined className="text-red-500 cursor-pointer" />
                </Popconfirm>
              </div>
            )}
          </List.Item>
        )}
      />
      <div className="mt-4 flex flex-col items-start gap-2">
        <Input.TextArea
          rows={2}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onPressEnter={handleAddComment}
          className="flex-1"
        />
        <Button type="primary" onClick={handleAddComment}>
          Comment
        </Button>
      </div>
    </Card>
  );
}

Comments.propTypes = {
  taskId: PropTypes.string,
};
