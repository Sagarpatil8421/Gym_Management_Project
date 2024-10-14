import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addMember, updateMember, deleteMember, getMembers, getMemberByEmail } from '../../services/firestore';
import './MemberDashboard.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
};

Modal.setAppElement('#root'); // Important for accessibility

const MemberDashboard = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', address: '' });
  const [editMemberId, setEditMemberId] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const membersData = await getMembers();
      setMembers(membersData);
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = async () => {
    try {
      const existingMembers = await getMemberByEmail(newMember.email);
      if (existingMembers.length > 0) {
        setIsModalOpen(true);
        setMembers([existingMembers[0], ...members.filter(m => m.id !== existingMembers[0].id)]); // Move existing member to top
        return;
      }

      await addMember(newMember);
      setNewMember({ name: '', email: '', phone: '', address: '' });
      setError('');
      alert('Member added successfully!');
      const updatedMembers = await getMembers();
      setMembers(updatedMembers);
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Error adding member: ' + error.message);
    }
  };

  // Define handleUpdateMember function
  const handleUpdateMember = async (id) => {
    try {
      await updateMember(id, newMember); // Update member with new data
      setNewMember({ name: '', email: '', phone: '', address: '' });
      setEditMemberId(null); // Reset the edit state
      const updatedMembers = await getMembers(); // Refresh members list after update
      setMembers(updatedMembers);
      alert('Member updated successfully!');
    } catch (error) {
      console.error('Error updating member:', error);
      setError('Error updating member: ' + error.message);
    }
  };

  // Define handleDeleteMember function
  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id); // Delete the member
      const updatedMembers = await getMembers(); // Refresh members list after deletion
      setMembers(updatedMembers);
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Error deleting member: ' + error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="member-dashboard">
      <h1>Member Dashboard</h1>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Member Exists Modal"
      >
        <h2>Member Already Exists</h2>
        <p>A member with this email already exists in the system.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <h2>{editMemberId ? 'Edit Member' : 'Add New Member'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); editMemberId ? handleUpdateMember(editMemberId) : handleAddMember(); }}>
        <input type="text" name="name" placeholder="Name" value={newMember.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={newMember.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={newMember.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={newMember.address} onChange={handleChange} required />
        <button type="submit">{editMemberId ? 'Update Member' : 'Add Member'}</button>
      </form>

      <h2>Manage Members</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.name} - {member.email} - {member.phone}
            <button onClick={() => { setEditMemberId(member.id); setNewMember(member); }}>Edit</button>
            <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MemberDashboard;
