import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
}
