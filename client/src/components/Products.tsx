import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Products: React.FC = () => {
  const navigate = useNavigate();

  const productList = [
    {
      title: "Strawberry & Honey Chocolate",
      img: "/images/strawberry-chocolate.jpg",
      description: "Delicate taste and the aroma of summer."
    },
    {
      title: "Nutty Chocolate",
      img: "/images/nut-chocolate.jpg",
      description: "Crunchy nuts in rich dark chocolate."
    },
    {
      title: "Mayan Original",
      img: "/images/mayan-original.jpg",
      description: "The authentic taste of ancient times."
    }
  ];

  return (
    <Container className="my-5" id="products">
      <h2 className="text-center mb-4">Our Chocolates</h2>
      <Row>
        {productList.map((product, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/product/${index + 1}`}
                    className="product-title-link"
                    style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {product.title}
                  </Link>
                </Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" onClick={() => navigate("/products")}>
                  View All Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
