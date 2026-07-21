import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGf9A_ssQtM-UV2MXaf3Ma-urlbWjf3Z4",
  authDomain: "save-food-rescue.firebaseapp.com",
  projectId: "save-food-rescue",
  storageBucket: "save-food-rescue.firebasestorage.app",
  messagingSenderId: "745770975085",
  appId: "1:745770975085:web:9283913c790cc29a9d6464",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);