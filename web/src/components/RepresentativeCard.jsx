import React from 'react';

const RepresentativeCard = ({ representative }) => {
  return (
    <div className="rep-card">
      <div className="rep-header">
        <div className="rep-avatar">
          {representative.photoUrl ? (
            <img src={representative.photoUrl} alt={representative.name} />
          ) : (
            <div className="initials">
              {representative.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        <div className="rep-info">
          <h3 className="rep-name">{representative.name}</h3>
          <p className="rep-role">{representative.role} | {representative.party}</p>
        </div>
      </div>
      <div className="contact-info">
        {representative.contact.email && (
          <p><strong>Email:</strong> {representative.contact.email}</p>
        )}
        {representative.contact.phone && (
          <p><strong>Phone:</strong> {representative.contact.phone}</p>
        )}
        {representative.contact.website && (
          <p><strong>Website:</strong> <a href={representative.contact.website} target="_blank" rel="noreferrer">{representative.contact.website}</a></p>
        )}
      </div>
      <div className="action-buttons">
        <button className="message-btn">Message</button>
        <button className="schedule-btn">Schedule Meeting</button>
      </div>
    </div>
  );
};

export default RepresentativeCard;
