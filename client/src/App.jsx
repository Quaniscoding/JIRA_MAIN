import "@fontsource/inter";
import UserRoutes from "./routes/UserRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth.jsx";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
