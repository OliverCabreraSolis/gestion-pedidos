import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "pedidos"), orderBy("fecha", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pedidosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPedidos(pedidosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const agregarPedido = async (pedidoData) => {
    try {
      const docRef = await addDoc(collection(db, "pedidos"), {
        ...pedidoData,
        fechaCreacion: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error agregando pedido:", error);
      return { success: false, error };
    }
  };

  const actualizarPedido = async (id, nuevosDatos) => {
    try {
      await updateDoc(doc(db, "pedidos", id), nuevosDatos);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando pedido:", error);
      return { success: false, error };
    }
  };

  const eliminarPedido = async (id) => {
    try {
      await deleteDoc(doc(db, "pedidos", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando pedido:", error);
      return { success: false, error };
    }
  };

  return {
    pedidos,
    loading,
    agregarPedido,
    actualizarPedido,
    eliminarPedido
  };
};