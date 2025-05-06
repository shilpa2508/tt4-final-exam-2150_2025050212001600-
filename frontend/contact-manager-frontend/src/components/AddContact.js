import React, { useState } from 'react';
import axios from 'axios';

const AddContact = ({ onContactAdded }) => {
  const [contact, setContact] = useState({
    fullName: '',
    email: '',
    phone: '',
    isFavorite: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/contacts', contact)
      .then(() => {
        setContact({ fullName: '', email: '', phone: '', isFavorite: false });
        onContactAdded(); // Refresh list
      })
      .catch(err => console.error('Error adding contact:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Add New Contact</h5>
      <div className="mb-2">
        <input className="form-control" name="fullName" placeholder="Full Name" value={contact.fullName} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input className="form-control" name="email" placeholder="Email" value={contact.email} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input className="form-control" name="phone" placeholder="Phone" value={contact.phone} onChange={handleChange} required />
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="isFavorite" checked={contact.isFavorite} onChange={handleChange} />
        <label className="form-check-label">Favorite</label>
      </div>
      <button className="btn btn-primary" type="submit">Add Contact</button>
    </form>
  );
};

export default AddContact;
