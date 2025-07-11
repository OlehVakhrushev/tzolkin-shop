import React, { useState } from "react";
import { Card, Button, Col, Form, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Product } from "../store/productsSlice";
import ProductDetails from "./ProductDetails";
import "../styles/custom.css";

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [showToast, setShowToast] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 15) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setShowToast(true);
    setQuantity(1);
  };

  return (
    <>
      <Col md={4} className="mb-4">
        <Card className="h-100 shadow-sm d-flex flex-column justify-content-between homm-card">
          <div id={`product-${product.id}`}>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{
                height: 200,
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
              }}
            />
          </div>
          <Card.Body className="d-flex flex-column">
            <Card.Title>{product.title}</Card.Title>
            <Card.Text style={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
              {product.description}
            </Card.Text>

            <ProductDetails product={product} />

            <Card.Text className="text-success fw-bold">{product.price}</Card.Text>

            <div className="d-flex align-items-center mb-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                –
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value)) handleQuantityChange(value);
                }}
                className="mx-2 text-center"
                style={{ width: 60 }}
                min={1}
                max={15}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 15}
              >
                +
              </Button>
            </div>

            <div className="mt-auto">
              <Button variant="dark" className="btn-homm press-effect w-100" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="success">
          <Toast.Body className="text-white">✅ {product.title} added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductItem;
