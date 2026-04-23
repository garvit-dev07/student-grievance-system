function Navbar({ studentName, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand-block">
        <span className="brand-mark">SG</span>
        <div>
          <h1>Student Grievance Portal</h1>
          <p>Welcome, {studentName || "Student"}</p>
        </div>
      </div>
      <button className="btn btn-danger" type="button" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}

export default Navbar;
