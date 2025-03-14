import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Upload } from "antd";
import PropTypes from "prop-types";

export default function AvatarUpload({ imageUrl, handleAvatarChange }) {
  return (
    <div className="text-center">
      <Avatar size={128} src={imageUrl} icon={<UserOutlined />} />
      <Upload showUploadList={false} beforeUpload={handleAvatarChange}>
        <Button icon={<UploadOutlined />} className="mt-2">
          Change Profile Picture
        </Button>
      </Upload>
    </div>
  );
}

AvatarUpload.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
};
