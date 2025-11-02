import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Collections
const COURSES_COLLECTION = 'courses';
const STAFF_COLLECTION = 'staff';
const MESSAGES_COLLECTION = 'messages';
const SUBSCRIBERS_COLLECTION = 'subscribers';
const TEAM_COLLECTION = 'team';

// ==================== COURSES OPERATIONS ====================

/**
 * Get all courses from Firestore
 */
export const getAllCourses = async () => {
  try {
    const coursesQuery = query(collection(db, COURSES_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(coursesQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting courses:', error);
    throw error;
  }
};

/**
 * Add a new course to Firestore
 */
export const addCourse = async (courseData) => {
  try {
    const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
      ...courseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...courseData };
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

/**
 * Update an existing course in Firestore
 */
export const updateCourse = async (courseId, courseData) => {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    await updateDoc(courseRef, {
      ...courseData,
      updatedAt: serverTimestamp()
    });
    return { id: courseId, ...courseData };
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

/**
 * Delete a course from Firestore
 */
export const deleteCourse = async (courseId) => {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    await deleteDoc(courseRef);
    return courseId;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// ==================== STAFF OPERATIONS ====================

/**
 * Get all staff members from Firestore
 */
export const getAllStaff = async () => {
  try {
    const staffQuery = query(collection(db, STAFF_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(staffQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting staff:', error);
    throw error;
  }
};

/**
 * Add a new staff member to Firestore
 */
export const addStaff = async (staffData) => {
  try {
    const docRef = await addDoc(collection(db, STAFF_COLLECTION), {
      ...staffData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...staffData };
  } catch (error) {
    console.error('Error adding staff:', error);
    throw error;
  }
};

/**
 * Update an existing staff member in Firestore
 */
export const updateStaff = async (staffId, staffData) => {
  try {
    const staffRef = doc(db, STAFF_COLLECTION, staffId);
    await updateDoc(staffRef, {
      ...staffData,
      updatedAt: serverTimestamp()
    });
    return { id: staffId, ...staffData };
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};

/**
 * Delete a staff member from Firestore
 */
export const deleteStaff = async (staffId) => {
  try {
    const staffRef = doc(db, STAFF_COLLECTION, staffId);
    await deleteDoc(staffRef);
    return staffId;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};

// ==================== MESSAGES OPERATIONS ====================

/**
 * Get all messages from Firestore
 */
export const getAllMessages = async () => {
  try {
    const messagesQuery = query(collection(db, MESSAGES_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(messagesQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

/**
 * Add a new message to Firestore (from contact form)
 */
export const addMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
      ...messageData,
      status: 'unread', // Default status
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

/**
 * Update message status (mark as read/unread)
 */
export const updateMessageStatus = async (messageId, status) => {
  try {
    const messageRef = doc(db, MESSAGES_COLLECTION, messageId);
    await updateDoc(messageRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    return { id: messageId, status };
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

/**
 * Delete a message from Firestore
 */
export const deleteMessage = async (messageId) => {
  try {
    const messageRef = doc(db, MESSAGES_COLLECTION, messageId);
    await deleteDoc(messageRef);
    return messageId;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

// ==================== SUBSCRIBERS OPERATIONS ====================

/**
 * Get all subscribers from Firestore
 */
export const getAllSubscribers = async () => {
  try {
    const subscribersQuery = query(collection(db, SUBSCRIBERS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(subscribersQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting subscribers:', error);
    throw error;
  }
};

/**
 * Add a new subscriber to Firestore
 */
export const addSubscriber = async (email) => {
  try {
    // Check if email already exists
    const subscribersSnapshot = await getDocs(collection(db, SUBSCRIBERS_COLLECTION));
    const existingSubscriber = subscribersSnapshot.docs.find(
      doc => doc.data().email.toLowerCase() === email.toLowerCase()
    );
    
    if (existingSubscriber) {
      throw new Error('This email is already subscribed!');
    }

    const docRef = await addDoc(collection(db, SUBSCRIBERS_COLLECTION), {
      email: email,
      status: 'active',
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, email };
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw error;
  }
};

/**
 * Delete a subscriber from Firestore
 */
export const deleteSubscriber = async (subscriberId) => {
  try {
    const subscriberRef = doc(db, SUBSCRIBERS_COLLECTION, subscriberId);
    await deleteDoc(subscriberRef);
    return subscriberId;
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    throw error;
  }
};

// ==================== TEAM OPERATIONS ====================

/**
 * Get all team members from Firestore
 */
export const getAllTeam = async () => {
  try {
    const teamQuery = query(collection(db, TEAM_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(teamQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting team members:', error);
    throw error;
  }
};

/**
 * Add a new team member to Firestore
 */
export const addTeam = async (teamData) => {
  try {
    const docRef = await addDoc(collection(db, TEAM_COLLECTION), {
      ...teamData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...teamData };
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

/**
 * Update an existing team member in Firestore
 */
export const updateTeam = async (teamId, teamData) => {
  try {
    const teamRef = doc(db, TEAM_COLLECTION, teamId);
    await updateDoc(teamRef, {
      ...teamData,
      updatedAt: serverTimestamp()
    });
    return { id: teamId, ...teamData };
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
};

/**
 * Delete a team member from Firestore
 */
export const deleteTeam = async (teamId) => {
  try {
    const teamRef = doc(db, TEAM_COLLECTION, teamId);
    await deleteDoc(teamRef);
    return teamId;
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};
