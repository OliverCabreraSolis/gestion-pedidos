import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "pedidos"), orderBy("fecha", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      setPedidos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const agregarPedido = async (pedido) => {
    const ref = await addDoc(collection(db, "pedidos"), pedido);
    return { success: true, id: ref.id };
  };

  const actualizarPedido = async (id, data) =>
    updateDoc(doc(db, "pedidos", id), data);

  const eliminarPedido = async (id) =>
    deleteDoc(doc(db, "pedidos", id));

  return { pedidos, agregarPedido, actualizarPedido, eliminarPedido };
};
