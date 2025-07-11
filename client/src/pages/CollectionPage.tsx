// src/pages/CollectionPage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  ingredients?: string;
  weight?: string;
  country?: string;
  rating?: number;
  reviews?: number;
}

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/collections/${id}`);
        setCollection(res.data);
      } catch (err) {
        setError("Failed to load collection");
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [id]);


  // Tabs and quantity state
  const [activeTab, setActiveTab] = useState<'description' | 'additional'>('description');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    if (collection) {
      dispatch(addToCart({ product: collection, quantity }));
      setShowToast(true);
      setQuantity(1);
    }
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!collection) return null;

  return (
    <Container className="my-5">
      <Card className="shadow-sm p-3">
        <Card.Img variant="top" src={collection.image} style={{ maxHeight: 400, objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{collection.title}</Card.Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ color: '#FFD700', fontSize: 22 }}>★</span>
            <span style={{ fontWeight: 600, fontSize: 18 }}>{collection.rating || 4.8}</span>
            <span style={{ color: '#888', fontSize: 15 }}>&nbsp;({collection.reviews || 47} Reviews)</span>
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
              <div>{collection.description}</div>
            ) : (
              <>
                <Card.Text><strong>Weight:</strong> {collection.weight || '-'}</Card.Text>
                <Card.Text><strong>Country:</strong> {collection.country || '-'}</Card.Text>
                <Card.Text><strong>Ingredients:</strong> {collection.ingredients || '-'}</Card.Text>
              </>
            )}
          </div>
          <Card.Text className="text-success fw-bold">{collection.price}</Card.Text>
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
            <div style={{ color: '#FFD700', fontSize: 20, marginBottom: 4 }}>★ {collection.rating || 4.8} / 5</div>
            <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>{collection.reviews || 47} reviews</div>
            <div style={{ color: '#aaa', fontSize: 14 }}>
              {/* Здесь могут быть отзывы пользователей */}
              No reviews yet.
            </div>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="success">
          <Toast.Body className="text-white">✅ {collection.title} added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default CollectionPage;
