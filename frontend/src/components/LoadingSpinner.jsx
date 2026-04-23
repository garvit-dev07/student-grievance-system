function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="spinner"></span>
      <span>{text}</span>
    </div>
  );
}

export default LoadingSpinner;
