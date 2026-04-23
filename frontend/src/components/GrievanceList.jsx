function GrievanceList({ grievances, onEdit, onDelete }) {
  if (grievances.length === 0) {
    return (
      <div className="empty-state">
        <h3>No grievances found</h3>
        <p>Submit a new grievance or adjust your search title.</p>
      </div>
    );
  }

  return (
    <div className="grievance-grid">
      {grievances.map((grievance) => (
        <article className="grievance-card" key={grievance._id}>
          <div className="card-top">
            <h3>{grievance.title}</h3>
            <span className={`status ${grievance.status.toLowerCase()}`}>{grievance.status}</span>
          </div>
          <p>{grievance.description}</p>
          <div className="meta-row">
            <span className="category-pill">{grievance.category}</span>
            <span>{new Date(grievance.date).toLocaleDateString()}</span>
          </div>
          <div className="card-actions">
            <button className="btn btn-secondary" type="button" onClick={() => onEdit(grievance)}>
              Edit
            </button>
            <button className="btn btn-danger" type="button" onClick={() => onDelete(grievance._id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default GrievanceList;
