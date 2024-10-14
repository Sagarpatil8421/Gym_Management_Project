import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc, query, where, getDocs  } from "firebase/firestore"; 


const membersCollection = collection(db, 'members');

export const addMember = async (memberData) => {
  return await addDoc(membersCollection, memberData);
};

export const updateMember = async (id, memberData) => {
  const memberDoc = doc(db, 'members', id);
  return await updateDoc(memberDoc, memberData);
};

export const deleteMember = async (id) => {
  const memberDoc = doc(db, 'members', id);
  return await deleteDoc(memberDoc);
};

export const getMembers = async () => {
  const querySnapshot = await getDocs(membersCollection); 
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
};

export const getMemberByEmail = async (email) => {
  const q = query(membersCollection, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  const members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return members;
};




// Assuming the current user's ID is available
export const getMemberBills = async (memberId) => {
  const billsCollection = collection(db, 'bills');
  const q = query(billsCollection, where('memberId', '==', memberId)); // Assuming 'memberId' is the field in your 'bills' collection
  const querySnapshot = await getDocs(q);
  const bills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return bills;
};

export const getMemberNotifications = async (memberId) => {
  const notificationsCollection = collection(db, 'notifications');
  const q = query(notificationsCollection, where('memberId', '==', memberId)); // Assuming 'memberId' is the field in your 'notifications' collection
  const querySnapshot = await getDocs(q);
  const notifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return notifications;
};

export const searchMembers = async (searchTerm) => {
  const membersCollection = collection(db, 'members');
  const q = query(membersCollection, where('name', '==', searchTerm)); // Search by name (you can modify the search condition)
  const querySnapshot = await getDocs(q);
  const members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return members;
};