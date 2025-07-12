

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Button, Container, Card, Spinner, Alert, Toast, ToastContainer } from "react-bootstrap";
import { addToCart } from "../store/cartSlice";
import ProductDetails from "../components/ProductDetails";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<'description' | 'additional'>('description');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => String(p.id) === String(id))
  );
  if (!product) return <div style={{ color: '#fff', textAlign: 'center', marginTop: 80 }}>Product not found</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setShowToast(true);
    setQuantity(1);
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm p-3">
        <Card.Img variant="top" src={product.image} style={{ maxHeight: 400, objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ color: '#FFD700', fontSize: 22 }}>★</span>
            <span style={{ fontWeight: 600, fontSize: 18 }}>{product.rating || 4.8}</span>
            <span style={{ color: '#888', fontSize: 15 }}>&nbsp;({product.reviews || 47} Reviews)</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <Button
              variant={activeTab === 'description' ? 'warning' : 'outline-secondary'}
              onClick={() => setActiveTab('description')}
              size="sm"
            >
              Description
            </Button>
            <Button
              variant={activeTab === 'additional' ? 'warning' : 'outline-secondary'}
              onClick={() => setActiveTab('additional')}
              size="sm"
            >
              Additional Info
            </Button>
          </div>
          <div style={{ minHeight: 60, marginBottom: 16 }}>
            {activeTab === 'description' ? (
              <div>{product.description}</div>
            ) : (
              <ProductDetails product={product} />
            )}
          </div>
          <Card.Text className="text-success fw-bold">{product.price}</Card.Text>
          <div className="d-flex align-items-center mb-3">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              –
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Math.min(15, Number(e.target.value))))}
              className="mx-2 text-center"
              style={{ width: 60 }}
              min={1}
              max={15}
            />
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setQuantity(q => Math.min(15, q + 1))}
              disabled={quantity >= 15}
            >
              +
            </Button>
          </div>
          <Button variant="dark" className="w-100" onClick={handleAddToCart} disabled={quantity < 1}>
            Add to Cart
          </Button>
          {/* Секция отзывов */}
          <div style={{ marginTop: 32 }}>
            <h5>Reviews</h5>
            <div style={{ color: '#FFD700', fontSize: 20, marginBottom: 4 }}>★ {product.rating || 4.8} / 5</div>
            <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>{product.reviews || 47} reviews</div>
            <div style={{ color: '#aaa', fontSize: 14 }}>
              {/* Здесь могут быть отзывы пользователей */}
              No reviews yet.
            </div>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="success">
          <Toast.Body className="text-white">✅ {product.title} added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ProductPage;
