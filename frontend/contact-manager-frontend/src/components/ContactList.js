import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddContact from './AddContact';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const fetchContacts = () => {
    axios.get('http://localhost:5000/api/contacts')
      .then(res => setContacts(res.data))
      .catch(err => console.error('Error fetching contacts:', err));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      axios.delete(`http://localhost:5000/api/contacts/${id}`)
        .then(fetchContacts)
        .catch(err => console.error('Delete error:', err));
    }
  };

  const startEditing = (contact) => {
    setEditContactId(contact.id);
    setEditedData({ ...contact });
  };

  const cancelEdit = () => {
    setEditContactId(null);
    setEditedData({});
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveEdit = (id) => {
    axios.put(`http://localhost:5000/api/contacts/${id}`, editedData)
      .then(() => {
        setEditContactId(null);
        fetchContacts();
      })
      .catch(err => console.error('Edit error:', err));
  };

  return (
    <div>
      <AddContact onContactAdded={fetchContacts} />

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Favorite</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>
                {editContactId === contact.id ? (
                  <input
                    className="form-control"
                    name="fullName"
                    value={editedData.fullName}
                    onChange={handleEditChange}
                  />
                ) : (
                  contact.fullName
                )}
              </td>
              <td>
                {editContactId === contact.id ? (
                  <input
                    className="form-control"
                    name="email"
                    value={editedData.email}
                    onChange={handleEditChange}
                  />
                ) : (
                  contact.email
                )}
              </td>
              <td>
                {editContactId === contact.id ? (
                  <input
                    className="form-control"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleEditChange}
                  />
                ) : (
                  contact.phone
                )}
              </td>
              <td>
                {editContactId === contact.id ? (
                  <input
                    type="checkbox"
                    name="isFavorite"
                    checked={editedData.isFavorite}
                    onChange={handleEditChange}
                  />
                ) : (
                  contact.isFavorite ? 'Yes' : 'No'
                )}
              </td>
              <td>
                {editContactId === contact.id ? (
                  <>
                    <button className="btn btn-success btn-sm me-1" onClick={() => saveEdit(contact.id)}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning btn-sm me-1" onClick={() => startEditing(contact)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
