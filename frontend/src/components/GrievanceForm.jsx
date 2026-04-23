const emptyForm = {
  title: "",
  description: "",
  category: "Academic",
  status: "Pending"
};

function GrievanceForm({ form, setForm, editingId, onSubmit, onCancel, saving }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <h2>{editingId ? "Update Grievance" : "Submit Grievance"}</h2>
          <p>{editingId ? "Edit the selected grievance details." : "Share the issue with clear details."}</p>
        </div>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter grievance title"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Explain your issue clearly"
            rows="5"
            required
          />
        </label>

        <div className="two-column">
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="Academic">Academic</option>
              <option value="Hostel">Hostel</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </label>
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Submit Grievance"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export { emptyForm };
export default GrievanceForm;
