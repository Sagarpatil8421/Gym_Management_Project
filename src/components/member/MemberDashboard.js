import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addMember, updateMember, deleteMember, getMembers, getMemberByEmail, createBill, getMemberBills } from '../../services/firestore';
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

Modal.setAppElement('#root');

const MemberDashboard = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', address: '' });
  const [editMemberId, setEditMemberId] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [showBillsModal, setShowBillsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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
        setMembers([existingMembers[0], ...members.filter(m => m.id !== existingMembers[0].id)]);
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

  const handleUpdateMember = async (id) => {
    try {
      await updateMember(id, newMember);
      setNewMember({ name: '', email: '', phone: '', address: '' });
      setEditMemberId(null);
      const updatedMembers = await getMembers();
      setMembers(updatedMembers);
      alert('Member updated successfully!');
    } catch (error) {
      console.error('Error updating member:', error);
      setError('Error updating member: ' + error.message);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id);
      const updatedMembers = await getMembers();
      setMembers(updatedMembers);
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Error deleting member: ' + error.message);
    }
  };

  const handleAddBill = async (memberId) => {
    const amount = prompt('Enter Bill Amount:');
    const dueDate = prompt('Enter Due Date (YYYY-MM-DD):');
  
    if (amount && dueDate) {
      try {
        const paymentDate = new Date().toISOString().split('T')[0]; // Set today's date in YYYY-MM-DD format
        await createBill(memberId, amount, dueDate, paymentDate);
        alert('Bill added successfully!');
        fetchMemberBills(memberId);
      } catch (error) {
        console.error('Error adding bill:', error);
        setError('Error adding bill: ' + error.message);
      }
    } else {
      alert('Both Amount and Due Date are required.');
    }
  };

  const fetchMemberBills = async (memberId) => {
    try {
      const memberBills = await getMemberBills(memberId);
      setBills(memberBills);
      const selectedMember = members.find((member) => member.id === memberId);
      setSelectedMember(selectedMember);
      setShowBillsModal(true); // Show the bills modal
    } catch (error) {
      console.error('Error fetching bills:', error);
      setError('Error fetching bills: ' + error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeBillsModal = () => {
    setShowBillsModal(false);
    setSelectedMember(null);
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

      {/* Bills Modal */}
      <Modal
        isOpen={showBillsModal}
        onRequestClose={closeBillsModal}
        style={customStyles}
        contentLabel="Member Bills Modal"
      >
        <h2>{selectedMember?.name}'s Bills</h2>
        <ul>
          {bills.length > 0 ? (
            bills.map((bill) => (
              <li key={bill.id}>
                Paid Amount: {bill.amount} <br />
                Payment Date: {bill.paymentDate} <br />
                Due Date: {bill.dueDate}
              </li>
            ))
          ) : (
            <p>No bills available for this member.</p>
          )}
        </ul>
        <button onClick={closeBillsModal}>Close</button>
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
            <button onClick={() => handleAddBill(member.id)}>Add Bill</button>
            <button onClick={() => fetchMemberBills(member.id)}>View Bills</button>
          </li>
        ))}
      </ul>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MemberDashboard;
