import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import {
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider    
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBPLAeG...B61BFv0",
  authDomain: "paginaweb2-604e3.firebaseapp.com",
  projectId: "paginaweb2-604e3",
  storageBucket: "paginaweb2-604e3.appspot.com",
  messagingSenderId: "929541821568",
  appId: "1:929541821568:web:21aa121de31c920cc88265",
  measurementId: "G-NSHQ9JYNHC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(); 

export async function addUser(userId, userData) {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("Usuario añadido con éxito");
  } catch (error) {
    console.error("Error añadiendo usuario: ", error);
  }
}

export async function getUser(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Datos del usuario:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No se encontró ningún usuario con ese ID");
    }
  } catch (error) {
    console.error("Error obteniendo usuario: ", error);
  }
}

export function loginvalidation(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export async function UserRegister(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function observador() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href = "../Index.html";
    }
  });
}

export function showMessage(message, type = 'info') {
  const messageElement = document.querySelector('#message-container');
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = type; // Apply different classes for styling based on the message type
  }
}

export async function saveUserData(user, data) {
  try {
    await setDoc(doc(db, "users", user.uid), data);
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data: ', error);
  }
}
