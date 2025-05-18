// components/SummaryCard.jsx
import "./SummaryCard.css";

const SummaryCard = ({ title, value, icon }) => (
  <div className="summary-card">
    <div>
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
    </div>
    <div className="card-icon">
      {icon}
    </div>
  </div>
);

export { SummaryCard };
