import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "proveedores"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProveedores(data);
    });

    return () => unsubscribe();
  }, []);

  const agregarProveedor = async (proveedor) => {
    await addDoc(collection(db, "proveedores"), {
      ...proveedor,
      createdAt: serverTimestamp()
    });
  };

  const eliminarProveedor = async (id) => {
    await deleteDoc(doc(db, "proveedores", id));
  };

  return {
    proveedores,
    agregarProveedor,
    eliminarProveedor
  };
};
