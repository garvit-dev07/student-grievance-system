import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const student = localStorage.getItem("student");

  if (!token || !student) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
