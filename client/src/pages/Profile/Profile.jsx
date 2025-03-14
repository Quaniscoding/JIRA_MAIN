import { useCallback, useEffect, useState } from "react";
import { getUserData } from "../../utils/localStorage";
import { CallGetUserById } from "../../redux/reducers/users/getUserById";
import { CallUpdateUser } from "../../redux/reducers/users/updateUser";
import Loading from "../../components/Loading/Loading";
import { Form, message } from "antd";
import moment from "moment";
import AvatarUpload from "../../Features/Profile/AvatarUpload";
import ProfileForm from "../../Features/Profile/ProfileForm";
import { CallUpdatePassword } from "../../redux/reducers/users/updatePassword";

export default function Profile() {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dataUser = getUserData();

  const fetchData = useCallback(async () => {
    const res = await CallGetUserById(dataUser._id);
    setData(res);
    setImageUrl(res.avatar);
    form.setFieldsValue({
      first_name: res.first_name,
      last_name: res.last_name,
      username: res.username,
      email: res.email,
      phone: res.phone,
      birth_day: moment(res.birth_day),
      gender: res.gender,
    });
    setHasChanges(false);
  }, [dataUser._id, form]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    setAvatarFile(file);
    setHasChanges(true);
    return false;
  };
  const onValuesChange = (changedValues, allValues) => {
    let isChanged = false;
    Object.keys(allValues).forEach((key) => {
      if (allValues[key] !== (data ? data[key] : undefined)) {
        isChanged = true;
      }
    });
    if (avatarFile) {
      isChanged = true;
    }
    setHasChanges(isChanged);
  };
  const onFinish = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (values[key] !== data[key]) {
        formData.append(key, values[key]);
      }
    });

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    if ([...formData.keys()].length === 0) {
      message.info("No changes detected");
      return;
    }

    setLoading(true);
    try {
      const res = await CallUpdateUser(dataUser._id, formData);
      if (res.isUpdate) {
        message.success("Profile updated successfully!");
        fetchData();
      } else {
        message.error(res.message || "Update failed!");
      }
    } catch (error) {
      message.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Xử lý đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Xử lý submit cập nhật mật khẩu
  const handleUpdatePassword = async (values) => {
    try {
      // Giả sử bạn có hàm CallUpdatePassword
      const res = await CallUpdatePassword(dataUser._id, {
        currentPassword: values.password,
        newPassword: values.new_password,
        confirmPassword: values.confirm_password,
      });

      if (res.isUpdate) {
        message.success("Password updated successfully!");
        setIsModalVisible(false);
        fetchData();
      } else {
        message.error(
          res.err.response.data.message || "Failed to update password"
        );
      }
    } catch (error) {
      message.error(error.message || "Failed to update password");
    }
  };
  if (!data) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <AvatarUpload
            imageUrl={imageUrl}
            handleAvatarChange={handleAvatarChange}
          />

          {/* Form */}
          <div className="w-full">
            <h2 className="text-3xl font-bold text-blue-900 mb-5">
              Update Profile
            </h2>
            <ProfileForm
              form={form}
              onFinish={onFinish}
              loading={loading}
              onValuesChange={onValuesChange}
              hasChanges={hasChanges}
              showModal={showModal}
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              handleUpdatePassword={handleUpdatePassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
