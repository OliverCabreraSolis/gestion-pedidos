import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export const usePedidosUrgentes = () => {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "pedidosUrgentes"),
      orderBy("creadoEn", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setListas(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const guardarLista = async (lista) => {
    await addDoc(collection(db, "pedidosUrgentes"), {
      ...lista,
      creadoEn: serverTimestamp()
    });
  };

  return { listas, guardarLista, loading };
};
