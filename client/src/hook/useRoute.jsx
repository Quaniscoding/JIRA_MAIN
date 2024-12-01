import { useParams, useNavigate, useSearchParams } from "react-router-dom";
export default function useRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return { params, navigate, searchParams: [searchParams, setSearchParams] };
}
