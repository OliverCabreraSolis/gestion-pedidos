// Importamos lo necesario de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBuxFLUXE_hQFA8SMYoq1lOxwraXCRxZvM",
  authDomain: "pedidosexa-8688d.firebaseapp.com",
  projectId: "pedidosexa-8688d",
  storageBucket: "pedidosexa-8688d.firebasestorage.app",
  messagingSenderId: "364295113744",
  appId: "1:364295113744:web:4e61f5af4e9c44e8e3ce95",
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos
export const db = getFirestore(app);