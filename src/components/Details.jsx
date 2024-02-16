import React from 'react';
import '../details.css';

function Details({ details }) {
  console.log(details)
  //if (!Array.isArray(details) || !details.length) {
  //  return <div className="details-container">No details available</div>;
  //}

  return (
    <div>
      <h3>Details</h3>
      <div className="details-container">
        {details.map((detail, index) => (
          <div key={index} className="detail-item">
            <span className="detail-field-name">{detail.fieldName}:</span>
            <span className="detail-field-value">{detail.fieldValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
