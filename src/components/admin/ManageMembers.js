import React, { useState, useEffect } from 'react';
import { getMembers, addMember, updateMember, deleteMember } from '../../services/firestore'; // Assuming CRUD methods in services/firestore.js

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', email: '', package: '' });

  useEffect(() => {
    const fetchMembers = async () => {
      const membersList = await getMembers();
      setMembers(membersList);
    };
    fetchMembers();
  }, []);

  const handleAddMember = async () => {
    await addMember(newMember);
    // Refresh members list after adding
  };

  const handleUpdateMember = async (id) => {
    await updateMember(id, newMember);
    // Refresh members list after updating
  };

  const handleDeleteMember = async (id) => {
    await deleteMember(id);
    // Refresh members list after deleting
  };

  return (
    <div>
      <h2>Manage Members</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Package"
          value={newMember.package}
          onChange={(e) => setNewMember({ ...newMember, package: e.target.value })}
        />
        <button type="button" onClick={handleAddMember}>Add Member</button>
      </form>
      
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} - {member.email}
            <button onClick={() => handleUpdateMember(member.id)}>Update</button>
            <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMembers;
