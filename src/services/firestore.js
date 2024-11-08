import { db } from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  getDoc,
  setDoc, 
  query, 
  where, 
  getDocs 
} from "firebase/firestore";

// Collection references
const membersCollection = collection(db, 'members');
const billsCollection = collection(db, 'bills');
const usersCollection = collection(db, 'users'); // New collection for storing user roles

// Member functions
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

// Role functions
export const assignUserRole = async (userId) => {
  // Assign "user" role by default upon signup
  const userDoc = doc(usersCollection, userId);
  await setDoc(userDoc, { role: 'user' });
};

export const getUserRole = async (userId) => {
  const userDoc = doc(usersCollection, userId);
  const docSnapshot = await getDoc(userDoc);
  if (docSnapshot.exists()) {
    return docSnapshot.data().role;
  } else {
    throw new Error("User role not found");
  }
};

export const changeUserRole = async (userId, newRole) => {
  const userDoc = doc(usersCollection, userId);
  return await updateDoc(userDoc, { role: newRole });
};

// Bill functions
export const createBill = async (memberId, amount, dueDate, paymentDate) => {
  const billData = {
    memberId,
    amount,
    dueDate,
    paymentDate: paymentDate || new Date().toISOString().split('T')[0], // Use today's date if no paymentDate is provided
    createdAt: new Date()
  };
  return await addDoc(billsCollection, billData);
};

export const getMemberBills = async (memberId) => {
  const q = query(billsCollection, where('memberId', '==', memberId)); 
  const querySnapshot = await getDocs(q);
  const bills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return bills;
};

// Notifications and search
export const getMemberNotifications = async (memberId) => {
  const notificationsCollection = collection(db, 'notifications');
  const q = query(notificationsCollection, where('memberId', '==', memberId)); 
  const querySnapshot = await getDocs(q);
  const notifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return notifications;
};

export const searchMembers = async (searchTerm) => {
  const q = query(membersCollection, where('name', '==', searchTerm)); 
  const querySnapshot = await getDocs(q);
  const members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return members;
};
