import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addMember, updateMember, deleteMember, getMembers, getMemberByEmail, createBill, getMemberBills } from '../../services/firestore';
import { useAuth } from '../auth/AuthContext'; 
import { useNavigate } from 'react-router-dom';
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
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [billAmount, setBillAmount] = useState('');
  const [billPlan, setBillPlan] = useState('1');
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const { currentUser, role } = useAuth(); // Get current user and role from AuthContext
  const navigate = useNavigate();

  const planOptions = [
    { label: '1 Month', value: 1 },
    { label: '2 Months', value: 2 },
    { label: '3 Months', value: 3 },
    { label: '6 Months', value: 6 },
    { label: '12 Months', value: 12 },
  ];

  useEffect(() => {
    // Check if the user is logged in and has admin role
    if (!currentUser || role !== 'admin') {
      alert('Access denied. Admins only.');
      navigate('/'); // Redirect non-admin users to the homepage or login page
    } else {
      fetchMembers(); // Fetch members if the user is an admin
    }
  }, [currentUser, role, navigate]);

  const fetchMembers = async () => {
    const membersData = await getMembers();
    setMembers(membersData);
  };

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
      fetchMembers();
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
      fetchMembers();
      alert('Member updated successfully!');
    } catch (error) {
      console.error('Error updating member:', error);
      setError('Error updating member: ' + error.message);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id);
      fetchMembers();
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Error deleting member: ' + error.message);
    }
  };

  const openBillModal = (memberId) => {
    setSelectedMemberId(memberId);
    setBillAmount('');
    setBillPlan('1');
    setIsBillModalOpen(true);
  };

  const closeBillModal = () => {
    setIsBillModalOpen(false);
    setSelectedMemberId(null);
    setBillAmount('');
    setBillPlan('1');
  };

  const calculateDueDate = (months) => {
    const now = new Date();
    now.setMonth(now.getMonth() + Number(months));
    return now.toISOString().split('T')[0];
  };

  const handleBillSubmit = async (e) => {
    e.preventDefault();
    if (!billAmount || isNaN(billAmount) || Number(billAmount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    const dueDate = calculateDueDate(billPlan);
    const paymentDate = new Date().toISOString().split('T')[0];
    try {
      await createBill(selectedMemberId, billAmount, dueDate, paymentDate);
      closeBillModal();
      fetchMembers();
      setError('');
      alert('Bill added successfully!');
    } catch (error) {
      setError('Error adding bill: ' + error.message);
    }
  };

  const fetchMemberBills = async (memberId) => {
    try {
      const memberBills = await getMemberBills(memberId);
      setBills(memberBills);
      const selectedMember = members.find((member) => member.id === memberId);
      setSelectedMember(selectedMember);
      setShowBillsModal(true);
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Add Member Form */}
      <h2>{editMemberId ? 'Edit Member' : 'Add New Member'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); editMemberId ? handleUpdateMember(editMemberId) : handleAddMember(); }}>
        <input type="text" name="name" placeholder="Name" value={newMember.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={newMember.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={newMember.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={newMember.address} onChange={handleChange} required />
        <button type="submit">{editMemberId ? 'Update Member' : 'Add Member'}</button>
      </form>

      {/* Member List */}
      <h2>Members List</h2>
      <div className='members-list-grid'>
        {members.map((member) => (
          <div className='member-card' key={member.id}>
            <div className='member-avatar'>
              {member.name ? member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '?'}
            </div>
            <div className='member-info'>
              <div className='member-name'>{member.name}</div>
              <div className='member-detail'><span>Email:</span> {member.email}</div>
              <div className='member-detail'><span>Phone:</span> {member.phone}</div>
              <div className='member-detail'><span>Address:</span> {member.address}</div>
            </div>
            <div className='member-actions'>
              <button className='edit' onClick={() => { setEditMemberId(member.id); setNewMember(member); }}>Edit</button>
              <button className='delete' onClick={() => handleDeleteMember(member.id)}>Delete</button>
              <button className='add-bill' onClick={() => openBillModal(member.id)}>Add Bill</button>
              <button className='view-bill' onClick={() => fetchMemberBills(member.id)}>View Bills</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Viewing Bills */}
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

      {/* Modal for Error or Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Duplicate Member Found"
      >
        <h2>Member Already Exists!</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <Modal
        isOpen={isBillModalOpen}
        onRequestClose={closeBillModal}
        style={customStyles}
        contentLabel="Add Bill Modal"
      >
        <h2>Add Bill</h2>
        <form onSubmit={handleBillSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={billAmount}
            onChange={e => setBillAmount(e.target.value)}
            required
            min="1"
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <select
            value={billPlan}
            onChange={e => setBillPlan(e.target.value)}
            style={{ marginBottom: '10px', width: '100%' }}
          >
            {planOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div style={{ marginBottom: '10px' }}>
            <strong>Due Date: </strong>{billPlan ? calculateDueDate(billPlan) : ''}
          </div>
          <button type="submit" style={{ marginRight: '10px' }}>Add Bill</button>
          <button type="button" onClick={closeBillModal}>Cancel</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Modal>
    </div>
  );
};

export default MemberDashboard;
