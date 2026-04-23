import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Message from "../components/Message.jsx";
import GrievanceForm, { emptyForm } from "../components/GrievanceForm.jsx";
import GrievanceList from "../components/GrievanceList.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import api from "../services/api.js";

function Dashboard() {
  const navigate = useNavigate();
  const [student] = useState(() => JSON.parse(localStorage.getItem("student")) || {});
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchGrievances = async (title = "") => {
    try {
      setLoading(true);
      const endpoint = title.trim()
        ? `/grievances/search?title=${encodeURIComponent(title.trim())}`
        : "/grievances";
      const response = await api.get(endpoint);
      setGrievances(response.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Unable to load grievances."
      });
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchGrievances(searchTitle);
    }, 350);

    return () => clearTimeout(delaySearch);
  }, [searchTitle]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      setSaving(true);
      if (editingId) {
        const response = await api.put(`/grievances/${editingId}`, form);
        setMessage({ type: "success", text: response.data.message });
      } else {
        const response = await api.post("/grievances", form);
        setMessage({ type: "success", text: response.data.message });
      }

      resetForm();
      fetchGrievances(searchTitle);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Action failed. Please try again."
      });
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (grievance) => {
    setEditingId(grievance._id);
    setForm({
      title: grievance.title,
      description: grievance.description,
      category: grievance.category,
      status: grievance.status
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this grievance?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(`/grievances/${id}`);
      setMessage({ type: "success", text: response.data.message });
      fetchGrievances(searchTitle);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Delete failed. Please try again."
      });
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchGrievances(searchTitle);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <Navbar studentName={student.name} onLogout={handleLogout} />
      <main className="dashboard-content">
        <Message type={message.type} text={message.text} />

        <GrievanceForm
          form={form}
          setForm={setForm}
          editingId={editingId}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          saving={saving}
        />

        <section className="panel">
          <div className="section-heading">
            <div>
              <h2>My Grievances</h2>
              <p>View, search, update and delete submitted grievances.</p>
            </div>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="search"
                value={searchTitle}
                onChange={(event) => setSearchTitle(event.target.value)}
                placeholder="Search by title"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => setSearchTitle("")}>
                Reset
              </button>
            </form>
          </div>

          {loading ? (
            <LoadingSpinner text="Fetching grievances..." />
          ) : (
            <GrievanceList grievances={grievances} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
