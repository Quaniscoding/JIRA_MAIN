import { Form, Input, Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../redux/reducers/auth/login";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const userLogin = { email: values.email, password: values.password };
    try {
      const response = await callLogin(userLogin)();
      if (response === true) {
        notification.success({
          message: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/dashboard");
        // Redirect or further processing
      } else {
        notification.error({
          message: "Login Failed",
          description: "Please check your credentials.",
        });
      }
    } catch (error) {
      notification.error({
        message: "System Error",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
        {/* Header */}
        <div className="bg-blue-600 rounded-t-lg p-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Welcome to Jira
          </h2>
          <p className="text-blue-100 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Email"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full bg-green-600 hover:bg-green-700 border-none h-12 font-semibold"
              >
                Sign In
              </Button>
            </Form.Item>

            {/* Forgot Password */}
            <div className="text-center text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </Form>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 text-center text-sm border-t border-gray-100">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
