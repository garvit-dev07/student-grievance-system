import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import Message from "../components/Message.jsx";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      setLoading(true);
      const response = await api.post("/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("student", JSON.stringify(response.data.student));
      navigate("/dashboard");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Login failed. Please check your details."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Student Login</h1>
        <p>Access your dashboard and track grievance status.</p>
        <Message type={message.type} text={message.text} />

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>
          <button className="btn btn-primary full-width" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          New student? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
