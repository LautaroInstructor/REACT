// En src/components/AllProductos.jsx


import { useState, useEffect } from 'react';
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase/config'; // Asegurarse de que la ruta sea correcta
import { Container, Row, Col, Spinner, Button, Alert } from 'react-bootstrap';


const AllProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ---> Estados nuevos para el paginador <---
  const [lastVisible, setLastVisible] = useState(null); // Guarda la referencia al último producto de la página actual
  const [hasMore, setHasMore] = useState(true); // Indica si hay más productos para cargar
  const [loadingMore, setLoadingMore] = useState(false); // Estado para el botón "Cargar más"


  const PRODUCTOS_POR_PAGINA = 6;


  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      const productosRef = collection(db, 'productos');
      // Consulta inicial: solo los primeros 6 productos
      const q = query(productosRef, limit(PRODUCTOS_POR_PAGINA));
      
      const documentSnapshots = await getDocs(q);
      const productosData = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(productosData);


      // Guardamos el último documento visible para usarlo como punto de partida en la siguiente consulta
      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);


      // Si el número de documentos es menor al límite, no hay más páginas
      if (documentSnapshots.docs.length < PRODUCTOS_POR_PAGINA) {
        setHasMore(false);
      }
      
      setLoading(false);
    };


    fetchInitialProducts();
  }, []);


  const fetchMoreProducts = async () => {
    if (!hasMore) return; // No hacer nada si no hay más productos
    
    setLoadingMore(true);
    const productosRef = collection(db, 'productos');
    // Consulta para la siguiente página: empieza DESPUÉS (startAfter) del último que vimos
    const q = query(productosRef, startAfter(lastVisible), limit(PRODUCTOS_POR_PAGINA));


    const documentSnapshots = await getDocs(q);
    const productosData = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Agregamos los nuevos productos a la lista existente
    setProductos(prevProductos => [...prevProductos, ...productosData]);


    const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastVisible(lastDoc);


    if (documentSnapshots.docs.length < PRODUCTOS_POR_PAGINA) {
      setHasMore(false);
    }
    
    setLoadingMore(false);
  };


  // Spinner de carga inicial
  if (loading) {
    return <div className="text-center p-5"><Spinner animation="border" /></div>;
  }


  return (
    <Container className="my-4">
      {/* ... Grilla de productos con <Row> y <Col> ... */}


      <div className="text-center mt-4">
        {hasMore ? (
          <Button onClick={fetchMoreProducts} disabled={loadingMore}>
            {loadingMore ? 'Cargando...' : 'Cargar más productos'}
          </Button>
        ) : (
          <Alert variant="info">No hay más productos para mostrar.</Alert>
        )}
      </div>
    </Container>
  );
};


export default AllProductos
