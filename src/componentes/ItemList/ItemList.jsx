import { Item } from "../Item/Item";
import { Row, Col } from "react-bootstrap";

export function ItemList({ productos }) {
  return (
    // Usamos Row y Col para una grilla responsive
    // xs={1} -> 1 columna en pantallas extra pequeñas
    // md={2} -> 2 columnas en medianas
    // lg={3} xl={4} -> 3 en grandes, 4 en extra grandes
    // g-4 es el espaciado (gutter) entre tarjetas
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
      {productos
        .filter(product => product.stock > 0)
        .map(prod => (
          <Col key={prod.id}>
            <Item {...prod} />
          </Col>
        ))}
    </Row>
  );
}