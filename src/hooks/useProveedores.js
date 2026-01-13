import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "proveedores"),
      orderBy("fechaCreacion", "desc")
    );

    const unsub = onSnapshot(q, snap => {
      setProveedores(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const agregarProveedor = async (data) => {
    await addDoc(collection(db, "proveedores"), {
      ...data,
      activo: true,
      fechaCreacion: serverTimestamp()
    });
  };

  const actualizarProveedor = async (id, data) => {
    await updateDoc(doc(db, "proveedores", id), data);
  };

  const eliminarProveedor = async (id) => {
    await deleteDoc(doc(db, "proveedores", id));
  };

  return {
    proveedores,
    loading,
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor
  };
};
